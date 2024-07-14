import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { FETCHING_CONFERENCE_USERS, UPDATE_JOINED_USERS_LIST } from './types';

const sendingInvitation = (fetching_conference_users) => {
  return {
    type: FETCHING_CONFERENCE_USERS,
    payload: fetching_conference_users,
  };
};

const ConferenceUsersList = (params, onFetchUsersSuccess, onFetchUsersError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}conference/users/list?channel=${params}
        `,
      'get',
      {},
      (res) => {
        dispatch(sendingInvitation(res.data));
        onFetchUsersSuccess(res);
      },
      (err) => {
        onFetchUsersError(err);
      },
    );
  };
};

export default ConferenceUsersList;

export const UpdateJoinedUsersList = (newUserjoined) => {
  return { type: UPDATE_JOINED_USERS_LIST, payload: newUserjoined };
};
