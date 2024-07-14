import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// global search action displayed.
const globalSearch = (params, onGlobalSearchSuccess, onGlobalSearchError) => {
  return async (dispatch) => {
    // hitting API. This api is used for searching globally in the whole web.
    await GlobalApiCall(
      `${URL.khbaseUrl}search1?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userGlobalSearch(res));
        // returning response to the success function.
        onGlobalSearchSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onGlobalSearchError(err);
      },
    );
  };
};

// dispatching methods inside action

export const setSelectedPlatform = (platform) => {
  console.log('platfkdkdorm', platform);
  return {
    type: 'SET_SELECTED_PLATFORM',
    payload: platform,
  };
};

const userGlobalSearch = (data) => {
  return {
    // defining what type of action it is.
    type: types.GLOBAL_SEARCH,
    payload: data,
  };
};
export default globalSearch;
