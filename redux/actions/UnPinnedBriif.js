import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// un pinned action displayed.
const unPinnedBriif = (params, onUnPinnedBriifSuccess, onUnPinnedBriifError) => {
  return async (dispatch) => {
    // hitting API. This api is used to un pin a briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}unpin_send_recive?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userUnPinnedBriif(res));
        // returning response to the success function.
        onUnPinnedBriifSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onUnPinnedBriifError(err);
      },
    );
  };
};

// dispatching methods inside action
const userUnPinnedBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.UN_PINNED_BRIIF,
    payload: data,
  };
};
export default unPinnedBriif;
