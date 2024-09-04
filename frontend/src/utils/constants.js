export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE = `${AUTH_ROUTES}/update-profile`


export const CONTACT_ROUTES = "api/contacts";
export const SEARCH_CONTACTS_ROUTE = `${CONTACT_ROUTES}/search`;
export const GET_DM_CONTACTS_ROUTES = `${CONTACT_ROUTES}/get-contacts-for-dm`;
export const GET_ALL_CONTACTS_ROUTE = `${CONTACT_ROUTES}/get-all-contacts`;


export const MESSAGES_ROUTES = "api/messages";
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/upload-file`;

export const GROUP_ROUTE = "api/groups";
export const CREATE_GROUP_ROUTE = `${GROUP_ROUTE}/create-group`;
export const GET_USER_GROUPS_ROUTE = `${GROUP_ROUTE}/get-user-groups`;
export const GET_GROUP_MESSAGES_ROUTE = `${GROUP_ROUTE}/get-group-messages`;