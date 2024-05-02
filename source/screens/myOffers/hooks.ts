import {useContext, useState} from 'react';
import {AppContext} from 'context';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {Offer} from 'types';

const {getAllOffersByUser} = endPoints;

const useMyOffers = () => {
  const [allMyOffers, setMyOffers] = useState<Array<Offer>>();
  const {userDetails, setLoading} = useContext(AppContext);
  const {userId} = userDetails;

  const getMyOffers = async () => {
    setLoading(true);
    try {
      const url = `${getAllOffersByUser}/${userId}`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {status, offers} = data;
      if (status === 200 && offers.length) {
        setMyOffers(offers);
      }
      console.log('response of getting my offers', response);
    } catch (error) {
      console.log('error of getting my offers', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    allMyOffers,
    getMyOffers,
  };
};

export default useMyOffers;
