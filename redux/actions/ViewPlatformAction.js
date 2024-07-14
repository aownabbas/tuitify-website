import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const ViewPlatformAction = (params, onViewPlatformSuccess, onViewPlatformError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}giistyAdmin/viewPlatform?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(viewPlatform(res.data));
        // returning response to the success function.
        onViewPlatformSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onViewPlatformError(err);
      },
    );
  };
};

// dispatching methods inside action
const viewPlatform = (view_platform) => {
  return {
    // defining what type of action it is.
    type: types.VIEW_PLATFORM,
    payload: view_platform,
  };
};
export default ViewPlatformAction;
