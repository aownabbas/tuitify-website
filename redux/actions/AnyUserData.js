import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// any user data action displayed.
const anyUserData = (params, bearer_token, onAnyUserDataSuccess, onAnyUserDataError) => {
  return async (dispatch) => {
    // hitting API. This api is used for searching globally in the whole web.
    await GlobalApiCall(
      `${URL.khbaseUrl}anyuserdata?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userAnyUserData(res));
        // returning response to the success function.
        onAnyUserDataSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onAnyUserDataError(err);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}anyuserdata?${params}`, {
    //     headers: { Authorization: `Bearer ${bearer_token}` },
    //   })
    //   // getting API response.
    //   .then((res) => {
    //     // if response true then dispatching action.
    //     dispatch(userAnyUserData(res));
    //     // returning response to the success function.
    //     onAnyUserDataSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     onAnyUserDataError(err);
    //   });
  };
};

// dispatching methods inside action
const userAnyUserData = (data) => {
  return {
    // defining what type of action it is.
    type: types.ANY_USER_DATA,
    payload: data,
  };
};
export default anyUserData;
