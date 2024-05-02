import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {AppContext} from 'context';
import {Offer} from 'types';
const {getOfferDetails} = endPoints;

const useOfferDetals = () => {
  const [offerDetails, setOfferDetail] = useState<Offer>({} as Offer);
  const {setLoading} = useContext(AppContext);
  const getOfferDetail = async (offerId: string) => {
    setLoading(true);
    try {
      const url = `${getOfferDetails}/${offerId}`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {status, offer} = data;
      if (status === 200) {
        setOfferDetail(offer);
      }
      console.log('response of getting offer details', response);
    } catch (error) {
      console.log('error of getting offer details', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    offerDetails,
    getOfferDetail,
  };
};

export default useOfferDetals;
