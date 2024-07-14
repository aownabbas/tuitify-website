import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { AWAITING_REVIEW } from './types';

const fetchAwatingReviewGiists = (awaiting_review) => {
  return {
    type: AWAITING_REVIEW,
    payload: awaiting_review,
  };
};

// https://khdev.tuitify.com/userAwaitingReviewGiists?limit=9&page=1
const AwaitingReviewGiists = (params, onAwaitingReviewSuccess, onAwaitingReviewError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}userAwaitingReviewGiists?${params}`,
      'get',
      {},
      (res) => {
        const awaiting_review = res.data;
        onAwaitingReviewSuccess(awaiting_review);
        dispatch(fetchAwatingReviewGiists(awaiting_review));
      },
      (error) => {
        const msg = error.msg;
        onAwaitingReviewError(msg);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}userAwaitingReviewGiists?${params}`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     const awaiting_review = res.data;
    //     onAwaitingReviewSuccess(awaiting_review);
    //     dispatch(fetchAwatingReviewGiists(awaiting_review));
    //   })
    //   .catch((error) => {
    //     const msg = error.msg;
    //     onAwaitingReviewError(msg);
    //   });
  };
};
export default AwaitingReviewGiists;
