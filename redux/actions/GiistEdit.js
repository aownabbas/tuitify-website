import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// Giists edit action displayed.
const giistEdit = (params, bearerToken, onGiistEditSuccess, onGiistEditError) => {
  return async (dispatch) => {
    // hitting API. This api is used to edit a giist.
    console.log(params, bearerToken);
    await GlobalApiCall(
      `${URL.khbaseUrl}editGiist?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userGiistEdit(res));
        // returning response to the success function.
        onGiistEditSuccess(res);
        // localStorage.setItem("@giistEditData", JSON.stringify(res))
        // window.dispatchEvent(new Event("storage"));
      },
      (err) => {
        // if response false then returning response to the error function.
        console.log(err, 'this is error');
        onGiistEditError(err);
      },
    );
  };
};

export default giistEdit;

// dispatching methods inside action
const userGiistEdit = (data) => {
  return {
    // defining what type of action it is.
    type: types.GIIST_EDIT,
    payload: data,
  };
};
