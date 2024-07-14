import axios from 'axios';
import { USER_GROUPS } from './types';

import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchUsersGroups = (users_groups) => {
  return {
    type: USER_GROUPS,
    payload: users_groups,
  };
};

const UserGroupsAction = (params,  onUserGroupsActionSuccess, onUserGroupsActionError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}userGroups?${params}`,
      'get',
      {},
      (response) => {
        const profileUsersGroups = response.data;
        onUserGroupsActionSuccess(profileUsersGroups);
        dispatch(fetchUsersGroups(profileUsersGroups));
      },
      (error) => {
        const errormsg = error.message;
        onUserGroupsActionError(errormsg);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}userGroups?${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const profileUsersGroups = response.data;
    //     onUserGroupsActionSuccess(profileUsersGroups);
    //     dispatch(fetchUsersGroups(profileUsersGroups));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onUserGroupsActionError(errormsg);
    //   });
  };
};
export default UserGroupsAction;
