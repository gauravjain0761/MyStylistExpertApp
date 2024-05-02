import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {Appointment} from 'types';
import {AppContext} from 'context';
const {getAppointmentDetails} = endPoints;
const useAppointmentDetails = () => {
  const {setLoading} = useContext(AppContext);
  const [appointmentDetails, setAppointmentsDetails] = useState<Appointment>();

  const getAppointmentDetail = async (appointmentId: string) => {
    setLoading(true);

    try {
      const url = `${getAppointmentDetails}/${appointmentId}`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {status, Appointment} = data;
      if (status === 200 && Appointment) {
        setAppointmentsDetails(Appointment);
      }
      console.log('response of getting appointment details', response);
    } catch (error) {
      console.log('error of getting appointment details', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    appointmentDetails,
    getAppointmentDetail,
  };
};

export default useAppointmentDetails;
