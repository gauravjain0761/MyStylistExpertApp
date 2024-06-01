import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {AppContext} from 'context';
import {Services} from 'types';
import moment from 'moment';
import {Asset} from 'react-native-image-picker';
import {NativeToast} from '../../utils/toast';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from 'store';
import {generatePackage} from '../../Actions/packageAction';
const {
  getExpertServices,
  getExpertSeubServices,
  createPackage,
  getExpertnewSeubServices,
} = endPoints;

const useCreatePackage = () => {
  const navigation = useNavigation();
  const {userinfo} = useAppSelector(state => state?.common);
  const {state, district, city} = userinfo?.user || {};

  const {userDetails, setLoading} = useContext(AppContext);
  const [endDate, setEndDate] = useState<any>();
  const [startDate, setStartDate] = useState<Date>();
  const [selectedImage, setSelectedImage] = useState<Asset>();
  const [allServices, setAllServices] = useState<Services>();
  const [allSubServices, setAllSubServices] = useState<Array<Services>>([]);
  const [selectedSubServices, setSelectedSubServices] = useState<
    Array<Services>
  >([]);
  const [endDatePicker, setEndDatePicker] = useState<boolean>(false);
  const [servicesSheet, setServicesSheet] = useState<boolean>(false);
  const [subServicesSheet, setSubServicesSheet] = useState<boolean>(false);
  const [startDatePicker, setStartDatePicker] = useState<boolean>(false);
  const [createOfferSheet, setCreateOfferSheet] = useState<boolean>(false);
  const [discount, setDiscount] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<Array<Services>>([]);
  const [purchaseLimit, setPurchaseLimit] = useState<number>(10);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [packageName, setPackageName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  const {_id} = userDetails;

  const getAllServicesForMobile = async () => {
    setLoading(true);
    try {
      const url = `${getExpertServices}`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {status, services} = data;
      if (status === 200) {
        setAllServices(services);
      }
      console.log('response of getting expert services', response);
    } catch (error) {
      console.log('error of getting expert services', error);
    } finally {
      setLoading(false);
    }
  };

  const removeServices = (selectedid: any) => {
    let newSelected = selectedServices.filter(
      services => services?._id != selectedid,
    );
    if (selectedSubServices.length > 0) {
      let removesubServices = selectedSubServices.filter(
        services => services?.serviceId != selectedid,
      );
      setSelectedSubServices(removesubServices);
    }
    setSelectedServices(newSelected);
  };

  const removeSubServices = (selectedid: any) => {
    let data: any = [];
    let newSelected = selectedSubServices.filter(
      services => services?._id != selectedid?._id,
    );
    setSelectedSubServices(newSelected);

    selectedServices.map(services => {
      let newselected = newSelected.every(
        item => item?.serviceId != services?._id,
      );
      if (!newselected) {
        data.push(services);
      }
    });
    setSelectedServices(data);
  };

  const getSubServices = async (items: Array<Services>) => {
    setLoading(true);
    try {
      const url = `${getExpertnewSeubServices}/${_id}`;
      const response = await APICaller.get(url);
      const {data, status} = response;
      const {services} = data;
      console.log('okkoko', data);
      if (status === 200 && services) {
        const allServices = services.map(data => {
          return data?.sub_services?.map(item => {
            const obj = {...item};
            obj['service_name'] = obj.sub_service_name;
            return obj;
          });
        });
        setAllSubServices(allServices?.flat());
      }
      console.log('response of getting expert sub services', response);
    } catch (error) {
      console.log('error of getting expert sub services', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    endDate,
    discount,
    price,
    packageName,
    startDate,
    allServices,
    servicesSheet,
    endDatePicker,
    purchaseLimit,
    selectedServices,
    startDatePicker,
    createOfferSheet,
    allSubServices,
    subServicesSheet,
    selectedSubServices,
    additionalInfo,
    selectedImage,
    setEndDate,
    setPrice,
    setSelectedImage,
    setPackageName,
    setDiscount,
    setStartDate,
    getSubServices,
    setAdditionalInfo,
    setPurchaseLimit,
    setEndDatePicker,
    setServicesSheet,
    setStartDatePicker,
    setCreateOfferSheet,
    setSelectedServices,
    setSubServicesSheet,
    setSelectedSubServices,
    getAllServicesForMobile,
    removeServices,
    removeSubServices,
  };
};

export default useCreatePackage;
