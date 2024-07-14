import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const platformCreateUserAction = (params, onPlatformCreateUsersSuccess, onPlatformCreateUsersError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/createUser`,
      'post',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(platformCreateUsers(res.data));
        // returning response to the success function.
        onPlatformCreateUsersSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onPlatformCreateUsersError(err);
      },
    );
  };
};

// dispatching methods inside action
const platformCreateUsers = (create_users) => {
  return {
    // defining what type of action it is.
    type: types.CREATE_USERS,
    payload: create_users,
  };
};
export default platformCreateUserAction;
