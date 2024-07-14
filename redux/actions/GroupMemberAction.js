import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const groupMemberAction = (
    params,
    onGroupMembersSuccess,
    onGroupMembersError
  ) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/groupMembers?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(groupMembers(res.data));
        // returning response to the success function.
        onGroupMembersSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onGroupMembersError(err);
      },
    );
  };
};

// dispatching methods inside action
const groupMembers = (group_members) => {
    return {
      // defining what type of action it is.
      type: types.GROUP_MEMBERS,
      payload: group_members,
    };
  };
export default groupMemberAction;
