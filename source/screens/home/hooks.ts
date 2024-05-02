import {AppContext} from 'context';
import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {Appointment, ExpertMedia} from 'types';

const {getUserDetails, getAllExpertsImages, getAppointments} = endPoints;

const useHome = () => {
  const {userDetails, setLoading} = useContext(AppContext);
  const [expertMedia, setExpertMedia] = useState<ExpertMedia>();
  const [appointments, setAppointments] = useState<Array<Appointment>>([]);

  const {userId} = userDetails;

  const getExpertDetails = async () => {
    try {
      const response = await APICaller.get(getUserDetails);
      console.log('response of gettig user details', response);
    } catch (error) {
      console.log('error of gettig user details', error);
    }
  };

  const getLatestAppointments = async () => {
    setLoading(true);
    const endpoint = `${getAppointments}/${userId}?page=0&limit=5&sort=createdAt&status=booked`;
    try {
      const response: any = await APICaller.get(endpoint);
      console.log('response of gettig appointments', response);
      const {data} = response;
      const {Appointments, status} = data;
      if (status == 200 && Appointments && Appointments.length) {
        setAppointments(Appointments);
      }
    } catch (error) {
      console.log('error of gettig appointments', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllExpertMedia = async () => {
    const url = `${getAllExpertsImages}/${userId}?page=0&limit=10&sort=createdAt&fields=user_work_images,expert_profile_videos,user_profile_images`;
    try {
      const response: any = await APICaller.get(url);
      console.log('response of gettig all media', response);
      const {data} = response;
      const {
        status,
        user_profile_images_url,
        user_work_images_url,
        expert_profile_video_url,
        expertusers,
      } = data;
      if (status === 200 && expertusers && expertusers.length) {
        const experMedia = {
          expertusers,
          user_profile_images_url,
          user_work_images_url,
          expert_profile_video_url,
        };
        setExpertMedia(experMedia);
        console.log('experMedia', experMedia);
      }
    } catch (error) {
      console.log('error of gettig all media', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    expertMedia,
    appointments,
    getExpertDetails,
    getAllExpertMedia,
    getLatestAppointments,
  };
};

export default useHome;
