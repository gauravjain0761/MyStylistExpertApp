import {AppContext} from 'context';
import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {Package} from 'types';

const {getAllPackageByUser} = endPoints;

const useMyPackage = () => {
  const [myPackages, setMyPackages] = useState<Package>();
  const {userDetails, setLoading} = useContext(AppContext);
  const {userId} = userDetails;

  const getmyPackages = async () => {
    setLoading(true);
    try {
      const url = `${getAllPackageByUser}/${userId}`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {status, offers} = data;
      if (status === 200 && offers.length) {
        setMyPackages(offers);
      }
      console.log('response of getting my packages', response);
    } catch (error) {
      console.log('error of getting my packages', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    myPackages,
    getmyPackages,
  };
};

export default useMyPackage;
