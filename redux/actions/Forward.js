import axios from 'axios';
import * as types from './types';
// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
// forward briif action displayed.

const firstTimeCallUser = (data) => {
  return {
    // defining what type of action it is.
    type: types.FIRST_USERS,
    payload: data
  };
}

export const FirstTimeCallUser = (searchAudience) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting all users data list.
    await GlobalApiCall(
      `${URL.khbaseUrl}forward_users?${searchAudience}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(firstTimeCallUser(res));
      },
      (err) => {
        // if response false then returning response to the error function.
        console.log(err)
      },
    );
  };
}


const firstTimeCallGroups = (data) => {
  return {
    // defining what type of action it is.
    type: types.FIRST_GROUPS,
    payload: data
  };
}

export const FirstTimeCallGroups = (params) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting all users data list.
    await GlobalApiCall(
      `${URL.khbaseUrl}platform_group?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(firstTimeCallGroups(res));
      },
      (err) => {
        // if response false then returning response to the error function.
      },
    );
  };
}
export const searchUserData = (data) => {
  return {
    // defining what type of action it is.
    type: types.SEARCH_USERS,
    payload: data
  };
}
export const searchUsers = (searchAudience) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting all users data list.
    await GlobalApiCall(
      `${URL.khbaseUrl}forward_users?${searchAudience}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(searchUserData(res));
      },
      (err) => {
        // if response false then returning response to the error function.
        console.log(err)
      },
    );
  };
}

export const searchGroupsData = (data) => {
  return {
    // defining what type of action it is.
    type: types.SEARCH_GROUPS,
    payload: data
  };
}

export const searchGroups = (searchAudience) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting all users data list.
    await GlobalApiCall(
      `${URL.khbaseUrl}platform_group?${searchAudience}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(searchGroupsData(res));
      },
      (err) => {
        // if response false then returning response to the error function.
        console.log(err)
      },
    );
  };
}


// dispatching methods inside action
const userForwardBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.FORWARD_BRIIF,
    payload: data,
  };
};
const forwardBriif = (params, token, onForwardBriifSuccess, onForwardBriifError) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting all users data list.

    await GlobalApiCall(
      `${URL.khbaseUrl}forward_users?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userForwardBriif(res));
        // returning response to the success function.
        onForwardBriifSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onForwardBriifError(err);
      },
    );
  };
};



const groupData = (data) => {
  return {
    // defining what type of action it is.
    type: types.GET_GROUPS,
    payload: data,
  };
};

export const getGorupData = (params, onGetGroupSuccess, onGetGroupError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}platform_group?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(groupData(res));
        // returning response to the success function.
        onGetGroupSuccess(res.data);
      },
      (err) => {
        // if response false then returning response to the error function.
        onGetGroupError(err);
      },
    );
  };
};

export default forwardBriif;
