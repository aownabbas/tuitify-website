import axios from 'axios';
import { FETCH_TOTAL_INTERACTIONS } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchBriifs = (comment) => {
  return {
    type: FETCH_TOTAL_INTERACTIONS,
    payload: comment,
  };
};

const TotalBriifsAction = (params, token, onTotBriifSuccess, onTotBriifError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}get_chs?${params}`,
      'get',
      {},
      (response) => {
        console.log('response', response);
        var briifs;
        if (!response.data.All_briffs_created) {
          briifs = response.data;
        } else {
          briifs = response.data.All_briffs_created;
        }
        onTotBriifSuccess(briifs);
        dispatch(fetchBriifs(briifs));
      },
      (error) => {
        const errormsg = error.message;
        onTotBriifError(errormsg);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}get_chs?${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const briifs = response.data.All_briffs_created;
    //     onTotBriifSuccess(briifs);
    //     dispatch(fetchBriifs(briifs));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onTotBriifError(errormsg);
    //   });
  };
};
export default TotalBriifsAction;
