import { FAVOURITE_GIISTS } from '../actions/types';

const initialState = {
  loading: false,
  favourite_giists: [],
  error: '',
};

const FavouriteGiistsRed = (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITE_GIISTS:
      return {
        loading: false,
        favourite_giists: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default FavouriteGiistsRed;
