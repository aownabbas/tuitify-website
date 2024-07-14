import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// un archived action displayed.

const unArchived = (params, onUnArchivedBriifSuccess, onUnArchivedBriifError, briifId) => {
  return async (dispatch) => {
    // hitting API. This api is used to un archive the briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}unarchive_send_recive?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userUnArchived(res));
        // returning response to the success function.
        onUnArchivedBriifSuccess(res, briifId);
      },
      (err) => {
        // if response false then returning response to the error function.
        onUnArchivedBriifError(err);
      },
    );
  };
};

// dispatching methods inside action
const userUnArchived = (data) => {
  return {
    // defining what type of action it is.
    type: types.UN_ARCHIVED,
    payload: data,
  };
};
export default unArchived;
