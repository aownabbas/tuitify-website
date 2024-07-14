import axios from 'axios';
import { KH_WATCH_AGAIN_GIISTS } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchWatchAgainGiists = (watch_again_giists) => {
  return {
    type: KH_WATCH_AGAIN_GIISTS,
    payload: watch_again_giists,
  };
};

const Kh_WatchAgainGiistsAction = (params, token, onWatchAgainGiistsSuccess, onWatchAgainGiistsError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}completelyWatchedGiists?${params}`,
      'get',
      {},
      (response) => {
        const giists = response.data;
        onWatchAgainGiistsSuccess(giists);
        dispatch(fetchWatchAgainGiists(giists));
      },
      (error) => {
        const errormsg = error.message;
        onWatchAgainGiistsError(errormsg);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}recentlyWatchedGiists?${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const giists = response.data;
    //     onWatchAgainGiistsSuccess(giists);
    //     dispatch(fetchWatchAgainGiists(giists));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onWatchAgainGiistsError(errormsg);
    //   });
  };
};
export default Kh_WatchAgainGiistsAction;
