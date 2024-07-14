import axios from 'axios';
import * as types from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// un follow action displayed.
const updateUserProfile = (bearerToken, params, onUpdateUserProfileSuccess, onUpdateUserProfileError) => {
  return async (dispatch) => {
    // hitting API. This api is used for un following the user.

    await GlobalApiCall(
      `${URL.khbaseUrl}updateUserProfile`,
      'post',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(userUpdateUserProfile(res));
        // returning response to the success function.
        onUpdateUserProfileSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onUpdateUserProfileError(err);
      },
    );
    // axios({
    //   method: 'post',
    //   url: `${URL.khbaseUrl}updateUserProfile`,
    //   headers: {
    //     Authorization: 'Bearer ' + bearerToken,
    //     'Content-Type': 'application/json',
    //   },
    //   data: params,
    // })
    //   // getting API response.
    //   .then((res) => {
    //     // if response true then dispatching action.
    //     dispatch(userUpdateUserProfile(res));
    //     // returning response to the success function.
    //     onUpdateUserProfileSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     onUpdateUserProfileError(err);
    //   });
  };
};

// dispatching methods inside action
const userUpdateUserProfile = (data) => {
  return {
    // defining what type of action it is.
    type: types.UPDATE_USER_PROFILE,
    payload: data,
  };
};
export default updateUserProfile;
