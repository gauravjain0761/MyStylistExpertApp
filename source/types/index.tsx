interface UserDetail {
  token: string;
  _id: string;
}

interface UserProfileImage {
  image: string;
  image_small: string;
  image_medium: string;
  image_large: string;
  is_featured: string;
  _id: string;
}

interface User {
  _id: string;
  name: string;
  user_profile_images: UserProfileImage[];
}

interface ExpertServices {
  category_id: string;
  category_name: string;
  price: number;
  _id: string;
}

interface TimeSlot {
  timeSlot_id: string;
  unavailableDate: string;
  unavailableTimeSlot: string;
  _id: string;
}

interface Appointment {
  _id: string;
  bookingNumber: string;
  userId: User;
  expertId: string;
  customerName: string;
  services: ExpertServices[];
  timeSlot: TimeSlot[];
  status: string;
  expertStatus: string;
  paymentStatus: string;
  paymentType: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserProfileImage {
  image: string;
  image_small: string;
  image_medium: string;
  image_large: string;
  is_featured: string;
  _id: string;
}

interface ExpertProfileVideo {
  video: string;
  is_featured_video: string;
  _id: string;
}

interface ExpertWorkImage {
  image: string;
  image_small: string;
  image_medium: string;
  image_large: string;
  is_featured: string;
  _id: string;
}

interface ExpertUser {
  _id: string;
  user_profile_images: UserProfileImage[];
  expert_profile_videos: ExpertProfileVideo[];
  user_work_images: ExpertWorkImage[];
}

interface ExpertMedia {
  expertusers: ExpertUser[];
  user_profile_images_url: string;
  user_work_images_url: string;
  expert_profile_video_url: string;
}

interface Faqs {
  FaqAnswer: string;
  FaqTitle: string;
  createdAt: string;
  status: string;
  updatedAt: string;
}

interface Offer {
  _id: string;
  accepted_offers: number;
  createdAt: string;
  end_date: string;
  number_of_offers: number;
  offer_name: string;
  rate: string;
  sub_services: {
    category_id: string;
    category_name: string;
  }[];
  start_date: string;
  updatedAt: string;
  user_id: string;
}

interface Package {
  _id: string;
  createdAt: string;
  end_date: string;
  number_of_package: string;
  package_name: string;
  rate: string;
  service_name: {
    category_id: string;
    category_name: string;
  }[];
  start_date: string;
  updatedAt: string;
  user_id: string;
}

interface MultiSelectPickerItems {
  label: string;
  value: string;
}

interface Services {
  _id: string;
  service_name: string;
  serviceId?: string;
  sub_service_name: string;
}

interface ExpertFollowers {
  followedDate: string;
  name: string;
  userId: string;
  user_profile_images: UserProfileImage[];
  is_featured: string;
}

interface UserProfileImage {
  image: string;
  image_large: string;
  image_medium: string;
  image_small: string;
}

interface ChatUser {
  _id: string;
  lastMessage: string;
  name: string;
  time: string;
  user_profile_images: UserProfileImage[];
}

interface City {
  _id: string;
  city_id: string;
  city_name: string;
}

interface District {
  _id: string;
  district_id: string;
  district_name: string;
}

interface State {
  _id: string;
  state_id: string;
  state_name: string;
}

interface Campaign {
  _id: string;
  campaignCode: string;
  campaignType: string;
  city: Array<City>;
  createdAt: string;
  description: string;
  district: Array<District>;
  endDate: string;
  featured_image: string;
  service_name: Array<Services>;
  startDate: string;
  state: Array<State>;
  status: string;
  title: string;
  updatedAt: string;
}

interface CampaignList {
  assignedDate: string;
  campaign: Campaign;
  campaignstatus: string;
  createdAt: string;
  expert: string;
  updatedAt: string;
}

interface Job {
  _id: string;
  budget: string;
  cities: City[];
  user_details: {
    email: string;
    username: string;
  };
  desiredProductUsed: string[];
  districts: District[];
  end_date: string;
  featured_image: string;
  jobDescription: string;
  jobStatus: string;
  jobTitle: string;
  service_name: Services[];
  start_date: string;
  states: State[];
  status: string;
  user_id: string;
}

interface Products {
  _id: string;
  brand: string;
  createdAt: string;
  description: string;
  manufacturingDate: string;
  media: string[];
  productName: string;
  status: string;
  updatedAt: string;
}

export type {
  Job,
  Faqs,
  Offer,
  Package,
  Products,
  ChatUser,
  UserDetail,
  ExpertMedia,
  Appointment,
  Services,
  Campaign,
  CampaignList,
  ExpertFollowers,
  ExpertServices,
  ExpertWorkImage,
  ExpertProfileVideo,
  MultiSelectPickerItems,
};
