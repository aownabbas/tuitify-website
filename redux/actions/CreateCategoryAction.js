import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const createCategoriesAction = (params, onCreateCategoriesSuccess, onCreateCategoriesError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/createCategory?`,
      'post',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(createCategories(res));
        // returning response to the success function.
        onCreateCategoriesSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onCreateCategoriesError(err);
      },
    );
  };
};

// dispatching methods inside action
const createCategories = (create_category) => {
  return {
    // defining what type of action it is.
    type: types.CREATE_CATEGORY,
    payload: create_category,
  };
};
export default createCategoriesAction;
