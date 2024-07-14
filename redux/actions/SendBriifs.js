import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// send briifs action displayed.
const sendBriifs = (params, onSendBriifsSuccess, onSendBriifsError, operation) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting all the send briifs data.
    await GlobalApiCall(
      `${URL.khbaseUrl}c_send?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userSendBriifs(res));
        // returning response to the success function.
        onSendBriifsSuccess(res, operation);
      },
      (err) => {
        // if response false then returning response to the error function.
        onSendBriifsError(err);
      },
    );
  };
};

// dispatching methods inside action
const userSendBriifs = (data) => {
  return {
    // defining what type of action it is.
    type: types.SEND_BRIIFS,
    payload: data,
  };
};
export default sendBriifs;
