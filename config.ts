export const appConfig = {
  mainDomain: 'https://api.mystylist.in/',
  IMG_URL: 'https://mystylist-media.s3.amazonaws.com',
  user_work_images_url:
    'https://api.mystylist.in/uploads/user_work_images/resized/',
};

export const endPoints = {
  expertLogin: `user/expert-login`,
  expertRegister: `user/expert-register`,
  allDisName: `user/getAllDistrictName`,
  verifyOtp: `user/verify-otp`,
  createExpertOffer: `generateOffer/generateOffer`,
  createPackage: 'generatePackage/generatePackage',
  allCategories: `category/getAllCategories`,
  generateCoupon: `generateCoupon/generateCoupon`,
  getAllOffersByUser: `generateOffer/getAllOffersByUser`,
  getAllCouponsByUser: `generateCoupon/getAllCouponsByUser`,
  generatePackage: `generatePackage/generatePackage`,
  getAllPackageByUser: `generatePackage/getAllPackageByUser`,
  getAllDatesOFUser: `expertUnavailability/getExpertAvailabilityForDate`,
  markAsBusy: `expertUnavailability/addExpertUnavailability`,
  getUserDetails: `user/getUserDetails`,
  getAllExpertsImages: `user/getAllExpertsImages`,
  markAsUnBusy: `expertUnavailability/removeUserUnavailability`,
  getCampaigns: `campaign/getCampaignsByCriteria`,
  getCampaignDetails: `campaign/getCampaignForMobile`,
  getAllFAQForMobile: `faq/getAllFAQForMobile`,
  getAllExpertReview: `review/getAllExpertReview`,
  getAllPolicy: `cms/getCMSPageForMobile/64fc1db93f161dd8548acb18`,
  getAllTerms: `cms/getCMSPageForMobile/661fa6f7f1b6729c33cd4bb1`,
  getAboutUs: `cms/getCMSPageForMobile/64fc1d003f161dd8548acb12`,
  getAppointments: `appointment/getAppointmentForMobile`,
  getAppointmentDetails: `appointment/getAppointmentDetails`,
  getAllFollowersOfExpert: `followers/getAllFollowersOfExpert`,
  getUpcomingJobs: `salonJob/getAllJobsForUsers`,
  getSavedJobs: `bookmarkJob/getAllBookmarkedJobs`,
  bookmarkJob: `bookmarkJob/bookmarkJob`,
  unBookmarkJob: `bookmarkJob/unbookmarkJob`,
  getOfferDetails: `generateOffer/getOfferDetails`,
  getPackageDetails: `generatePackage/getPackageDetails`,
  getUsersList: `user/getUsersList`,
  createRoom: `user/createRoom`,
  getExpertServices: `/service/getAllServicesForMobile`,
  getExpertSeubServices: `/service/getAllSubServicesForMobile`,
  jobApply: `JobApplication/applyJobApplication`,
  getJobDetails: 'salonJob/getJobsDetails',
  getProductListItems: `/product/getAlllProductName`,
  getAllBanner: `banner/getAllBannerForExpert/Top/Stylist`,
  getUpcomingAppointments: `appointment/getUpcomingAppointments`,
  getPastAppointments: `appointment/getPastAppointments`,
  topService: `appointment/getTopServices`,
  getExpertnewSeubServices: `demo/getAllServiceSubServices`,
  getAllExpertTopReview: `review/getAllExpertTopReview`,
  uploadSubService: `service/uploadSubServiceImage`,
  stylistWorkImage: `stylistWorkImages/getStylistWorkImages`,
  campaignAccept: `campaign/campaignAcceptDecline`,
  OfferOrders: `appointment/getOfferOrders`,
};

export const POST = 'POST';
export const GET = 'GET';
