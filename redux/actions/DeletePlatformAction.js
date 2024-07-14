import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const deletePlatformAction = (params, onDeletePlatformSuccess, onDeletePlatformError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.
    await GlobalApiCall(
      `${URL.khbaseUrl}giistyAdmin/deletePlatforms`,
      'delete',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(DeletePlatform(res.data));
        // returning response to the success function.
        onDeletePlatformSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onDeletePlatformError(err);
      },
    );
  };
};

// dispatching methods inside action
const DeletePlatform = (delete_platform) => {
  return {
    // defining what type of action it is.
    type: types.DELETE_PLATFORM,
    payload: delete_platform,
  };
};
export default deletePlatformAction;
