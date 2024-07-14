import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// delete send briif action displayed.
const deleteSendBriif = (params, onDeleteSendBriifSuccess, onDeleteSendBriifError, briifId) => {
  return async (dispatch) => {
    // hitting API. This api is used for deleting send briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}delete_send?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userDeleteSendBriif(res));
        // returning response to the success function.
        onDeleteSendBriifSuccess(res, briifId);
      },
      (err) => {
        // if response false then returning response to the error function.
        onDeleteSendBriifError(err);
      },
    );
  };
};

export const deleteDraftBriif = (params, onDeleteDraftBriifSuccess, onDeleteDraftBriifError, briifId) => {
  return async (dispatch) => {
    // hitting API. This api is used for deleting send briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}delete_create?${params}`,
      'put',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userDeleteDraftBriif(res));
        // returning response to the success function.
        onDeleteDraftBriifSuccess(res, briifId);
      },
      (err) => {
        // if response false then returning response to the error function.
        onDeleteDraftBriifError(err);
      },
    );
  };
};

const userDeleteDraftBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.DRAFT_BRIIFS_DELETE,
    payload: data,
  };
};
// dispatching methods inside action
const userDeleteSendBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.DELETE_SEND,
    payload: data,
  };
};
export default deleteSendBriif;
