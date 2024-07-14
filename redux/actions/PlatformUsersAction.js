import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const platformUserAction = (params, onPlatformUsersSuccess, onPlatformUsersError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/platformUsers?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(platformUsers(res.data));
        // returning response to the success function.
        onPlatformUsersSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onPlatformUsersError(err);
      },
    );
  };
};

// dispatching methods inside action
const platformUsers = (view_users) => {
  return {
    // defining what type of action it is.
    type: types.VIEW_USERS,
    payload: view_users,
  };
};
export default platformUserAction;
