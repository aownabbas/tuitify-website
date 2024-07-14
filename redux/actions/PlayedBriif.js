import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// played briif action displayed.
const PlayedBriif = (params, onPlayedBriifSuccess, onPlayedBriifError) => {
  return async (dispatch) => {
    // hitting API. This api is used to play the specific briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}play_briff?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userPlayedBriif(res));
        // returning response to the success function.
        onPlayedBriifSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onPlayedBriifError(err);
      },
    );
  };
};

export default PlayedBriif;

// dispatching methods inside action
const userPlayedBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.PLAYED_BRIIF,
    payload: data,
  };
};
