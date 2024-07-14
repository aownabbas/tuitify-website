import * as types from "./types";

// playBriifFunction action displayed.
const playBriifFunction = (func) => {
  return (dispatch) => {
    // if response true then dispatching action.
    dispatch(userPlayBriifFunction(func));
    console.log(func);  
  };
};

export default playBriifFunction;

// dispatching methods inside action
const userPlayBriifFunction = (data) => {
  return {
    // defining what type of action it is.
    type: types.PLAY_BRIIF_FUNCTION,
    payload: data,
  };
};
