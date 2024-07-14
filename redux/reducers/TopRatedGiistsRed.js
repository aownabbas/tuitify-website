import { TOP_GIISTS } from '../actions/types';

const intialState = {
  error: false,
  data: [],
  loading: false,
};

const TopRatedGiistsRed = (state = intialState, action) => {
  switch (action.type) {
    case TOP_GIISTS:
      return {
        error: '',
        data: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default TopRatedGiistsRed;
