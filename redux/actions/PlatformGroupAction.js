import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// played briif action displayed.
const PlatformGroupAction = (params, onPlatformGroupSuccess, onPlatformGroupError) => {
  return async (dispatch) => {
    // hitting API. This api is used to play the specific briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}admin/platformGroups?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(platformGroups(res.data));
        // returning response to the success function.
        onPlatformGroupSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onPlatformGroupError(err);
      },
    );
  };
};

export const deletGroup = (params, onDeleteGroupSuccess, onDeleteGroupError) => {
  return async (dispatch) => {
    // hitting API. This api is used to play the specific briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}admin/deleteGroups`,
      'delete',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(platformGroupDelete(res.data));
        // returning response to the success function.
        onDeleteGroupSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onDeleteGroupError(err);
      },
    );
  };
};

export const EditGroup = (params, onEditGroupSuccess, onEditGroupError) => {
  return async (dispatch) => {
    // hitting API. This api is used to play the specific briif.
    await GlobalApiCall(
      `${URL.khbaseUrl}admin/updateGroup`,
      'post',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(platformGroupEdit(res.data));
        // returning response to the success function.
        onEditGroupSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onEditGroupError(err);
      },
    );
  };
};

export default PlatformGroupAction;

// dispatching methods inside action
const platformGroups = (platformGroup) => {
  return {
    // defining what type of action it is.
    type: types.PLATFORM_GROUPS,
    payload: platformGroup,
  };
};

const platformGroupDelete = (data) => {
  return {
    // defining what type of action it is.
    type: types.DELETE_GROUP,
    payload: data,
  };
};

const platformGroupEdit = (data) => {
  return {
    // defining what type of action it is.
    type: types.EDIT_GROUP,
    payload: data,
  };
};
