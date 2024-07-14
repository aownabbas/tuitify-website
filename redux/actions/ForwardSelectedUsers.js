import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// forward selected users briif action displayed.
const forwardSelectedUsersBriif = (params, onForwardSelectedUsersBriifSuccess, onForwardSelectedUsersBriifError) => {
  return async (dispatch) => {
    // hitting API. This api is used for forwarding a briif to users.
    await GlobalApiCall(
      `${URL.khbaseUrl}forwardtousers`,
      'post',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(userForwardSelectedUsersBriif(res));
        // returning response to the success function.
        onForwardSelectedUsersBriifSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onForwardSelectedUsersBriifError(err);
      },
    );
  };
};

// dispatching methods inside action
const userForwardSelectedUsersBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.FORWARD_SELECTED_USERS_BRIIF,
    payload: data,
  };
};

export const forwardDraftUserBriif = (params, onForwardDraftUsersBriifSuccess, onForwardDraftUsersBriifError) => {
  return async (dispatch) => {
    // hitting API. This api is used for forwarding a briif to users.
    await GlobalApiCall(
      `${URL.khbaseUrl}${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userForwardDraftUsersBriif(res.data));
        // returning response to the success function.
        onForwardDraftUsersBriifSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onForwardDraftUsersBriifError(err);
      },
    );
  };
};

const userForwardDraftUsersBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.DRAFT_USERS_BRIIFS,
    payload: data,
  };
};
export default forwardSelectedUsersBriif;
