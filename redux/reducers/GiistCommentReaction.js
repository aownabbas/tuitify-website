// getting all the types from the file types.js in actions folder.
import * as types from '../actions/types';

// initial state of reducer.
const initialState = {
  error: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  briffDetails: '',
  des: '',
  list: '',
};

// reducer function.
const giistCommentReactionReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.GIIST_COMMENT_REACTION:
      return {
        ...state,
        data: action.payload?.data,
      };
    // default statement.
    default:
      return state;
  }
};

export default giistCommentReactionReducer;
