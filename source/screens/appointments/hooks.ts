import {AppContext} from 'context';
import {useContext, useState} from 'react';
import {Appointment} from 'types';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
const {getUserDetails, getUpcomingAppointments} = endPoints;

const useAppointment = () => {
  const {userDetails, setLoading} = useContext(AppContext);
  const [appointments, setAppointments] = useState<Array<Appointment>>([]);

  const {_id} = userDetails;

  const getAllAppointments = async () => {
    setLoading(true);
    const endpoint = `${getUpcomingAppointments}`;
    try {
      const response: any = await APICaller.post(endpoint);
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
