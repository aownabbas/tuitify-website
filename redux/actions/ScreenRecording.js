import * as types from "./types";

// screen recording action displayed.
const screenRecording = (tab) => {
  return (dispatch) => {
    // if response true then dispatching action.
    dispatch(userScreenRecording(tab));
  };
};

export default screenRecording;

// dispatching methods inside action
const userScreenRecording = (data) => {
  return {
    // defining what type of action it is.
    type: types.SCREEN_RECORDING,
    payload: data,
  };
};
