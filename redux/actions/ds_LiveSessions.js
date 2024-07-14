import axios from 'axios';
import { FETCH_LIVE_USERS, FETCH_LIVE_USERS_LOADING } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
const ActionLiveSessions = (params, token, onLiveSeactionSuccess, onLiveSeactionError) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: FETCH_LIVE_USERS_LOADING,
      });
      await GlobalApiCall(
        `${URL.khbaseUrl}get_all_meetings?${params}`,
        'get',
        {},
        (response) => {
          onLiveSeactionSuccess(response.data);
          console.log(response, 'action');
        },
        (error) => {
          onLiveSeactionError(error);
        },
      );
    } catch (error) {
      console.log(error, 'iii');
    }
  };
};
export default ActionLiveSessions;
