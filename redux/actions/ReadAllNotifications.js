import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// read all notifications action displayed.
const readAllNotifications = (params, onReadAllNotificationsSuccess, onReadAllNotificationsError) => {
  return async (dispatch) => {
    // hitting API. This api is used to mark all notifications as read.
    await GlobalApiCall(
      `${URL.khbaseUrl}read_all_notifications?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userReadAllNotifications(res));
        // returning response to the success function.
        onReadAllNotificationsSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onReadAllNotificationsError(err);
      },
    );
  };
};

// dispatching methods inside action
const userReadAllNotifications = (data) => {
  return {
    // defining what type of action it is.
    type: types.READ_ALL_NOTIFICATIONS,
    payload: data,
  };
};
export default readAllNotifications;
