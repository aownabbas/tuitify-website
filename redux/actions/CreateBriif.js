import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// create briif action displayed.
const createBriif = (params, onCreateBriifSuccess, onCreateBriifError, buttonType) => {
  console.log(params, 'inside action');
  return async (dispatch) => {
    // hitting API. This api is used for briif creation.
    await GlobalApiCall(
      `${URL.khbaseUrl}create_briffs`,
      'post',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(userCreateBriif(res));
        // returning response to the success function.
        onCreateBriifSuccess(res, buttonType);
      },
      (err) => {
        // if response false then returning response to the error function.
        onCreateBriifError(err);
      },
    );
    // axios
    //   .post(`${URL.khbaseUrl}create_briffs?${params}`)

    //   // getting API response.
    //   .then((res) => {
    //     // if response true then dispatching action.
    //     dispatch(userCreateBriif(res));
    //     // returning response to the success function.
    //     onCreateBriifSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     onCreateBriifError(err);
    //   });
  };
};

export default createBriif;

// dispatching methods inside action
const userCreateBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.CREATE_BRIIF,
    payload: data,
  };
};
