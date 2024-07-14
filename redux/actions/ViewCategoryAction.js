import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const ViewCategoriesAction = (params, onViewCategoriesSuccess, onViewCategoriesError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/viewCategory?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(viewCategories(res));
        // returning response to the success function.
        onViewCategoriesSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onViewCategoriesError(err);
      },
    );
  };
};

// dispatching methods inside action
const viewCategories = (view_category) => {
  return {
    // defining what type of action it is.
    type: types.VIEW_CATEGORY,
    payload: view_category,
  };
};
export default ViewCategoriesAction;
