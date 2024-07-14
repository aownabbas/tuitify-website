import * as types from "./types";

// sidebar action displayed.
const giistDetailData = (tab) => {
  return (dispatch) => {
    // if response true then dispatching action.
    dispatch(userGiistDetailData(tab));
  };
};

export default giistDetailData;

// dispatching methods inside action
const userGiistDetailData = (data) => {
  return {
    // defining what type of action it is.
    type: types.GIIST_DETAIL_DATA,
    payload: data,
  };
};
