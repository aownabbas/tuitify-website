import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// get giist Platform Categories action displayed.
const getPlatformCategories = (params, onGetPlatformCategoriesSuccess, onGetPlatformCategoriesError) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting list of all giists categories.
    await GlobalApiCall(
      `${URL.khbaseUrl}get_platform_categories?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userGetPlatformCategories(res));
        // returning response to the success function.
        onGetPlatformCategoriesSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onGetPlatformCategoriesError(err);
      },
    );
  };
};

// dispatching methods inside action
const userGetPlatformCategories = (data) => {
  return {
    // defining what type of action it is.
    type: types.GET_PLATFORM_CATEGORIES,
    payload: data,
  };
};
export default getPlatformCategories;
