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

const DASHED =
  '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -';

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
    boxTitle: 'Jobs',
    boxColor: '#FFD4B2',
    innerBoxColor: '#ffe1b8',
    route: 'Jobs',
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
};
