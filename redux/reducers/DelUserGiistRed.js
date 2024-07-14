// getting all the types from the file types.js in actions folder.

import { DEL_GIIST } from '../actions/types';

// initial state of reducer.
const initialState = {
  loading: false,
  delete_giist: [],
  error: false,
};

// reducer function.
const DelUserGiistRed = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case DEL_GIIST:
      return {
        ...state,
        delete_giist: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default DelUserGiistRed;
