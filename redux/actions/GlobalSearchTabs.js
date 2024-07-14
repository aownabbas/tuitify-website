import * as types from "./types";

// sidebar action displayed.
const globalSearchTabs = (tab) => {
  return (dispatch) => {
    // if response true then dispatching action.
    dispatch(userGlobalSearchTabs(tab));
  };
};

export default globalSearchTabs;

// dispatching methods inside action
const userGlobalSearchTabs = (data) => {
  return {
    // defining what type of action it is.
    type: types.GLOBAL_SEARCH_TABS,
    payload: data,
  };
};
