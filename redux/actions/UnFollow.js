import axios from 'axios';
import * as types from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// un follow action displayed.
const unFollow = (params, onUnFollowSuccess, onUnFollowError) => {
  return async (dispatch) => {
    // hitting API. This api is used for un following the user.
    await GlobalApiCall(
      `${URL.khbaseUrl}unfollow?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userUnFollow(res));
        // returning response to the success function.
        onUnFollowSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onUnFollowError(err);
      },
    );
  };
};

// dispatching methods inside action
const userUnFollow = (data) => {
  return {
    // defining what type of action it is.
    type: types.UN_FOLLOW,
    payload: data,
  };
};
export default unFollow;
