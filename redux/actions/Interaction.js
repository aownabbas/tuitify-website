import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// interaction action displayed.
const interactionData = (params, onInteractionsSuccess, onInteractionsError) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting the interaction data.
    await GlobalApiCall(
      `${URL.khbaseUrl}interaction?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userInteraction(res));
        // returning response to the success function.
        onInteractionsSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onInteractionsError(err);
      },
    );
  };
};

export default interactionData;

// dispatching methods inside action
const userInteraction = (data) => {
  return {
    // defining what type of action it is.
    type: types.INTERACTION,
    payload: data,
  };
};
