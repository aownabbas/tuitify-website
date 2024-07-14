import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

//archived briifs action displayed.
const archivedBriifs = (params, onArchivedBriifsSuccess, onArchivedBriifsError, operation) => {
  return async (dispatch) => {
    // hitting API. This api is used to get all archived briifs data.
    await GlobalApiCall(
      `${URL.khbaseUrl}c_archive?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userArchivedBriifs(res));
        // returning response to the success function.
        onArchivedBriifsSuccess(res, operation);
      },
      (err) => {
        // if response false then returning response to the error function.
        onArchivedBriifsError(err);
      },
    );
  };
};

export const draftBriifs = (params, onDraftBriifsSuccess, onDraftBriifsError, operation) => {
  return async (dispatch) => {
    // hitting API. This api is used to get all archived briifs data.
    await GlobalApiCall(
      `${URL.khbaseUrl}mysave?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userDraftBriffs(res));
        // returning response to the success function.
        onDraftBriifsSuccess(res, operation);
      },
      (err) => {
        // if response false then returning response to the error function.
        onDraftBriifsError(err);
      },
    );
  };
};

const userDraftBriffs = (data) => {
  return {
    // defining what type of action it is.
    type: types.DRAFT_BRIIFS,
    payload: data,
  };
};

// dispatching methods inside action
const userArchivedBriifs = (data) => {
  return {
    // defining what type of action it is.
    type: types.ARCHIVED_BRIIFS,
    payload: data,
  };
};
export default archivedBriifs;
