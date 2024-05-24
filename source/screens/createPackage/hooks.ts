import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {AppContext} from 'context';
import {Services} from 'types';
import moment from 'moment';
import {Asset} from 'react-native-image-picker';
import {NativeToast} from '../../utils/toast';
import {useNavigation} from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'store';
import { generatePackage } from '../../Actions/packageAction';
const {getExpertServices, getExpertSeubServices, createPackage} = endPoints;

const useCreatePackage = () => {
  const navigation = useNavigation();
    const {userinfo}=useAppSelector(state=>state?.common)
  const {state,district,city}=userinfo?.user
  
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

  const dispatch=useAppDispatch()

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

  const removeServices=(selectedid:any)=>{
    let newSelected=selectedServices.filter(services=>services?._id!=selectedid)
    if(selectedSubServices.length>0){
      let removesubServices = selectedSubServices.filter(services=>services?.serviceId!=selectedid)
      setSelectedSubServices(removesubServices)
    }
    setSelectedServices(newSelected)
  }

  const removeSubServices=(selectedid:any)=>{
    let data:any=[]
    let newSelected=selectedSubServices.filter(services=>services?._id!=selectedid?._id)
      setSelectedSubServices(newSelected)

    selectedServices.map(services=>{
      let newselected =newSelected.every((item)=>item?.serviceId!=services?._id)
      if (!newselected) {
        data.push(services)
      }
    })
    setSelectedServices(data)    
  }

  const getSubServices = async (items: Array<Services>) => {
    const serviceIds = items?.map(item => item._id) || [];
    setLoading(true);
    try {
      const body = {
        serviceIds: serviceIds.join(','),
      };
      const url = `${getExpertSeubServices}`;
      const response = await APICaller.post(url, body);
      const {data} = response;
      const {status, subServices} = data;
      if (status === 200 && subServices) {
        const allServices = subServices.map(data => {
          const obj = {...data};
          obj['service_name'] = obj.sub_service_name;
          return obj;
        });
        setAllSubServices(allServices);
      }
      console.log('response of getting expert sub services', response);
    } catch (error) {
      console.log('error of getting expert sub services', error);
    } finally {
      setLoading(false);
    }
  };

  const createExpertPackage = async () => {
    setLoading(true);
    try {
      const services = selectedServices.map(service => {
        const {service_name, _id} = service;
        let subServicesList: Services[] = [];
        selectedSubServices.forEach(element => {
          const obj = {
            sub_service_id: element._id,
            sub_service_name: element.sub_service_name,
          };
          if (element.serviceId === _id) {
            subServicesList.push(obj);
          }
        });
        const item = {
          service_id: _id,
          service_name: service_name,
          sub_services: subServicesList,
        };
        return item;
      });

      const sNamwe = JSON.stringify(services);
      const sDate = moment(startDate).format('DD-MM-YYYY');
      const eDate = moment(endDate).format('DD-MM-YYYY');

      const body = new FormData();

      body.append('expert_id', userDetails?._id);
      body.append('package_name', packageName);
      body.append('service_name', sNamwe);
      body.append('number_of_package', purchaseLimit);
      body.append('start_date', sDate);
      body.append('end_date', eDate);
      body.append('additional_information', additionalInfo);
      body.append('status', 'Active');
      body.append('discount', discount);
      body.append('rate', price);
      body.append('featured_image', {
        uri: selectedImage?.uri,
        name: selectedImage?.fileName,
        type: selectedImage?.type,
      });
      body.append('state',JSON.stringify(state));
      body.append('district',JSON.stringify(district));
      body.append('city',JSON.stringify(city))
      let obj={
        data:body,
        onSuccess:(res:any)=>{
          setLoading(false);
        NativeToast('Package created successfully');
        navigation.goBack();
        },
        onFaliure:(Err:any)=>{
          setLoading(false);
          console.log('Errrr',Err);
          NativeToast('Something went wrong')
        }
      }
      // dispatch(generatePackage(obj))
    } catch (error) {
      console.log('error of create offer', error);
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
    createExpertPackage,
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
    removeSubServices
  };
};

export default useCreatePackage;
