import { DEL_CHAPTER } from '../actions/types';

// initial state of reducer.
const initialState = {
  loading: false,
  delete_chap: [],
  error: false,
};

// reducer function.
const DeleteChapterRed = (state = initialState, action) => {
  switch (action.type) {
    case DEL_CHAPTER:
      return {
        ...state,
        delete_chap: action.payload.res,
      };
    default:
      return state;
  }
};

export default DeleteChapterRed;
