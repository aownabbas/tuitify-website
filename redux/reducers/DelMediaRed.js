import { DEL_MEDIA } from '../actions/types';

// initial state of reducer.
const initialState = {
  loading: false,
  delete_media: [],
  error: false,
};

// reducer function.
const DelMediaRed = (state = initialState, action) => {
  switch (action.type) {
    case DEL_MEDIA:
      return {
        ...state,
        delete_media: action.payload.res,
      };
    default:
      return state;
  }
};

export default DelMediaRed;
