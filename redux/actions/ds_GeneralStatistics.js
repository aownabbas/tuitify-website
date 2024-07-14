import axios from 'axios';
import { FETCH_GENERAL_STATISTICS, FETCH_GENERAL_STATISTICS_LOADING } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
const ActionGeneralStatistics = (params, token) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: FETCH_GENERAL_STATISTICS_LOADING,
      });
      await GlobalApiCall(
        `${URL.khbaseUrl}get_chs?${params}`,
        'get',
        {},
        (response) => {
          if (response.data.status == true) {
            dispatch({
              type: FETCH_GENERAL_STATISTICS,
              payload: response.data.user_interactions,
            });
          } else {
            alert('error in fetching GeneralStats ');
          }
        },
        (error) => {
          const errormsg = error.message;
        },
      );
      // await axios.get(`${URL.khbaseUrl}get_chs?${params}`, {
      //     method: 'GET',
      //     headers: { Authorization: `Bearer ${token}` },})
      // .then(response=>{
      //     if(response.data.status ==true){
      //         dispatch({
      //             type:FETCH_GENERAL_STATISTICS,
      //             payload:response.data.user_interactions,
      //         })

      //     }else{
      //         alert("error in fetching GeneralStats ")
      //     }
      // }).catch(error=>{
      //     const errormsg = error.message
      // })
    } catch (error) {
      console.log(error);
    }
  };
};
export default ActionGeneralStatistics;
