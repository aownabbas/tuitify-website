import * as types from "../actions/types";

// initial state of reducer.
const initialState = {
    loading: false,
    usersInMeet: [],
    error: '',
  };

// reducer function.
const UsersInConferenceReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.USER_IN_CONFERENCE:
      return {
        ...state,
        usersInMeet: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default UsersInConferenceReducer;

