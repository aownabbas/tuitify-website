import { Kh_Search } from '../actions/types';

const initialState = {
  searchKh: [],
};

const Kh_SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Kh_Search:
      return {
        searchKh: action.payload,
      };
    default:
      return state;
  }
};
export default Kh_SearchReducer;
