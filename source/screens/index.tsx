import React from 'react';
import Login from './login';
import Home from './home';
import OtpVeirfy from './otpVerify';
import MyOffers from './myOffers';
import MyPackages from './myPackages';
import MyCampaigns from './myCampaigns';
import Appointments from './appointments';
import AppointmentDetail from './appointmentDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Calendar from './calendar';
import CreatePackage from './createPackage';
import CompaignDetail from './campaingnDetail';
import PackageDetail from './packageDetail';
import CreateOffer from './createOffer';
import OfferDetail from './offerDetail';
import Faq from './faq';
import MyWallet from './myWallet';
import NotificationSetting from './notificationSetting';
import MyReviews from './myReviews';
import Chats from './chats';
import ChatDetail from './chatDetail';
import Profile from './profile';
import StylistFeeds from './stylistFeeds';
import Notifications from './notifications';
import Followers from './followers';
import Followings from './followings';
import WritePost from './writePost';
import Availability from './availability';
import SetAvailability from './setAvailability';
import Jobs from './jobs';
import JobDetail from './jobDetail';
import SubmitProposal from './submitProposal';
import VideoPlayer from './videoPlayer';
import BusyMode from './busymode';
import MyServices from './myServices';
import ServiceUpload from './uploadService';
import Loading from './Loading';
import PrivacyPolicy from './PrivacyPolicy';
import Terms from './terms';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Chats: undefined;
  ChatDetail: {receiverImage: string; receiverId: string; receiverName: string};
  MyOffers: undefined;
  MyPackages: undefined;
  MyCampaigns: undefined;
  Appointments: undefined;
  AppointmentDetail: {appointmentId: string};
  Calendar: undefined;
  CreatePackage: undefined;
  CompaignDetail: {campaignId: string};
  PackageDetail: {packageId: string};
  CreateOffer: undefined;
  OfferDetail: {offerId: string};
  Faq: undefined;
  MyWallet: undefined;
  Profile: undefined;
  MyReviews: undefined;
  StylistFeeds: undefined;
  Notifications: undefined;
  Followers: undefined;
  Followings: undefined;
  WritePost: undefined;
  Jobs: undefined;
  BusyMode: undefined;
  JobDetail: {jobId: string};
  SetAvailability: undefined;
  Availability: undefined;
  SubmitProposal: {
    jobId: string;
    userName: string;
    jobTitle: string;
    start_date: string;
    coverLetter: string;
    desireItems: Array<string>;
  };
  OtpVeirfy: {mobileNumber: string};
  NotificationSetting: undefined;
  VideoPlayer: {videoUrl: string};
  MyServices: {
    data: Object;
  };
  ServiceUpload: undefined;
  Loading: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const screenOptions = {
  headerShown: false,
};

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={'Login'} screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpVeirfy" component={OtpVeirfy} />
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  );
}

function AppStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={'Home'} screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
      <Stack.Screen name="Availability" component={Availability} />
      <Stack.Screen name="SetAvailability" component={SetAvailability} />
      <Stack.Screen name="StylistFeeds" component={StylistFeeds} />
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
      <Stack.Screen name="MyOffers" component={MyOffers} />
      <Stack.Screen name="MyPackages" component={MyPackages} />
      <Stack.Screen name="MyCampaigns" component={MyCampaigns} />
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="CompaignDetail" component={CompaignDetail} />
      <Stack.Screen name="CreatePackage" component={CreatePackage} />
      <Stack.Screen name="PackageDetail" component={PackageDetail} />
      <Stack.Screen name="CreateOffer" component={CreateOffer} />
      <Stack.Screen name="OfferDetail" component={OfferDetail} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="MyWallet" component={MyWallet} />
      <Stack.Screen name="MyReviews" component={MyReviews} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Followings" component={Followings} />
      <Stack.Screen name="WritePost" component={WritePost} />
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="JobDetail" component={JobDetail} />
      <Stack.Screen name="SubmitProposal" component={SubmitProposal} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetail} />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="BusyMode" component={BusyMode} />
      <Stack.Screen name="MyServices" component={MyServices} />
      <Stack.Screen name="ServiceUpload" component={ServiceUpload} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Terms" component={Terms} />
    </Stack.Navigator>
  );
}

export {AuthNavigator, AppStackNavigator};
