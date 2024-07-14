import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const UpdateCategoryAction = (params, onUpdateCategoriesSuccess, onUpdateCategoriesError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/updateCategory?`,
      'put',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(updateCategories(res));
        // returning response to the success function.
        onUpdateCategoriesSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onUpdateCategoriesError(err);
      },
    );
  };
};

// dispatching methods inside action
const updateCategories = (update_category) => {
  return {
    // defining what type of action it is.
    type: types.UPDATE_CATEGORY,
    payload: update_category,
  };
};
export default UpdateCategoryAction;
