import axios from 'axios';
import { REJECT_GIIST } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchRejectGiists = (reject_giists) => {
  return {
    type: REJECT_GIIST,
    payload: reject_giists,
  };
};

// const Kh_RejectGiistAction = (VidId, status, reason, token, onRejectGiistSuccess, onRejectGiistError) => {
const Kh_RejectGiistAction = (paramsBody, token, onRejectGiistSuccess, onRejectGiistError) => {
  console.log(paramsBody, 'in action');
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}reviewGiist`,
      'put',
      paramsBody,
      (res) => {
        dispatch(fetchRejectGiists(res.data));
        console.log(res, 'res in action');
        onRejectGiistSuccess(res.data);
      },
      (err) => {
        console.log(err, 'res in action');
        onRejectGiistError(err);
      },
    );
  };
  //   var axios = require('axios');
  //   var data = JSON.stringify({
  //     giist_id: VidId,
  //     status: String(status),
  //     rejection_reason: reason,
  //   });
  //   console.log(data, 'data action');
  //   var config = {
  //     method: 'put',
  //     url: 'https://khdev.tuitify.com/reviewGiist',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       const rejectGiist = response.data;
  //       onRejectGiistSuccess(rejectGiist);
  //       dispatch(fetchRejectGiists(rejectGiist));
  //       console.log(response.data, 'hlw');
  //     })
  //     .catch(function (error) {
  //       console.log(error, 'err');
  //       const errormsg = error.message;
  //       onRejectGiistError(errormsg);
  //     });
  // };
};
export default Kh_RejectGiistAction;
