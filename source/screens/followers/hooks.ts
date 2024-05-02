import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import {AppContext} from 'context';
import APICaller from '../../service/apiCaller';
import {ExpertFollowers} from 'types';

const {getAllFollowersOfExpert} = endPoints;

const useFollowers = () => {
  const {userDetails, setLoading} = useContext(AppContext);
  const [allFollowers, setAllFollower] = useState<Array<ExpertFollowers>>([]);
  const {userId} = userDetails;

  const getAllFollowersOfExpertUser = async () => {
    setLoading(true);

    try {
      const url = `${getAllFollowersOfExpert}/${userId}?&page=0&limit=50&sort=createdAt`;
      const resonse = await APICaller.get(url);
      const {data} = resonse;
      const {status, followers} = data;
      if (status === 200 && followers) {
        setAllFollower(followers);
      }
      console.log('response of getting all followers', resonse);
    } catch (error) {
      console.log('response of getting all followers', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    allFollowers,
    getAllFollowersOfExpertUser,
  };
};

export default useFollowers;
