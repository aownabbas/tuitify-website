import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// update giist action displayed.
const updateGiist = (params, token, onUpdateGiistSuccess, onUpdateGiistError) => {
  return async (dispatch) => {
    // hitting API. This api is used to update giist.
    await GlobalApiCall(
      `${URL.khbaseUrl}updateGiist`,
      'put',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(userUpdateGiist(res.data));
        // returning response to the success function.
        onUpdateGiistSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onUpdateGiistError(err);
      },
    );

    // axios({
    //   method: 'put',
    //   url: `${URL.khbaseUrl}updateGiist`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   data: params,
    // })
    //   // getting API response.
    //   .then((res) => {
    //     // if response true then dispatching action.
    //     dispatch(userUpdateGiist(res.data));
    //     // returning response to the success function.
    //     onUpdateGiistSuccess(res.data);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     onUpdateGiistError(err);
    //   });
  };
};

// dispatching methods inside action
const userUpdateGiist = (data) => {
  console.log('GOOD', data);
  return {
    // defining what type of action it is.
    type: types.UPDATE_GIIST,
    payload: data,
  };
};
export default updateGiist;
