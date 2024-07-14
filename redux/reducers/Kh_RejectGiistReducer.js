import { REJECT_GIIST } from '../actions/types';

const initialState = {
  loading: false,
  rejectGiist: [],
  error: '',
};

const Kh_RejectGiistReducer = (state = initialState, action) => {
  switch (action.type) {
    case REJECT_GIIST:
      return {
        loading: false,
        rejectGiist: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default Kh_RejectGiistReducer;
