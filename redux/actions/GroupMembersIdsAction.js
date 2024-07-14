import axios from "axios";
import * as types from "./types";

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

// chap sub chap giist action displayed.
const groupMemberIdsAction = (
  params,
  onGroupMembersIdsSuccess,
  onGroupMembersIdsError
) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/groupMemberIds?${params}`,
      "get",
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(groupMembersIds(res.data));
        // returning response to the success function.
        onGroupMembersIdsSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onGroupMembersIdsError(err);
      }
    );
  };
};

// dispatching methods inside action
const groupMembersIds = (group_members_ids) => {
  return {
    // defining what type of action it is.
    type: types.GROUP_MEMBERS_IDS,
    payload: group_members_ids,
  };
};
export default groupMemberIdsAction;
