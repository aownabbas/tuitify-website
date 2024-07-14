import axios from 'axios';
import { KH_TOTAL_GIISTS, KH_TOTAL_GIISTS_LOADING, KH_ENGAGEMENT_RATE } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const EngagementRate = (data) => {
  return {
    type: KH_ENGAGEMENT_RATE,
    payload: data,
  };
};

const Kh_TotalGiistsAction = (params, access_token, onGiistSuccess, onGiistError) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: KH_TOTAL_GIISTS_LOADING,
      });
      await GlobalApiCall(
        `${URL.khbaseUrl}kHubDashboardGiists?${params}`,
        'get',
        {},
        (response) => {
          onGiistSuccess(response.data);
        },
        (error) => {
          const errormsg = error.message;
          console.log(error, 'error');
          onGiistError(error);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const Kh_EngagementRate = (params, onGiistEngagementSuccess, onGiistEngagementError) => {
  return async (dispatch) => {
    try {
      await GlobalApiCall(
        `${URL.khbaseUrl}kHubDashboardEngagementGiists?${params}`,
        'get',
        {},
        (response) => {
          dispatch(EngagementRate(response.data));
          onGiistEngagementSuccess(response.data);
        },
        (error) => {
          const errormsg = error.message;
          console.log(error, 'error');
          onGiistEngagementError(error);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export default Kh_TotalGiistsAction;
