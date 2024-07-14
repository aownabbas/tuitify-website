// getting all the types from the file types.js in actions folder.
import * as types from '../actions/types';

// initial state of reducer.
const initialState = {
  isloading: true,
  error: "",
  groupsData: [],
  usersData: [],
};

// reducer function.
const forwardBriifReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.FIRST_GROUPS:
      return {
        ...state,
        groupsData: action.payload.data.items,
      };
    case types.FIRST_USERS:
      return {
        ...state,
        usersData: action.payload.data.users.items,
      };
    case types.FORWARD_BRIIF:
      return {
        ...state,
        usersData: [...state.usersData, ...action.payload.data.users.items],
      };
    case types.SEARCH_GROUPS:
      return {
        ...state,
        groupsData: action.payload.data.items,
      };
    case types.SEARCH_USERS:
      return {
        ...state,
        usersData: action.payload.data.users.items,
      };
    case types.GET_GROUPS:
      return {
        ...state,
        groupsData: [...state.groupsData, ...action.payload.data.items],
      };
    // default statement.
    default:
      return state;
  }
};




export default forwardBriifReducer;


