import {useContext, useState} from 'react';
import {AppContext} from 'context';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {ChatUser} from 'types';

const {getUsersList, unreadlist} = endPoints;

const useChat = () => {
  const [chatUsers, setChatUsers] = useState<Array<ChatUser>>([]);
  const [unRead, setUnread] = useState<[]>([]);
  const {userDetails} = useContext(AppContext);
  const {_id} = userDetails;

  const getAllUserList = async () => {
    try {
      const url = `${getUsersList}/${_id}?role=user`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {status, users} = data;
      if (status === 200 && users) {
        setChatUsers(users);
      }
      console.log('response of get user list', response);
    } catch (error) {
      console.log('error of get user list', error);
    }
  };

  const getUnreadList = async () => {
    try {
      const url = `${unreadlist}`;
      let body = {currentUserId: _id};
      const response = await APICaller.post(url, body);
      const {data} = response;
      const {status, users} = data;
      if (status === 200 && users) {
        setUnread(users);
      }
      console.log('response of UnreadList', response);
    } catch (error) {
      console.log('error of UnreadList', error);
    }
  };

  return {
    chatUsers,
    getAllUserList,
    unRead,
    getUnreadList,
  };
};

export default useChat;
