import {useContext, useState} from 'react';
import {AppContext} from 'context';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {ChatUser} from 'types';

const {getUsersList} = endPoints;

const useChat = () => {
  const [chatUsers, setChatUsers] = useState<Array<ChatUser>>([]);
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

  return {
    chatUsers,
    getAllUserList,
  };
};

export default useChat;
