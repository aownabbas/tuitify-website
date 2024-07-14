import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// reactions action displayed.
const reactions = (params, onReactionsSuccess) => {
  return async (dispatch) => {
    // hitting API. This api is used to get the user reaction (like, idea, celebration)
    // on a specific comment in the interaction.
    await GlobalApiCall(
      `${URL.khbaseUrl}reactions?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userReactions(res));
        // returning response to the success function.
        onReactionsSuccess(res);
      },
      (err) => {
        // if response false then this code run.
        console.log(err);
      },
    );
  };
};

// dispatching methods inside action
const userReactions = (data) => {
  return {
    // defining what type of action it is.
    type: types.REACTIONS,
    payload: data,
  };
};
export default reactions;
