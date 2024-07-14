import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { CATEGORIES_FILTER } from './types';

export const fetchCategories = (get_categories) => {
  return {
    type: CATEGORIES_FILTER,
    payload: get_categories,
  };
};

const FilterCategories = (catsParam, onCategoriesSuccess, onCategoriesError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}categories?${catsParam}`,
      'get',
      {},
      (response) => {
        const categoryResponse = response.data;
        dispatch(fetchCategories(categoryResponse));
        onCategoriesSuccess(categoryResponse);
      },
      (error) => {
        const errormsg = error.message;
        onCategoriesError(errormsg);
      },
    );

    // axios
    //   .get(`${URL.khbaseUrl}categories`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const categoryResponse = response.data;
    //     // console.log(categoryResponse, 'hello');
    //     dispatch(fetchCategories(categoryResponse));
    //     onCategoriesSuccess(categoryResponse);
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onCategoriesError(errormsg);
    //   });
  };
};
export default FilterCategories;
