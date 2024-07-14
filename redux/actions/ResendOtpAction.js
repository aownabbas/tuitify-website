import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const resendOtpAction = (params, onResendOtpSuccess, onResendOtpError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}inspire_signup_post_resend_verify?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(resendOtp(res.data));
        // returning response to the success function.
        onResendOtpSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onResendOtpError(err);
      },
    );
  };
};

// dispatching methods inside action
const resendOtp = (resend_otp) => {
  return {
    // defining what type of action it is.
    type: types.RESEND_OTP,
    payload: resend_otp,
  };
};
export default resendOtpAction;
