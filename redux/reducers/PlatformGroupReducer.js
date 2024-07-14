// getting all the types from the file types.js in actions folder.
import * as types from '../actions/types';

// initial state of reducer.
const initialState = {
  platformGroups: [],
};

const deleteInitialState = {
  DeleteGroups: '',
};

const editInitialState = {
  UpdateGroups: '',
};
// reducer function.
const platformGroupsReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.PLATFORM_GROUPS:
      return {
        ...state,
        platformGroups: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};
export const DeleteGroupsReducer = (state = deleteInitialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.DELETE_GROUP:
      return {
        ...state,
        DeleteGroups: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};
export const EditGroupsReducer = (state = editInitialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.EDIT_GROUP:
      return {
        ...state,
        UpdateGroups: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default platformGroupsReducer;
