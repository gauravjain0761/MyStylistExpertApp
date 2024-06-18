import {useContext, useEffect, useState} from 'react';
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
  getAllServiceSubServices,
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

  useEffect(() => {
    let initialPrice = 0;
    const Price = selectedSubServices.reduce((acc, service) => {
      return acc + service.price;
    }, initialPrice);
    setPrice(Price);
  }, [selectedSubServices]);

  const getAllServicesForMobile = async () => {
    setLoading(true);
    try {
      const url = `${getAllServiceSubServices}/${_id}`;
      const response = await APICaller.get(url);
      const {data} = response;
      const {status, services} = data;
      if (status === 200 || services) {
        setAllServices(services);
      }
      console.log('response of getting expert services', response);
    } catch (error) {
      console.log('error of getting expert services', error?.response);
    } finally {
      setLoading(false);
    }
  };

  const removeServices = (selectedid: any) => {
    let newSelected = selectedServices.filter(
      services => services?.service_id != selectedid,
    );
    if (selectedSubServices.length > 0) {
      let removesubServices = selectedSubServices.filter(
        services => services?.service_id != selectedid,
      );
      setSelectedSubServices(removesubServices);
    }
    setSelectedServices(newSelected);
  };

  const removeSubServices = (selectedid: any) => {
    let data: any = [];
    let newSelected = selectedSubServices.filter(
      services => services?.sub_service_id != selectedid?.sub_service_id,
    );
    setSelectedSubServices(newSelected);
    selectedServices.map(services => {
      let newselected = newSelected.every(
        item => item?.service_id != services?.service_id,
      );
      if (!newselected) {
        data.push(services);
      }
    });
    setSelectedServices(data);
  };

  const getSubServices = async (items: Array<Services>) => {
    let subServices = items.map(item => item?.sub_services);
    setAllSubServices(subServices?.flat());
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
