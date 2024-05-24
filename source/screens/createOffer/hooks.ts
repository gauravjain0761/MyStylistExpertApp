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
import { generateOffer } from '../../Actions/offersAction';
const {getExpertServices, getExpertSeubServices, createExpertOffer} = endPoints;

const useCreateOffer = () => {
  const navigation = useNavigation();
  const {userinfo}=useAppSelector(state=>state?.common)
  const {state,district,city}=userinfo?.user
  
  
  const {userDetails, setLoading} = useContext(AppContext);
  const {_id} = userDetails;
  const userId=_id
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
  const [offerName, setOfferName] = useState<string>('');

  const dispatch = useAppDispatch()
  

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

  const createOffer = async () => {
    setLoading(true);
    console.log('doscount',discount);
    
    try {
      const services = selectedServices.map(service => {
        const {service_name, _id} = service;
        const item = {
          service_id: _id,
          service_name: service_name,
        };
        return item;
      });
      const subServices=selectedSubServices.map(element => {
        const obj = {
          sub_service_id: element._id,
          sub_service_name: element.sub_service_name,
        };
        return obj
        });

      const sNamwe = JSON.stringify(services);
      const subservice=JSON.stringify(subServices)
      const sDate = moment(startDate).format('DD-MM-YYYY');
      const eDate = moment(endDate).format('DD-MM-YYYY');

      const body = new FormData();
      body.append('expert_id', userId);
      body.append('offer_name', offerName);
      body.append('service', sNamwe);
      body.append('number_of_offers', purchaseLimit);
      body.append('start_date', sDate);
      body.append('end_date', eDate);
      body.append('additional_information', additionalInfo);
      body.append('status', 'Active');
      body.append('discount', discount);
      body.append('featured_image', {
        uri: selectedImage?.uri,
        name: selectedImage?.fileName,
        type: selectedImage?.type,
      });
      body.append('state',JSON.stringify(state));
      body.append('city',JSON.stringify(city));
      body.append('district',JSON.stringify(district));
      body.append('sub_services',subservice)

      let obj={
        data:body,
        onSuccess:(res:any)=>{
          console.log('resssssss',res);
          
        },
        onFailure:(Err:any)=>{
          NativeToast(Err?.data?.message)
          console.log('REEEEEEEEERRRRRRRR',Err); 
        }
      }
      

      // const resopnse = await APICaller.post(createExpertOffer, body, {
      //   headers: {'Content-Type': 'multipart/form-data'},
      // });
      // const {data} = resopnse;
      // const {status} = data;
      // if (status === 200) {
      //   NativeToast('Offer created successfully');
      //   navigation.goBack();
      // }

      dispatch(generateOffer(obj))
    } catch (error) {
      console.log('error of create offer', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    endDate,
    discount,
    offerName,
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
    createOffer,
    setSelectedImage,
    setOfferName,
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
  };
};

export default useCreateOffer;


// import {useContext, useState} from 'react';
// import {endPoints} from '../../../config';
// import APICaller from '../../service/apiCaller';
// import {AppContext} from 'context';
// import {Services} from 'types';
// import moment from 'moment';
// import {Asset} from 'react-native-image-picker';
// import {NativeToast} from '../../utils/toast';
// import {useNavigation} from '@react-navigation/native';
// const {getExpertServices, getExpertSeubServices, createExpertOffer} = endPoints;

// const useCreateOffer = () => {
//   const navigation = useNavigation();
//   const {userDetails, setLoading} = useContext(AppContext);
//   const {userId} = userDetails;
//   const [endDate, setEndDate] = useState<any>();
//   const [startDate, setStartDate] = useState<Date>();
//   const [selectedImage, setSelectedImage] = useState<Asset>();
//   const [allServices, setAllServices] = useState<Services>();
//   const [allSubServices, setAllSubServices] = useState<Array<Services>>([]);
//   const [selectedSubServices, setSelectedSubServices] = useState<
//     Array<Services>
//   >([]);
//   const [endDatePicker, setEndDatePicker] = useState<boolean>(false);
//   const [servicesSheet, setServicesSheet] = useState<boolean>(false);
//   const [subServicesSheet, setSubServicesSheet] = useState<boolean>(false);
//   const [startDatePicker, setStartDatePicker] = useState<boolean>(false);
//   const [createOfferSheet, setCreateOfferSheet] = useState<boolean>(false);
//   const [discount, setDiscount] = useState<string>('');
//   const [selectedServices, setSelectedServices] = useState<Array<Services>>([]);
//   const [purchaseLimit, setPurchaseLimit] = useState<number>(10);
//   const [additionalInfo, setAdditionalInfo] = useState<string>('');
//   const [offerName, setOfferName] = useState<string>('');

//   const getAllServicesForMobile = async () => {
//     setLoading(true);
//     try {
//       const url = `${getExpertServices}`;
//       const response = await APICaller.get(url);
//       const {data} = response;
//       const {status, services} = data;
//       if (status === 200) {
//         setAllServices(services);
//       }
//       console.log('response of getting expert services', response);
//     } catch (error) {
//       console.log('error of getting expert services', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSubServices = async (items: Array<Services>) => {
//     const serviceIds = items?.map(item => item._id) || [];
//     setLoading(true);
//     try {
//       const body = {
//         serviceIds: serviceIds.join(','),
//       };
//       const url = `${getExpertSeubServices}`;
//       const response = await APICaller.post(url, body);
//       const {data} = response;
//       const {status, subServices} = data;
//       if (status === 200 && subServices) {
//         const allServices = subServices.map(data => {
//           const obj = {...data};
//           obj['service_name'] = obj.sub_service_name;
//           return obj;
//         });
//         setAllSubServices(allServices);
//       }
//       console.log('response of getting expert sub services', response);
//     } catch (error) {
//       console.log('error of getting expert sub services', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createOffer = async () => {
//     setLoading(true);
//     try {
//       const services = selectedServices.map(service => {
//         const {service_name, _id} = service;
//         let subServicesList: Services[] = [];
//         selectedSubServices.forEach(element => {
//           const obj = {
//             sub_service_id: element._id,
//             sub_service_name: element.sub_service_name,
//           };
//           if (element.serviceId === _id) {
//             subServicesList.push(obj);
//           }
//         });
//         const item = {
//           service_id: _id,
//           service_name: service_name,
//           sub_services: subServicesList,
//         };
//         return item;
//       });
//       const sNamwe = JSON.stringify(services);
//       const sDate = moment(startDate).format('DD-MM-YYYY');
//       const eDate = moment(endDate).format('DD-MM-YYYY');

//       const body = new FormData();
//       body.append('expert_id', userId);
//       body.append('offer_name', offerName);
//       body.append('service_name', sNamwe);
//       body.append('number_of_offers', purchaseLimit);
//       body.append('start_date', sDate);
//       body.append('end_date', eDate);
//       body.append('additional_information', additionalInfo);
//       body.append('status', 'Active');
//       body.append('discount', discount);
//       body.append('featured_image', {
//         uri: selectedImage?.uri,
//         name: selectedImage?.fileName,
//         type: selectedImage?.type,
//       });
//       const resopnse = await APICaller.post(createExpertOffer, body, {
//         headers: {'Content-Type': 'multipart/form-data'},
//       });
//       const {data} = resopnse;
//       const {status} = data;
//       if (status === 200) {
//         NativeToast('Offer created successfully');
//         navigation.goBack();
//       }

//       console.log('response of create offer', resopnse);
//     } catch (error) {
//       console.log('error of create offer', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     endDate,
//     discount,
//     offerName,
//     startDate,
//     allServices,
//     servicesSheet,
//     endDatePicker,
//     purchaseLimit,
//     selectedServices,
//     startDatePicker,
//     createOfferSheet,
//     allSubServices,
//     subServicesSheet,
//     selectedSubServices,
//     additionalInfo,
//     selectedImage,
//     setEndDate,
//     createOffer,
//     setSelectedImage,
//     setOfferName,
//     setDiscount,
//     setStartDate,
//     getSubServices,
//     setAdditionalInfo,
//     setPurchaseLimit,
//     setEndDatePicker,
//     setServicesSheet,
//     setStartDatePicker,
//     setCreateOfferSheet,
//     setSelectedServices,
//     setSubServicesSheet,
//     setSelectedSubServices,
//     getAllServicesForMobile,
//   };
// };

// export default useCreateOffer;
