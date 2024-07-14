import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// chap sub chap giist action displayed.
const CategoriesAction = (params, onCategoriesSuccess, onCategoriesError) => {
  return async (dispatch) => {
    // hitting API. This api is used to get a specific giist data.

    await GlobalApiCall(
      `${URL.khbaseUrl}admin/platformCategories?${params}`,
      'get',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(platformCategories(res));
        // returning response to the success function.
        onCategoriesSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onCategoriesError(err);
      },
    );
  };
};

// dispatching methods inside action
const platformCategories = (plat_category) => {
  return {
    // defining what type of action it is.
    type: types.PLAT_CATEGORY,
    payload: plat_category,
  };
};
export default CategoriesAction;
