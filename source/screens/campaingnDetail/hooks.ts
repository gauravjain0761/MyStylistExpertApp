import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import {AppContext} from 'context';
import APICaller from '../../service/apiCaller';
import {Campaign} from 'types';
const {getCampaignDetails} = endPoints;

const useCampaignDetails = () => {
  const [campaignDetails, setCampaignDetails] = useState<Campaign>(
    {} as Campaign,
  );
  const {userDetails} = useContext(AppContext);
  const {_id} = userDetails;

  const getDetails = async (campaignId: string) => {
    console.log('ididididid',campaignId);
    try {
      const url = `${getCampaignDetails}/${campaignId}`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {status, campaign} = data;
      if (status === 200 && campaign) {
        setCampaignDetails(campaign);
      }
      console.log('response of getting details', response);
    } catch (error) {
      console.log('error of getting details', error);
    }
  };

  return {
    getDetails,
    campaignDetails,
  };
};

export default useCampaignDetails;
