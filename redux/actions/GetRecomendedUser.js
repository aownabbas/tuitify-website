import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// get recomend user giist action displayed.
const getRecomendUser = (params, onGetRecomendUserSuccess, onGetRecomendUserError) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting list of all giists.
    await GlobalApiCall(
      `${URL.khbaseUrl}getrecomenduser?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userGetRecomendUserBriif(res));
        // returning response to the success function.
        onGetRecomendUserSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onGetRecomendUserError(err);
      },
    );
  };
};

// dispatching methods inside action
const userGetRecomendUserBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.GET_RECOMEND_USER,
    payload: data,
  };
};
export default getRecomendUser;
