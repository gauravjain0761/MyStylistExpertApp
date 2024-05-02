import {AppContext} from 'context';
import {useContext, useState} from 'react';
import {Appointment} from 'types';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
const {getUserDetails, getAppointments} = endPoints;

const useAppointment = () => {
  const {userDetails, setLoading} = useContext(AppContext);
  const [appointments, setAppointments] = useState<Array<Appointment>>([]);

  const {userId} = userDetails;

  const getAllAppointments = async () => {
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

  return {
    appointments,
    getAllAppointments,
  };
};

export default useAppointment;
