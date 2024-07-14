import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const UpdatePlatformAction = (params, onUpdatePlatformSuccess, onUpdatePlatformError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}giistyAdmin/updatePlatform`,
      'put',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(updatePlatform(res));
        // returning response to the success function.
        onUpdatePlatformSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onUpdatePlatformError(err);
      },
    );
  };
};

// dispatching methods inside action
const updatePlatform = (update_platform) => {
  return {
    // defining what type of action it is.
    type: types.UPDATE_PLATFORM,
    payload: update_platform,
  };
};
export default UpdatePlatformAction;