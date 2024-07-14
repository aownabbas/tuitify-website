// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";

const initialState = {
  giist_rating: {},
  loading: false,
  error: "",
};

const RatingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GIIST_RATING:
      return {
        giist_rating: action.payload,
        loading: false,
        error: "",
      };
      break;
    default:
      return state;
  }
};

export default RatingsReducer;
