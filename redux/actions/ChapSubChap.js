import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const chapSubChap = (params, onChapSubChapSuccess, onChapSubChapError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}chapsubchap?${params}`,
      'put',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userChapSubChapGiist(res));
        // returning response to the success function.
        onChapSubChapSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onChapSubChapError(err);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}chapsubchap?${params}`)
    //   // getting API response.
    //   .then((res) => {
    //     // if response true then dispatching action.
    //     dispatch(userChapSubChapGiist(res));
    //     // returning response to the success function.
    //     onChapSubChapSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     onChapSubChapError(err);
    //   });
  };
};

// dispatching methods inside action
const userChapSubChapGiist = (data) => {
  return {
    // defining what type of action it is.
    type: types.CHAP_SUB_CHAP,
    payload: data,
  };
};
export default chapSubChap;
