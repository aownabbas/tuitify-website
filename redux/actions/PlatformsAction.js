import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const PlatformAction = (params, onPlatformSuccess, onPlatformError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}giistyAdmin/platforms?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(adminPlatform(res));
        // returning response to the success function.
        onPlatformSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onPlatformError(err);
      },
    );
  };
};

// dispatching methods inside action
const adminPlatform = (admin_platform) => {
  return {
    // defining what type of action it is.
    type: types.ADMIN_PLATFORM,
    payload: admin_platform,
  };
};
export default PlatformAction;
