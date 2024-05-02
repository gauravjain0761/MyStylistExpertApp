import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {AppContext} from 'context';
import {Job} from 'types';
const {getUpcomingJobs, bookmarkJob, unBookmarkJob, getSavedJobs} = endPoints;

const useJobs = () => {
  const {userDetails, setLoading} = useContext(AppContext);
  const {userId} = userDetails;
  const [activeTab, setActiveTab] = useState<string>('Upcoming');
  const [upcomuingJobs, setUpcomingJobs] = useState<Array<Job>>([]);
  const [savedJobs, setSavedJobs] = useState<Array<Job>>([]);

  const getAllUpcomingJobs = async () => {
    setLoading(true);
    try {
      const url = `${getUpcomingJobs}`;
      const body = {
        jobTitle: 'Hair Stylist',
        serviceId: '6581832b6392bd21ce2dc59b',
        serviceName: 'Sample Service',
      };
      const resopnse = await APICaller.post(url);
      console.log('response of getting all upcomuing jobs', resopnse);
      const {data} = resopnse;
      const {status, jobs} = data;
      if (status == 200 && jobs?.length) {
        setUpcomingJobs(jobs);
      }
    } catch (error) {
      console.log('error of getting all upcomuing jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllSavedJobs = async () => {
    setLoading(true);
    try {
      const url = `${getSavedJobs}`;
      const body = {
        userId: userId,
      };
      const resopnse = await APICaller.post(url, body);
      console.log('response of getting all saved jobs', resopnse);
      const {data} = resopnse;
      const {status, bookmarkedJobs} = data;
      if (status == 200 && bookmarkedJobs?.length) {
        setSavedJobs(bookmarkedJobs);
      }
    } catch (error) {
      console.log('error of getting all saved jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const bookmarkedJob = async (jobId: string) => {
    setLoading(true);
    try {
      const url = `${bookmarkJob}`;
      const body = {
        userId: userId,
        jobId: jobId,
      };
      const resopnse = await APICaller.post(url, body);
      console.log('response of set bookmarked', resopnse);
      const {data} = resopnse;
    } catch (error) {
      console.log('error of set bookmarked', error);
    } finally {
      setLoading(false);
    }
  };

  const unBookmarkJob = async (jobId: string) => {
    setLoading(true);
    try {
      const url = `${bookmarkJob}`;
      const body = {
        userId: userId,
        jobId: jobId,
      };
      const resopnse = await APICaller.post(url, body);
      console.log('response of set unbookmarked', resopnse);
      const {data} = resopnse;
    } catch (error) {
      console.log('error of set unbookmarked', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    savedJobs,
    upcomuingJobs,
    setActiveTab,
    getAllSavedJobs,
    unBookmarkJob,
    bookmarkedJob,
    getAllUpcomingJobs,
  };
};

export default useJobs;
