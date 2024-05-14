import images from 'images';

const PLEASE_LOGIN = 'Please Login with your phone number';
const PHONE_NUMBER = 'Phone Number';
const OTP_VERIFICATION = 'OTP Verification';
const ENTER_SIX_DIGIT = 'Enter the 6-digit code sent to you at';
const NOT_RECEIVE_CODE = `Didn't receive a code? `;
const RESEND = 'Resend!';
const SURE_CREATE_OFFER = 'Are you sure that you want to\ncreate this offer?';
const SURE_CREATE_PACKAGE =
  'Are you sure that you want to\ncreate this package?';
const OFFER_NOT_EDITED = 'Once the offer is created it can not be edited.';
const SURE_CREATE_PROPOSAL =
  'Are you sure that you want to\nsubmit this proposal?';
const PACKAGE_NOT_EDITED = 'Once the package is created it can not be edited.';
const ALLOW_US='Allow us to access your location'

const DASHED =
  '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -';

const TODAY_IS_NEW="Today is a new day. It’s your day. You shape it."
const VERIFY_OTP='Verify OTP'
const ENTER_THE_6_DIGIT='Enter the 6-digit OTP sent to you at';
const DIDNT_RECEIVE_OTP='Didn’t receive OTP?';

const NewDASHED =
  '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -';



const HOME_SCREEN_TOP_MENU = [
  {
    icon: images.PercentageIcon,
    boxTitle: 'My Stylist Offers',
    boxColor: '#F4F0DE',
    innerBoxColor: '#E4E0CC',
    route: 'MyOffers',
  },
  {
    icon: images.BoxIconPackage,
    boxTitle: 'My Stylist Packages',
    boxColor: '#CDF0ff',
    innerBoxColor: '#BAE1f1',
    route: 'MyPackages',
  },
  {
    icon: images.CampaignsIcon,
    boxTitle: 'My Stylist Campaigns',
    boxColor: '#FFE1e4',
    innerBoxColor: '#f0d0cf',
    route: 'MyCampaigns',
  },
  {
    icon: images.AppointmentIcon,
    boxTitle: 'Appointments',
    boxColor: '#f7e6e6',
    innerBoxColor: '#e6cfcf',
    route: 'Appointments',
  },
  {
    icon: images.AvailabilityIcon,
    boxTitle: 'Availability',
    boxColor: '#ffebe0',
    innerBoxColor: '#ffdecc',
    route: 'Availability',
  },
  {
    icon: images.JobIcon,
    boxTitle: 'My Services',
    boxColor: '#ffecd3',
    innerBoxColor: '#fee1b9',
    route: 'MyServices',
  },
];

const SERVIE_ARR = [
  {name: 'haircutting', totalSold: '963', bgColor: '#F7F5EB'},
  {name: 'haircut', totalSold: '480', bgColor: '#e2f4fc'},
  {name: 'haircut', totalSold: '258', bgColor: '#F7F5EB'},
  {name: 'haircut', totalSold: '123', bgColor: '#e2f4fc'},
  {name: 'haircut', totalSold: '789', bgColor: '#F7F5EB'},
  {name: 'haircut', totalSold: '259', bgColor: '#e2f4fc'},
];

const AVAILABILITIES = [
  {day: 'Sunday', status: 'Closed'},
  {day: 'Monday', status: '10:AM - 8PM'},
  {day: 'Tuesday', status: '10:AM - 8PM'},
  {day: 'Wednesday', status: '10:AM - 8PM'},
  {day: 'Thursday', status: '10:AM - 8PM'},
  {day: 'Friday', status: '10:AM - 8PM'},
  {day: 'Saturday', status: '10:AM - 8PM'},
  {day: 'Sunday', status: '10:AM - 8PM'},
];

const AMENITIES = [
  {
    title: 'Parking Space',
    color: '#f7f5eb',
    icon: images.ParkingSpace,
  },
  {
    title: 'Music',
    color: '#e2f4fc',
    icon: images.Music,
  },
  {
    title: 'Wifi',
    color: '#faf1ec',
    icon: images.Wifi,
  },
  {
    color: '#f6f1f1',
    title: 'Selfie Station',
    icon: images.SelfieCamera,
  },
  {
    color: '#edf3fa',
    title: 'Child-Friendly',
    icon: images.ChildFriendly,
  },
  {
    color: '#f6edfa',
    title: 'Credit Cards Accepted',
    icon: images.CreditCard,
  },
  {
    color: '#fffae9',
    title: 'Pets-Friendly',
    icon: images.PetsFriendly,
  },
  {
    color: '#ebffe9',
    title: 'Power Backup',
    icon: images.PowerBackup,
  },
];

export const user_profile_images=[
  {
    id:1,
    image:images.expert1
  },
  {
    id:2,
    image:images.expert2
  },
  {
    id:3,
    image:images.expert3
  },{
    id:4,
    image:images.expert4
  },
  {
    id:5,
    image:images.expert5
  },
  {
    id:6,
    image:images.expert6
  },
  {
    id:7,
    image:images.expert7
  },
  {
    id:8,
    image:images.expert8
  }
  ,{
    id:9,
    image:images.expert9
  }
]

export const offerData = [
  {
    id: 1,
    discount: '5%',
  },
  {
    id: 2,
    discount: '10%',
  },
  {
    id: 3,
    discount: '15%',
  },
  {
    id: 4,
    discount: '20%',
  },
  {
    id: 5,
    discount: '25%',
  },
  {
    id: 6,
    discount: '30%',
  },
  {
    id: 7,
    discount: '35%',
  },
  {
    id: 8,
    discount: '40%',
  },
  {
    id: 9,
    discount: '45%',
  },
  {
    id: 10,
    discount: '50%',
  },
  {
    id: 11,
    discount: '55%',
  },
  {
    id: 12,
    discount: '55%',
  },
  {
    id: 13,
    discount: '60%',
  },
  {
    id: 14,
    discount: '65%',
  },
  {
    id: 15,
    discount: '70%',
  },
  {
    id: 16,
    discount: '75%',
  },
  {
    id: 17,
    discount: '80%',
  },
  {
    id: 18,
    discount: '85%',
  },
  {
    id: 19,
    discount: '90%',
  },
  {
    id: 20,
    discount: '95%',
  },
  {
    id: 21,
    discount: '100%',
  },
];

export const Purchase = [
  {
    id: 1,
    purchase: '5',
  },
  {
    id: 2,
    purchase: '10',
  },
  {
    id: 3,
    purchase: '15',
  },
  {
    id: 4,
    purchase: '20',
  },
  {
    id: 5,
    purchase: '25',
  },
  {
    id: 6,
    purchase: '30',
  },
  {
    id: 7,
    purchase: '35',
  },
  {
    id: 8,
    purchase: '40',
  },
  {
    id: 9,
    purchase: '45',
  },
  {
    id: 10,
    purchase: '50',
  },
  {
    id: 11,
    purchase: '55',
  },
  {
    id: 12,
    purchase: '55',
  },
  {
    id: 13,
    purchase: '60',
  },
  {
    id: 14,
    purchase: '65',
  },
  {
    id: 15,
    purchase: '70',
  },
  {
    id: 16,
    purchase: '75',
  },
  {
    id: 17,
    purchase: '80',
  },
  {
    id: 18,
    purchase: '85',
  },
  {
    id: 19,
    purchase: '90',
  },
  {
    id: 20,
    purchase: '95',
  },
  {
    id: 21,
    purchase: '100',
  },
];

export const Services = [
  {
    id: 1,
    name: 'Hair Wash Normal',
    price: 150,
    images: images?.services,
  },
  {
    id: 2,
    name: 'Hair Wash Normal',
    price: 150,
    images: images?.services,
  },
  {
    id: 3,
    name: 'Head Massage',
    price: 450,
    images: images?.services,
  },
  {
    id: 4,
    name: 'Beard & Shave',
    price: 150,
    images: images?.services,
  },
  {
    id: 5,
    name: 'Farman Se Beard',
    price: 200,
    images: images?.services,
  },
  {
    id: 6,
    name: 'Color Normal',
    price: 1000,
    images: images?.services,
  },
  {
    id: 7,
    name: 'INOA Color',
    price: 1100,
    images: images?.services,
  },
  {
    id: 8,
    name: 'INOA Color',
    price: 1100,
    images: images?.services,
  },
  {
    id: 9,
    name: 'Beard Color Normal',
    price: 750,
    images: images?.services,
  },
  {
    id: 10,
    name: 'Baby Boy Cut',
    price: 250,
    images: images?.services,
  },
];



export const AppointmentsData=[
  {
    id:1,
    bookingNumber:'25',
    customerName:'Nico Robin',
    status:'Upcoming',
    services:'Hair cut, beard trim, Waxing',
    createdAt:Date.now(),
    amount:500
  }
  ,
  {
    id:2,
    bookingNumber:'25',
    customerName:'Nico Robin',
    status:'Upcoming',
    services:'Hair cut, beard trim, Waxing',
    createdAt:Date.now(),
    amount:500
  }
]

export {
  RESEND,
  DASHED,
  AMENITIES,
  SERVIE_ARR,
  PLEASE_LOGIN,
  PHONE_NUMBER,
  ENTER_SIX_DIGIT,
  NOT_RECEIVE_CODE,
  OTP_VERIFICATION,
  OFFER_NOT_EDITED,
  AVAILABILITIES,
  HOME_SCREEN_TOP_MENU,
  SURE_CREATE_PACKAGE,
  SURE_CREATE_OFFER,
  PACKAGE_NOT_EDITED,
  SURE_CREATE_PROPOSAL,
  TODAY_IS_NEW,
  VERIFY_OTP,
  ENTER_THE_6_DIGIT,
  DIDNT_RECEIVE_OTP,
  ALLOW_US,
  NewDASHED
};
