import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import {AppContext} from 'context';
import APICaller from '../../service/apiCaller';
import {CampaignList} from 'types';

const {getCampaigns} = endPoints;

const useMyCampaign = () => {
  const [acceptedCompaigns, setAcceptedCampaigns] =
    useState<Array<CampaignList>>();
  const [pendingCompaigns, setPendingCampaigns] =
    useState<Array<CampaignList>>();
  const [activeCompaigns, setActiveCampaigns] = useState<Array<CampaignList>>();
  const [declineCompaigns, setDeclineCampaigns] =
    useState<Array<CampaignList>>();

  const {userDetails, setLoading} = useContext(AppContext);
  const {userId} = userDetails;

  const getAcceptedCampaigns = async () => {
    setLoading(true);
    try {
      const url = getCampaigns;
      const body = {
        expert: userId,
        campaignstatus: 'Accepted',
      };
      const response = await APICaller.post(url, body);
      const {data} = response;
      const {status, campaigns} = data;
      if (status === 200 && campaigns?.length) {
        setAcceptedCampaigns(campaigns);
      }
      console.log('response of getting compaigns accepted', response);
    } catch (error) {
      console.log('error of getting compaigns', error);
    } finally {
      setLoading(false);
    }
  };

  const getActiveCampaigns = async () => {
    setLoading(true);
    try {
      const url = getCampaigns;
      const body = {
        expert: userId,
        campaignstatus: 'Active',
      };
      const response = await APICaller.post(url, body);
      const {data} = response;
      const {status, campaigns} = data;
      if (status === 200 && campaigns?.length) {
        setActiveCampaigns(campaigns);
      }
      console.log('response of getting compaigns active', response);
    } catch (error) {
      console.log('error of getting compaigns', error);
    } finally {
      setLoading(false);
    }
  };

  const getDeclineCampaigns = async () => {
    setLoading(true);
    try {
      const url = getCampaigns;
      const body = {
        expert: userId,
        campaignstatus: 'Declined',
      };
      const response = await APICaller.post(url, body);
      const {data} = response;
      const {status, campaigns} = data;
      if (status === 200 && campaigns?.length) {
        setDeclineCampaigns(campaigns);
      }
      console.log('response of getting compaigns Declined', response);
    } catch (error) {
      console.log('error of getting compaigns Declined', error);
    } finally {
      setLoading(false);
    }
  };

  const getPendingCampaigns = async () => {
    console.log('userId', userId);
    setLoading(true);
    try {
      const url = getCampaigns;
      const body = {
        expert: userId,
        campaignstatus: 'Pending',
      };
      const response = await APICaller.post(url, body);
      const {data} = response;
      const {status, campaigns} = data;
      if (status === 200 && campaigns?.length) {
        setPendingCampaigns(campaigns);
      }
      console.log('response of getting compaigns Pending', response);
    } catch (error) {
      console.log('error of getting compaigns Pending', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    declineCompaigns,
    activeCompaigns,
    pendingCompaigns,
    acceptedCompaigns,
    getAcceptedCampaigns,
    getDeclineCampaigns,
    getActiveCampaigns,
    getPendingCampaigns,
  };
};

export default useMyCampaign;
