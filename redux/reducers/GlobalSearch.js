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
  globalSearch: [],
  briffDetails: '',
  data: [],
};

const initialState2 = {
  selectedPlatform: null, // set the initial state for selected platform value
};

const initialState3 = {
  selectedPlatform: null,
};

export const GetPlatReducer = (state = initialState3, action) => {
  switch (action.type) {
    case 'FETCH_PLATFORM_DATA':
      return {
        ...state,
        selectedPlatform: action.payload, // update the selected platform value in the state with the payload value
      };
    default:
      return state;
  }
};

export const SelectedReducer = (state = initialState2, action) => {
  switch (action.type) {
    case 'SET_SELECTED_PLATFORM':
      return {
        ...state,
        selectedPlatform: action.payload, // update the selected platform value in the state with the payload value
      };
    default:
      return state;
  }
};

// reducer function.
const globalSearchReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.GLOBAL_SEARCH:
      return {
        ...state,
        // data: action.payload.res,
        globalSearch: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default globalSearchReducer;
