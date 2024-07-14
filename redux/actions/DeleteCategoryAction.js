import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const deleteCategoryAction = (params, onDeleteCategorySuccess, onDeleteCategoryError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/deleteCategories`,
      'delete',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(DeleteCategory(res));
        // returning response to the success function.
        onDeleteCategorySuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onDeleteCategoryError(err);
      },
    );
  };
};

// dispatching methods inside action
const DeleteCategory = (delete_category) => {
  return {
    // defining what type of action it is.
    type: types.DELETE_CATEGORY,
    payload: delete_category,
  };
};
export default deleteCategoryAction;
