import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import {AppContext} from 'context';
import APICaller from '../../service/apiCaller';
import {ExpertFollowers} from 'types';

const {getAllFollowersOfExpert} = endPoints;
const useFollowings = () => {
  const {userDetails, setLoading} = useContext(AppContext);
  const [allFollowings, setAllFollowings] = useState<Array<ExpertFollowers>>(
    [],
  );
  const {userId} = userDetails;

  const getAllFollowings = async () => {
    setLoading(true);
    try {
      const url = `${getAllFollowersOfExpert}/${userId}?&page=0&limit=50&sort=createdAt`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {followers, status} = data;
      if (status === 200 && followers) {
        setAllFollowings(followers);
      }
      console.log('resopnse of getting all followings', response);
    } catch (error) {
      console.log('error of getting all followings', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    allFollowings,
    getAllFollowings,
  };
};
export default useFollowings;
