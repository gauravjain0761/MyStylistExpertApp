import {useContext, useState} from 'react';
import {endPoints} from '../../../config';
import APICaller from '../../service/apiCaller';
import {AppContext} from 'context';
import {MultiSelectPickerItems, Products} from 'types';
import moment from 'moment';
import {NativeToast} from '../../utils/toast';
import {useNavigation} from '@react-navigation/native';
const {jobApply, getProductListItems} = endPoints;

const useSubmitProposel = () => {
  const navigation = useNavigation();
  const {setLoading, userDetails} = useContext(AppContext);
  const {userId} = userDetails;
  const [time, setTime] = useState<Date>(new Date());
  const [timePicker, setTimePicker] = useState<boolean>(false);
  const [budget, setBudget] = useState<string>();
  const [description, setDescription] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<
    Array<MultiSelectPickerItems>
  >([]);
  const [multiSelectBottomSheet, setMultiSelectBottomSheet] =
    useState<boolean>(false);
  const [productItems, setproductItems] = useState<
    Array<MultiSelectPickerItems>
  >([]);
  const [submitProposalSheet, showSubmitProposalSheet] =
    useState<boolean>(false);
  const getProductsItems = async () => {
    setLoading(true);
    try {
      const url = getProductListItems;
      const response = await APICaller.get(url);
      const {data} = response;
      const {product, status} = data;
      if (status === 200) {
        const productItems = product.map((data: Products) => {
          const obj = {label: data.productName, value: data._id};
          return obj;
        });
        setproductItems(productItems);
      }
      console.log('resopnse of getting products list items', response);
    } catch (error) {
      console.log('error of getting products list items', error);
    } finally {
      setLoading(false);
    }
  };

  const submitProposal = async (jobId: string) => {
    setLoading(true);
    try {
      const productUsed = selectedProducts.map(data => {
        const obj = {
          product_id: data.value,
          product_name: data.label,
        };
        return obj;
      });
      const timeOfContact = moment(time).format('DD-MM-YYYY');
      const url = jobApply;
      const body = {
        user_id: userId,
        salonJob_id: jobId,
        coverLetter: description,
        applicationStatus: 'pending',
        appliedBudget: budget,
        bestTimeToContact: timeOfContact,
        productsUsed: productUsed,
      };

      const response = await APICaller.post(url, body);
      const {data} = response;
      const {status} = data;
      if (status === 200) {
        NativeToast('Job applied successfully');
        navigation.navigate('Home');
      }
      console.log('resopnse of applied job', response);
    } catch (error) {
      console.log('error of applied job', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    submitProposal,
    time,
    timePicker,
    setTime,
    budget,
    setBudget,
    setTimePicker,
    productItems,
    description,
    setDescription,
    getProductsItems,
    submitProposalSheet,
    showSubmitProposalSheet,
    multiSelectBottomSheet,
    selectedProducts,
    setSelectedProducts,
    setMultiSelectBottomSheet,
  };
};

export default useSubmitProposel;
