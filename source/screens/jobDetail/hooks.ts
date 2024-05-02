import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {AppContext} from 'context';
import {Job} from 'types';
const {getJobDetails} = endPoints;
const useJobDetail = () => {
  const {setLoading} = useContext(AppContext);
  const [jobDetail, setJobDetails] = useState<Job>({} as Job);

  const getJobDetail = async (jobId: string) => {
    setLoading(true);
    try {
      const url = `${getJobDetails}/${jobId}`;
      const response = await APICaller.get(url);
      console.log('response of getting job details', response);
      const {data} = response;
      const {status, offer} = data;
      if (status === 200 && offer) {
        setJobDetails(offer);
      }
    } catch (error) {
      console.log('error of getting job details', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobDetail,
    getJobDetail,
  };
};

export default useJobDetail;
