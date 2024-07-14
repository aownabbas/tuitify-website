import axios from 'axios';
// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import * as types from './types';

// archived briif action displayed.
const archived = (params, onArchivedBriifSuccess, onArchivedBriifError, briifId, actionFrom) => {
  return async (dispatch) => {
    // hitting API. This api is used to archive the briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}archive_send_recive?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        // returning response to the success function.
        onArchivedBriifSuccess(res, briifId, actionFrom);
        dispatch(userArchived(res));
      },
      (err) => {
        // if response false then returning response to the error function.
        onArchivedBriifError(err);
      },
    );
    // axios
    //   .post(`${URL.khbaseUrl}archive_send_recive?${params}`)

    //   // getting API response.
    //   .then((res) => {
    //     // if response true then dispatching action.
    //     // returning response to the success function.
    //     if (res.data.status == true) onArchivedBriifSuccess(res);
    //     dispatch(userArchived(res));
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     // onArchivedBriifError(err);
    //   });
  };
};
// dispatching methods inside action
const userArchived = (data) => {
  return {
    // defining what type of action it is.
    type: types.ARCHIVED,
    payload: data,
  };
};
export default archived;
