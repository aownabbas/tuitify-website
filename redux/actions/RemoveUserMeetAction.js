import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { REMOVE_USER_FROM_MEET } from './types';

const removeUser = (user) => {
//   console.log(fetching_conference_users, 'fetching_conference_users');
  return {
    type: REMOVE_USER_FROM_MEET,
    payload: user,
  };
};

const RemoveUserMeetAction = (params, onRemoveUsersSuccess, onRemoveUsersError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}conference/remove/user`,
      'delete',
      params,
      (res) => {
        dispatch(removeUser(res.data));
        onRemoveUsersSuccess(res);
        console.log(res,"response")
      },
      (err) => {
        onRemoveUsersError(err);
        console.log(err,"error")
      },
    );
  };
};

export default RemoveUserMeetAction;
