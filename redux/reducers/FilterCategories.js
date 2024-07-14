import { CATEGORIES_FILTER } from '../actions/types';

const initialState = {
  loading: false,
  get_categories: [],
  error: '',
};

const FilterCategories = (state = initialState, action) => {
  // console.log(action.payload, "this is");
  switch (action.type) {
    case CATEGORIES_FILTER:
      return { loading: false, get_categories: action.payload, error: '' };
      break;
    default:
      return state;
  }
};
export default FilterCategories;
