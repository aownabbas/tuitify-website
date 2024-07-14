import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// follow user action displayed.
const followUser = (params, onFollowUserSuccess, onFollowUserError) => {
  return async (dispatch) => {
    // hitting API. This api is used for following the user.
    await GlobalApiCall(
      `${URL.khbaseUrl}follow_user?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userFollowUser(res));
        // returning response to the success function.
        onFollowUserSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onFollowUserError(err);
      },
    );
    // axios
    //   .post(`${URL.khbaseUrl}follow_user?${params}`)

    //   // getting API response.
    //   .then((res) => {
    //     // if response true then dispatching action.
    //     dispatch(userFollowUser(res));
    //     // returning response to the success function.
    //     onFollowUserSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     onFollowUserError(err);
    //   });
  };
};

// dispatching methods inside action
const userFollowUser = (data) => {
  return {
    // defining what type of action it is.
    type: types.FOLLOW_USER,
    payload: data,
  };
};

export default followUser;
