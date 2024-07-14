import axios from "axios";
import * as types from "./types";

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

// played briif action displayed.
const CreateGroupAction = (
  params,
  onCreateGroupSuccess,
  onCreateGroupError
) => {
  return async (dispatch) => {
    // hitting API. This api is used to play the specific briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}admin/createGroup`,
      "post",
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(createGroups(res.data));
        // returning response to the success function.
        onCreateGroupSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onCreateGroupError(err);
      }
    );
  };
};

export default CreateGroupAction;

// dispatching methods inside action
const createGroups = (createGroup) => {
  return {
    // defining what type of action it is.
    type: types.CREATE_GROUPS,
    payload: createGroup,
  };
};
