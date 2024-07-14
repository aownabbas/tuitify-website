import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { GET_HOME_GIISTS } from './types';

export const fetchHomeGiists = (get_homeGiistsData) => {
  return {
    type: GET_HOME_GIISTS,
    payload: get_homeGiistsData,
  };
};

const KH_homeGiists = (token, params, limit, onUserGiistsSuccess, onUserGiistsError) => {
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtodWJhaWJAZ21haWwuY29tIiwiaWQiOjIsInBsYXRmb3JtX2lkIjoiMTgiLCJpYXQiOjE2NjQ4NjE3NjksImV4cCI6MTY2NDk0ODE2OX0.VaZMkSGfuQEA-ifvktKiUjkNI4PfH4GGJ57uXAANdfA';
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}userGiists?status=2&page=${params}&user_id=2&limit=${limit}`,
    'get',
    {},
    (response) => {
      const get_homeGiistsData = response.data;
      console.log(get_homeGiistsData, 'hello');
      dispatch(fetchHomeGiists(get_homeGiistsData));
      onUserGiistsSuccess(response.data.items);
    },
    (error) => {
      const errormsg = error.message;
      onUserGiistsError(error);
    },
    );
    console.log(params, "this is params");
    // axios
    //   .get(`${URL.khbaseUrl}userGiists?status=2&page=${params}&user_id=2&limit=${limit}`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const get_homeGiistsData = response.data;
    //     console.log(get_homeGiistsData, 'hello');
    //     dispatch(fetchHomeGiists(get_homeGiistsData));
    //     onUserGiistsSuccess(response.data.items);
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onUserGiistsError(error);
    //   });
  };
};
export default KH_homeGiists;
