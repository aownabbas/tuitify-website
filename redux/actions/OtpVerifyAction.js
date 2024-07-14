import axios from "axios";
import * as types from "./types";

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

// chap sub chap giist action displayed.
const OtpVerifyAction = (params, onOtpVerifySuccess, onOtpVerifyError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}inspire_signup_post_verify?${params}`,
      "post",
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(otpVerify(res.data));
        // returning response to the success function.
        onOtpVerifySuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onOtpVerifyError(err);
      }
    );
  };
};

// dispatching methods inside action
const otpVerify = (otp_verify) => {
  return {
    // defining what type of action it is.
    type: types.OTP_VERIFY,
    payload: otp_verify,
  };
};
export default OtpVerifyAction;
