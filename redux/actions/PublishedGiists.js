import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { PUBLISHED_GIISTS } from './types';

const fetchPublishedGiists = (published_giists_data) => {
  return {
    type: PUBLISHED_GIISTS,
    payload: published_giists_data,
  };
};

// https://khdev.tuitify.com/userGiists?limit=9&page=1&categoryIds=2&user_id=2&status=2
const PublishedGiists = (token, params, onPublishedGiistsSuccess, onPublishedGiistsError) => {
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}userGiists?${params}`,
    'get',
    {},
    (res) => {
      const published_giists_data = res.data;
      onPublishedGiistsSuccess(published_giists_data);
      dispatch(fetchPublishedGiists(published_giists_data));
    },
    (error) => {
      const msg = error.msg;
      onPublishedGiistsError(msg);
    },
    );
    // axios
    //   .get(`${URL.khbaseUrl}userGiists?${params}`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     const published_giists_data = res.data;
    //     onPublishedGiistsSuccess(published_giists_data);
    //     dispatch(fetchPublishedGiists(published_giists_data));
    //   })
    //   .catch((error) => {
    //     const msg = error.msg;
    //     onPublishedGiistsError(msg);
    //   });
  };
};
export default PublishedGiists;
