import axios from "axios";
import * as types from "./types";

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

// played briif action displayed.
const CreatePlatformAction = (
  params,
  onCreatePlatformSuccess,
  onCreatePlatformError
) => {
  return async (dispatch) => {
    // hitting API. This api is used to play the specific briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}giistyAdmin/createPlatform`,
      "post",
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(createPlatform(res.data));
        // returning response to the success function.
        onCreatePlatformSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onCreatePlatformError(err);
      }
    );
  };
};

export default CreatePlatformAction;

// dispatching methods inside action
const createPlatform = (createPlatform) => {
  return {
    // defining what type of action it is.
    type: types.CREATE_PLATFORM,
    payload: createPlatform,
  };
};
