const API_BASE_URL = 'https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/';


export const API_BASE = 'https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/';

/** user signup & signin */
export const USER_SIGNIN = API_BASE_URL + 'user/login';
export const FORGOT_PASSWORD =  API_BASE_URL +  'user/forgot-password';
export const RESET_PASSWORD =  API_BASE_URL + 'user/reset-password/';
export const RESEND_VERIFICATION = API_BASE_URL + 'user/verification/resend';
export const VERIFY_USER = API_BASE_URL + 'user/verify/';


/** Announcement */

export const CREATE_ANNOUNCEMENT =  API_BASE_URL + 'announcement' ;
export const GET_ANNOUNCEMENT = API_BASE_URL + 'announcement';
export const SEARCH_ANNOUNCEMENT = API_BASE_URL + 'announcement/search';


/** Plans */
export const GET_PLANS = API_BASE_URL + 'plan';

/**  User */
export const GET_ALLUSERS = API_BASE_URL + 'user';
export const SEARCH_USER = API_BASE_URL + 'user/search';
export const COMPANY_EMPLOYEE = API_BASE_URL + 'user/employee';
export const USER_PROFESSION = API_BASE_URL + 'user/professions';
export const VIEW_USER = API_BASE_URL + 'user/';
export const USER_FILTER = API_BASE_URL + 'user/filter';
export const UPDATE_USER = API_BASE_URL + 'user/';

/** Company */
export const GET_ALLCOMPANY = API_BASE_URL + 'company';
export const COMPANY_BYID =  API_BASE_URL + 'company/';
export const CREATE_COMPANY = API_BASE_URL + 'company';
export const COMPANY_EMPLOYEES = API_BASE_URL + 'company/';
export const SEARCH_COMPANY = API_BASE_URL + 'company/search';
export const DELETE_COMPANY = API_BASE_URL  + 'company/';
export const DEACTIVATE_COMPANY = API_BASE_URL + 'company/';
export const COMPANY_CATEGORIES = API_BASE_URL + 'company/categories';
export const BULK_ADD  = API_BASE_URL + 'company/';
export const COMPANY_FILTER = API_BASE_URL + 'company/filter';
export const COMPANY_UPDATE = API_BASE_URL + 'company/';

/** Visitors */
export const GET_VISITORS = API_BASE_URL + 'user/visitor';
export const VISITOR_SEARCH = API_BASE_URL + 'user/visitor/search';
export const ADD_VISTORS = API_BASE_URL + 'user/visitor';

/** Resources */
export const GET_RESOURCES = API_BASE_URL + 'resource';

/** Home */
export const GET_HOME = API_BASE_URL + 'dashboard';

/**Tickets */
export const ASSIGNED_TICKETS = API_BASE_URL + 'ticket';
export const MY_TICKETS = API_BASE_URL + 'ticket/my-tickets';
export const RELATED_TO  = API_BASE_URL  + 'ticket/relatedto';
export const CREATE_TICKET = API_BASE_URL + 'ticket/';
export const TICKET_ID = API_BASE_URL + '/ticket/';
export const RECIEVED_FILTER = API_BASE_URL + 'ticket/filter';
export const RECIEVED_SEARCH = API_BASE_URL + 'ticket';
export const MY_SEARCH = API_BASE_URL + 'ticket/my-tickets';
export const MY_FILTERS = API_BASE_URL + 'ticket/my-tickets/filter';

/** Event */
export const ALL_EVENT = API_BASE_URL + 'event/';
export const CREATE_EVENT = API_BASE_URL + 'event/';
export const DELETE_EVENT  = API_BASE_URL + '/event/';

/** Booking */
export const BOOKING_RESOURCES = API_BASE_URL + 'booking/';
export const MEEETING_RESOURCES = API_BASE_URL + 'resource?resourceType=meeting_room';
export const ALL_BOOKING = API_BASE_URL + 'booking/all-bookings';
export const MY_BOOKING = API_BASE_URL + 'booking/my-bookings';
export const CHECK_AVALIABILITY = API_BASE_URL + 'booking/';
export const CREATE_BOOKING  = API_BASE_URL + '/booking';
export const MEETING_FILTER = API_BASE_URL + 'resource/available';
export const GET_ALL_MEETING_ROOM = API_BASE_URL + 'booking/occupied-meeting-rooms';
export const DELETE_BOOKINGS = API_BASE_URL + 'booking/';
export const SEARCH_RESOURCES = API_BASE_URL + 'resource/search?type=meeting_room&searchString=';