import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { FAVOURITE_GIISTS } from './types';

const fetchFavouriteGiists = (fav_giists) => {
  return {
    type: FAVOURITE_GIISTS,
    payload: fav_giists,
  };
};

// https://khdev.tuitify.com/userFavouriteGiists?limit=9&page=1&rating=0
const FavouriteGiists = (params, token, onFavouriteSuccess, onFavouriteError) => {
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}userFavouriteGiists?${params}`,
    'get',
    {},
    (res) => {
      const fav_giists = res.data;
      onFavouriteSuccess(fav_giists);
      dispatch(fetchFavouriteGiists(fav_giists));
    },
    (error) => {
      const msg = error.msg;
      onFavouriteError(msg);
    },
    );
    // axios
    //   .get(`${URL.khbaseUrl}userFavouriteGiists?${params}`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     const fav_giists = res.data;
    //     onFavouriteSuccess(fav_giists);
    //     dispatch(fetchFavouriteGiists(fav_giists));
    //   })
    //   .catch((error) => {
    //     const msg = error.msg;
    //     onFavouriteError(msg);
    //   });
  };
};
export default FavouriteGiists;
