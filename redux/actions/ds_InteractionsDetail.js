import axios from 'axios';
import { FETCH_INTERACTIONS_DETAIL, FETCH_INTERACTIONS_DETAIL_LOADING } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
const InteractionsDetail = (params, token, onBriifCommentSuccess, onBriifCommentError) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: FETCH_INTERACTIONS_DETAIL_LOADING,
      });
      await GlobalApiCall(
        `${URL.khbaseUrl}get_chs?${params}`,
        'get',
        {},
        (response) => {
          console.log(response, 'data');
          onBriifCommentSuccess(response.data);
          dispatch({
            type: FETCH_INTERACTIONS_DETAIL,
            payload: response.data.briffs_interaction_detail,
          });
        },
        (error) => {
          const errormsg = error.message;
          console.log(errormsg, 'data');
          onBriifCommentError(error);
        },
      );
      // await axios
      //   .get(`${URL.khbaseUrl}get_chs?${params}`, {
      //     method: 'GET',
      //     headers: { Authorization: `Bearer ${token}` },})
      //   .then((response) => {
      //     console.log(response,"data")
      //     if (response.data.status == true) {
      //       console.log(response.data,"data")
      //       dispatch({
      //         type: FETCH_INTERACTIONS_DETAIL,
      //         payload: response.data.briffs_interaction_detail,
      //       });
      //     } else {
      //       alert('error in fetching Interactions ');
      //     }
      //   })
      //   .catch((error) => {
      //     const errormsg = error.message;
      //     console.log(errormsg,"data")
      //   });
    } catch (error) {
      console.log(error);
    }
  };
};
export default InteractionsDetail;
