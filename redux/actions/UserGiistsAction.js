import axios from 'axios';
import { USER_GIISTS } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchUsersGiists = (users_giists) => {
  return {
    type: USER_GIISTS,
    payload: users_giists,
  };
};

const UserGiistsAction = (params, token, onUserGiistsActionSuccess, onUserGiistsActionError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}userGiists?${params}`,
      'get',
      {},
      (response) => {
        const profileUsersGiists = response.data;
        onUserGiistsActionSuccess(profileUsersGiists);
        dispatch(fetchUsersGiists(profileUsersGiists));
      },
      (error) => {
        const errormsg = error.message;
        onUserGiistsActionError(errormsg);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}userGiists?${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const profileUsersGiists = response.data;
    //     onUserGiistsActionSuccess(profileUsersGiists);
    //     dispatch(fetchUsersGiists(profileUsersGiists));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onUserGiistsActionError(errormsg);
    //   });
  };
};
export default UserGiistsAction;
