import * as types from './types';

// sidebar action displayed.
const sidebar = (tab) => {
  return (dispatch) => {
    console.log('tab', tab);
    // if response true then dispatching action.
    dispatch(userSidebar(tab));
  };
};

export default sidebar;

// dispatching methods inside action
const userSidebar = (data) => {
  return {
    // defining what type of action it is.
    type: types.SIDEBAR,
    payload: data,
  };
};
