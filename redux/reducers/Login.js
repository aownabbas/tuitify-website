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
  interaction: null,
  data: {},
};

let initialState2 = {
  data: {},
};
// reducer function.
const loginReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isLoading: true,
        data: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export const logoutReducer = (state = initialState2, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.LOGOUT_USER:
      return {
        ...state,
        data: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default loginReducer;
