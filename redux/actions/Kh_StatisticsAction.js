import axios from 'axios';
import { KH_STATISTICS, KH_STATISTICS_LOADING } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
const Kh_StatisticsAction = (params,token) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: KH_STATISTICS_LOADING,
      });
      await GlobalApiCall(`${URL.khbaseUrl}kHubDashboardData?${params}`,
      'get',
      {},
      (response) => {
        if (response.data.status == true) {
          dispatch({
            type: KH_STATISTICS,
            payload: response.data.data,
          });
        } else {
          alert('error in fetching Live Sessions');
        }
      },
      (error) => {
        const errormsg = error.message;
      },
      ) ;
      
      // axios
      //   .get(`${URL.khbaseUrl}kHubDashboardData?${params}`, {
      //             method: 'GET',
      //             headers: { Authorization: `Bearer ${token}` },})
      //   .then((response) => {
      //     if (response.data.status == true) {
      //       dispatch({
      //         type: KH_STATISTICS,
      //         payload: response.data.data,
      //       });
      //     } else {
      //       alert('error in fetching Live Sessions');
      //     }
      //   })
      //   .catch((error) => {
      //     const errormsg = error.message;
      //   });
    } catch (error) {
      console.log(error);
    }
  };
};
export default Kh_StatisticsAction;