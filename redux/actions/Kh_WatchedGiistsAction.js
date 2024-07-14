import axios from 'axios';
import { KH_WATCHED_GIISTS } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchWatchedGiists = (watched_giists) => {
  return {
    type: KH_WATCHED_GIISTS,
    payload: watched_giists,
  };
};

const Kh_WatchedGiistsAction = (params, token, onWatchedGiistsActionSuccess, onWatchedGiistsActionError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}recentlyWatchedGiists?${params}`,
      'get',
      {},
      (response) => {
        const watchedGiists = response.data;
        onWatchedGiistsActionSuccess(watchedGiists);
        dispatch(fetchWatchedGiists(watchedGiists));
      },
      (error) => {
        const errormsg = error.message;
        onWatchedGiistsActionError(errormsg);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}recentlyWatchedGiists?${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const watchedGiists = response.data;
    //     onWatchedGiistsActionSuccess(watchedGiists);
    //     dispatch(fetchWatchedGiists(watchedGiists));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onWatchedGiistsActionError(errormsg);
    //   });
  };
};
export default Kh_WatchedGiistsAction;
