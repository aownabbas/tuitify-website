// getting all the types from the file types.js in actions folder.
import * as types from '../actions/types';

// initial state of reducer.
const initialState = {
  searchInputVal: '',
  dateFilter: false,
  indexNum: 0,
};

// reducer function.
const ProfileGiistsSearchFilter = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.PROFILE_SEARCH_APPLY_FILTER:
      return {
        ...state,
        searchInputVal: action.payload[0],
        dateFilter: action.payload[1],
        indexNum: action.payload[2],
      };
    // default statement.
    default:
      return state;
  }
};

export default ProfileGiistsSearchFilter;
