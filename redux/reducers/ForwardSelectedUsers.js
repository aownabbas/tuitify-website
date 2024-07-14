// getting all the types from the file types.js in actions folder.
import * as types from '../actions/types';

// initial state of reducer.
const initialState = {
  error: false,
  isLoading: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  briffDetails: '',
  des: '',
  list: '',
};

const initialState2 = {
  data: {},
};

// reducer function.
const forwardSelectedUsersBriifReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.FORWARD_SELECTED_USERS_BRIIF:
      return {
        ...state,
        data: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

// reducer function.
export const forwardDraftUsersBriifReducer = (state = initialState2, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.DRAFT_USERS_BRIIFS:
      return {
        ...state,
        data: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default forwardSelectedUsersBriifReducer;
