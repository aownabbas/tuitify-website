import { COUNTING_NUMBER } from '../actions/types';

const initialState = {
  loading: false,
  counting_giists: [],
  error: '',
};

const CountingDigGiistsRed = (state = initialState, action) => {
  switch (action.type) {
    case COUNTING_NUMBER:
      return {
        loading: false,
        counting_giists: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default CountingDigGiistsRed;
