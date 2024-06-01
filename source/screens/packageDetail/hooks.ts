import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {AppContext} from 'context';
import {Package} from 'types';
const {getPackageDetails} = endPoints;

const usePackageDetail = () => {
  const [packageDetails, setPackageDetails] = useState<Package>({} as Package);
  const {setLoading} = useContext(AppContext);

  const getPackageDetail = async (packageId: string) => {
    setLoading(true);
    try {
      const url = `${getPackageDetails}/${packageId}`;
      const response = await APICaller.get(url);
      const {data,status}=response||{}
      if (status === 200 && data) {
        setPackageDetails(data)
      }
      console.log('response of getting package details', response);
    } catch (error) {
      console.log('response of getting package details', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    packageDetails,
    getPackageDetail,
  };
};

export default usePackageDetail;
