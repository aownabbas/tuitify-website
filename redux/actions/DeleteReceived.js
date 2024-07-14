import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// delete received briif action displayed.
const deleteReceivedBriif = (params, onDeleteReceivedBriifSuccess, onDeleteReceivedBriifError, briifId) => {
  return async (dispatch) => {
    // hitting API. This api is used for deleting received briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}delete_recive?${params}`,
      'delete',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userDeleteReceivedBriif(res));
        // returning response to the success function.
        onDeleteReceivedBriifSuccess(res, briifId);
      },
      (err) => {
        // if response false then returning response to the error function.
        onDeleteReceivedBriifError(err);
      },
    );

    // axios
    //   .delete(`${URL.khbaseUrl}delete_recive?${params}`)

    //   // getting API response.
    //   .then((res) => {
    //     // if response true then dispatching action.
    //     dispatch(userDeleteReceivedBriif(res));
    //     // returning response to the success function.
    //     onDeleteReceivedBriifSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     onDeleteReceivedBriifError(err);
    //   });
  };
};

// dispatching methods inside action
const userDeleteReceivedBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.DELETE_RECEIVED,
    payload: data,
  };
};
export default deleteReceivedBriif;
