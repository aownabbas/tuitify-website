import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { TOP_GIISTS } from './types';

const topRatedGiistsFetch = (data) => {
  return {
    // defining what type of action it is.
    type: TOP_GIISTS,
    payload: data,
  };
};

export const TopRatedGiists = (params, onTopRatedGiistsSuccess, onTopRatedGiistsError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}topRatedGiists?${params}`,
      'get',
      {},
      (res) => {
        dispatch(topRatedGiistsFetch(res.data));
        onTopRatedGiistsSuccess(res.data);
      },
      (err) => {
        onTopRatedGiistsError(err);
      },
    );
  };
};
