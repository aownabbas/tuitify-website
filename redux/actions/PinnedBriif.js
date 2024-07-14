import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// pinned briif action displayed.
const pinnedBriif = (params, onPinnedBriifSuccess, onPinnedBriifError) => {
  return async (dispatch) => {
    // hitting API. This api is used to pin a briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}pin_send_recive?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userPinnedBriif(res));
        // returning response to the success function.
        onPinnedBriifSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onPinnedBriifError(err);
      },
    );
  };
};

// dispatching methods inside action
const userPinnedBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.PINNED_BRIIF,
    payload: data,
  };
};
export default pinnedBriif;
