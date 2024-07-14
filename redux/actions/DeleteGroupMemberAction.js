import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const deleteGroupMemberAction = (params, onDeleteGroupMemberSuccess, onDeleteGroupMemberError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.
console.log(`${URL.khbaseUrl}giistyAdmin/deletePlatforms`,params,'sssss');
    await GlobalApiCall(
      `${URL.khbaseUrl}admin/deleteGroupMembers`,
      'delete',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(DeleteGroupMember(res.data));
        // returning response to the success function.
        onDeleteGroupMemberSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onDeleteGroupMemberError(err);
      },
    );
  };
};

// dispatching methods inside action
const DeleteGroupMember = (delete_group_member) => {
  return {
    // defining what type of action it is.
    type: types.DELETE_GROUP_MEMBER,
    payload: delete_group_member,
  };
};
export default deleteGroupMemberAction;
