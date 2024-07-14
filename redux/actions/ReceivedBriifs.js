import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// receive briifs action displayed.
const receivedBriifs = (params, onReceivedBriifsSuccess, onReceivedBriifsError, operation) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting all the received briifs data.
    await GlobalApiCall(
      `${URL.khbaseUrl}c_recive?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userReceivedBriifs(res));
        // returning response to the success function.
        onReceivedBriifsSuccess(res, operation);
      },
      (err) => {
        // if response false then returning response to the error function.
        onReceivedBriifsError(err);
      },
    );
  };
};

export const countNumbers = (params) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting all the received briifs data.
    await GlobalApiCall(
      `${URL.khbaseUrl}c_count?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userBriifsCount(res));
      },
      (err) => {
        // if response false then returning response to the error function.
      },
    );
  };
};

// dispatching methods inside action
const userBriifsCount = (data) => {
  return {
    // defining what type of action it is.
    type: types.ALL_BRIIFS_COUNTS,
    payload: data,
  };
};

// dispatching methods inside action
const userReceivedBriifs = (data) => {
  return {
    // defining what type of action it is.
    type: types.RECEIVED_BRIIFS,
    payload: data,
  };
};
export default receivedBriifs;
