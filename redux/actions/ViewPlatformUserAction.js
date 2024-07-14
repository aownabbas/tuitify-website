import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const viewPlatformUserAction = (params, onViewPlatformUserSuccess, onViewPlatformUserError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/viewUser?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(viewPlatformUser(res.data));
        // returning response to the success function.
        onViewPlatformUserSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onViewPlatformUserError(err);
      },
    );
  };
};

// dispatching methods inside action
const viewPlatformUser = (view_platform_user) => {
  return {
    // defining what type of action it is.
    type: types.VIEW_PLATFORM_USER,
    payload: view_platform_user,
  };
};
export default viewPlatformUserAction;
