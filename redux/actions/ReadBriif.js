import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// read briif action displayed.
const readBriif = (params, onReadBriifSuccess, onReadBriifError, briifId) => {
  return async (dispatch) => {
    // hitting API. This api is used to mark a briif as read.
    await GlobalApiCall(
      `${URL.khbaseUrl}mark_read_recive?${params}`,
      'put',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userReadBriif(res));
        // returning response to the success function.
        onReadBriifSuccess(res, briifId);
      },
      (err) => {
        // if response false then returning response to the error function.
        onReadBriifError(err);
      },
    );
  };
};

// dispatching methods inside action
const userReadBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.READ_BRIIF,
    payload: data,
  };
};
export default readBriif;
