import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// interaction delete action displayed.
const interactionDelete = (params, onInteractionDeleteSuccess, onInteractionDeleteError) => {
  return async (dispatch) => {
    // hitting API. This api is used for deleting an interaction.
    await GlobalApiCall(
      `${URL.khbaseUrl}interaction/delete?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userInteractionDelete(res));
        // returning response to the success function.
        onInteractionDeleteSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onInteractionDeleteError(err);
      },
    );
  };
};

export default interactionDelete;

// dispatching methods inside action
const userInteractionDelete = (data) => {
  return {
    // defining what type of action it is.
    type: types.INTERACTION_DELETE,
    payload: data,
  };
};
