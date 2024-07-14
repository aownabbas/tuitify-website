import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// un read action displayed.
const unReadBriif = (params, onUnReadBriifSuccess, onUnReadBriifError, briifId) => {
  return async (dispatch) => {
    // hitting API. This api is used to mark a briif as un read.
    await GlobalApiCall(
      `${URL.khbaseUrl}mark_unread_recive?${params}`,
      'put',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userUnReadBriif(res));
        // returning response to the success function.
        onUnReadBriifSuccess(res, briifId);
      },
      (err) => {
        // if response false then returning response to the error function.
        onUnReadBriifError(err);
      },
    );
  };
};

// dispatching methods inside action
const userUnReadBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.UN_READ_BRIIF,
    payload: data,
  };
};
export default unReadBriif;
