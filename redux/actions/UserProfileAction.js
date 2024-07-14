import axios from 'axios';
import { MYPROFILE_USERS, Follow_Status } from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchMyProfileUsers = (all_profileUsers) => {
  return {
    type: MYPROFILE_USERS,
    payload: all_profileUsers,
  };
};

export const checkFollow = () => {
  return {
    type: Follow_Status,
    payload: all_profileUsers,
  };
};

const UserProfileAction = (params, token, onUserProfileActionSuccess, onUserProfileActionError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}userProfile?${params}`,
      'get',
      {},
      (response) => {
        const profileUsers = response.data; // {.data} and {users} came from response in colsole
        console.log(profileUsers, 'action data');
        onUserProfileActionSuccess(profileUsers);
        dispatch(fetchMyProfileUsers(profileUsers));
      },
      (error) => {
        const errormsg = error.message;
        onUserProfileActionError(errormsg);
      },
    );
  };
};

export default UserProfileAction;

export const CheckFollowStatus = (params, onFollowStatusSuccess, onFollowStatusError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}checkfollow?${params}`,
      'get',
      {},
      (response) => {
        const followStatus = response.data; // {.data} and {users} came from response in colsole
        console.log(followStatus, 'action data');
        onFollowStatusSuccess(followStatus);
        dispatch(checkFollow(followStatus));
      },
      (error) => {
        onFollowStatusError(error);
      },
    );
  };
};
