import axios from 'axios';
import { FETCH_ACTIVE_USERS, FETCH_ACTIVE_USERS_LOADING } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

const actionActiveUsers = (params, onActiveSuccess, onActiveError) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: FETCH_ACTIVE_USERS_LOADING,
      });
      await GlobalApiCall(
        `${URL.khbaseUrl}kHubDashboardActiveUsers?${params}`,
        'get',
        {},
        (response) => {
          console.log(response, 'hlw');
          dispatch({
            type: FETCH_ACTIVE_USERS,
            payload: response.data,
          });
          onActiveSuccess(response.data);
        },
        (error) => {
          const errormsg = error.message;
          onActiveError(error);
        },
      );
    } catch (error) {
      console.log(error, 'error');
    }
  };
};
export default actionActiveUsers;
