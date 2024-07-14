import axios from 'axios';
import { USER_ACTIVITIES } from './types';

import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchUsersActivities = (users_activities) => {
  return {
    type: USER_ACTIVITIES,
    payload: users_activities,
  };
};

const UserActivitiesAction = (params,  onUserActivitiesActionSuccess, onUserActivitiesActionError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}userActivities?${params}`,
      'get',
      {},
      (response) => {
        const profileUsersActivities = response.data;
        onUserActivitiesActionSuccess(profileUsersActivities );
        dispatch(fetchUsersActivities(profileUsersActivities ));
        console.log(response,'dihidi')
      },
      (error) => {
        const errormsg = error.message;
        onUserActivitiesActionError(errormsg);
      },
    );
    
  };
};
export default UserActivitiesAction;
