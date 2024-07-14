import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const platformUpdateUserAction = (params, onPlatformUpdateUserSuccess, onPlatformUpdateUserError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/updateUser`,
      'put',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(platformUpdateUser(res.data));
        // returning response to the success function.
        onPlatformUpdateUserSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onPlatformUpdateUserError(err);
      },
    );
  };
};

// dispatching methods inside action
const platformUpdateUser = (update_users) => {
  return {
    // defining what type of action it is.
    type: types.UPDATE_USERS,
    payload: update_users,
  };
};
export default platformUpdateUserAction;
