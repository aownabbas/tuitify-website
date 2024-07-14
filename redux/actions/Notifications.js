import axios from 'axios';
import {
  CLEAR_COMMENTS,
  FETCH_DATA_LOADING,
  FETCH_NOTIFICATIONS,
  INCREMENT_NOTIFICATION_COUNT,
  MARK_NOTIFICATION_READ,
} from './types';
// import { URL } from "../../public/assets/path/path";
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
export const fetchNotifications = (notifications) => {
  return {
    type: FETCH_NOTIFICATIONS,
    payload: notifications,
  };
};

export const incrementNotificationCount = (count) => ({
  type: INCREMENT_NOTIFICATION_COUNT,
  payload: count,
});

export const clearNotificationsCount = () => ({});

export const markNotificationRead = () => ({
  type: MARK_NOTIFICATION_READ,
});

const Notifications = (params) => {
  return async (dispatch) => {
    await dispatch({ type: FETCH_DATA_LOADING });
    await GlobalApiCall(
      `${URL.khbaseUrl}get_notifications?${params}`,
      'get',
      {},
      (response) => {
        const notifications = response.data;
        dispatch(fetchNotifications(notifications));
      },
      (error) => {
        const errormsg = error.message;
      },
    );
  };
};
export default Notifications;

export const ClearNotifications = () => {
  return { type: CLEAR_COMMENTS };
};
