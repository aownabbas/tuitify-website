import { REMOVE_USER_FROM_MEET } from '../actions/types';

// initial state of reducer.
const initialState = {
  loading: false,
  removeUser: [],
  error: '',
};

// reducer function.
const RemoveUserMeetReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case REMOVE_USER_FROM_MEET:
      return {
        ...state,
        removeUser: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default RemoveUserMeetReducer;
