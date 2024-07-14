// signup action
import * as types from "./types";
import axios from "axios"
// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";


const signupDetailFormAPI = (params, onSignUpSuccess, onSignUpError) => {
    // alert("hi")
    return async (dispatch) => {
        await GlobalApiCall(
          `${URL.khbaseUrl}inspire_signup_post`,
          "post",
          params,
          (res) => {
            // if response true then dispatching action.
            dispatch(fetchAllSolutations(res.data));
            // returning response to the success function.
            onSignUpSuccess(res.data);
          },
          (err) => {
            // if response false then returning response to the error function.
            onSignUpError(err);
          }
        );
      };
}
export const fetchAllSolutations = (post_formData) => {
    return {
        type: types.SIGNUP_FORM,
        payload: post_formData
    }
}

export default signupDetailFormAPI;