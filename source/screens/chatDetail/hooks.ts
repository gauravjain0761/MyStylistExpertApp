import {useContext, useEffect, useState} from 'react';
import {endPoints} from '../../../config';
import {AppContext} from 'context';
import APICaller from '../../service/apiCaller';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const SOCKET_URL = 'https://api.mystylist.in/';

const socket = io(SOCKET_URL);

const {createRoom} = endPoints;

const useChatDetail = (props: any) => {
  const navigation = useNavigation();
  const {userDetails} = useContext(AppContext);
  const {userId} = userDetails;
  const [message, setMessage] = useState<string>('');
  const [userTyping, setUserTyping] = useState<boolean>(false);
  const [userOnline, setUserOnline] = useState<boolean>(false);
  const [messageList, setMessageList] = useState([]);
  const [roomId, setRoomId] = useState<string>('');

  const createChatRoom = async () => {
    try {
      const url = `${createRoom}`;
      const body = {
        participants: [receiverId, userId],
      };
      const response = await APICaller.post(url, body);
      console.log('response of create room', response);
      const {data} = response;
      const {roomId} = data;
      if (data && roomId) {
        setRoomId(roomId);
        joinRoom(roomId);
      }
    } catch (error) {
      console.log('error of create room', error);
    }
  };

  const getoldMessages = (joinRoom: String) => {
    socket.emit('fetch_messages', roomId);
  };

  const joinRoom = (roomId: string) => {
    if (roomId !== '') {
      socket.emit('join_room', roomId);
      socket.emit('user_online', {chatid: roomId, name: userId});
      getoldMessages(roomId);
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('receive_message', (data: any) => {
      console.log('message', data);
      setMessageList(list => [...list, data]);
    });

    socket.on('past_messages', (data: any) => {
      console.log('data', data);
      const messages = data?.messages.map((item: any) => {
        const messageData = {
          chatId: item.chat,
          senderId: item.sender._id,
          content: item.content,
          time: item.timestamp,
        };
        return messageData;
      });

      setMessageList(messages);
    });
    socket.on('user_typing', data => {
      if (data?.username === receiverId) {
        setUserTyping(true);
      }
    });
    socket.on('user_stopped_typing', data => {
      if (data?.username === receiverId) {
        setUserTyping(false);
      }
    });

    socket.on('update_online_users', data => {
      data.map((data: any) => {
        if (data?.name === receiverId) {
          setUserOnline(true);
          return;
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (roomId) {
      getoldMessages(roomId);
    }
  }, [roomId]);

  const sendMessage = async () => {
    if (message !== '') {
      const messageData = {
        chatId: roomId,
        senderId: userId,
        content: message,
        time: new Date(),
      };

      await socket.emit('send_message', messageData);
      setMessageList(list => [...list, messageData]);
      setMessage('');
    }
  };

  return {
    roomId,
    message,
    userDetails,
    sendMessage,
    messageList,
    setMessage,
    createChatRoom,
  };
};

export default useChatDetail;
