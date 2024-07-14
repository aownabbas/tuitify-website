import * as types from "./types";

// GLOBAL_SEARCH_APPLY_FILTER action displayed.
const globalSearchApplyFilter = (input, filter, indexNum) => {
  return (dispatch) => {
    // if response true then dispatching action.
    dispatch(userGlobalSearchApplyFilter([input, filter, indexNum]));
  };
};

export default globalSearchApplyFilter;

// dispatching methods inside action
const userGlobalSearchApplyFilter = (data) => {
  return {
    // defining what type of action it is.
    type: types.GLOBAL_SEARCH_APPLY_FILTER,
    payload: data,
  };
};
