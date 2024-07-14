import axios from "axios";
import { SIGNUP_DROP } from "./types";
// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

export const fetchAllSolutations = (get_salutation) => {
  return {
    type: SIGNUP_DROP,
    payload: get_salutation,
  };
};

const signupDetailFormDrop = (params, onDropDownSuccess, onDrpDownError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}inspire_signup_get?${params}`,
      "get",
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(fetchAllSolutations(res.data));
        // returning response to the success function.
        onDropDownSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onDrpDownError(err);
      }
    );
  };
};

export default signupDetailFormDrop;
