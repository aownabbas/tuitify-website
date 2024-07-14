import { AWAITING_REVIEW } from '../actions/types';

const initialState = {
  loading: false,
  awaiting_review: [],
  error: '',
};

const AwaitingReviewGiistsRed = (state = initialState, action) => {
  switch (action.type) {
    case AWAITING_REVIEW:
      return {
        loading: false,
        awaiting_review: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default AwaitingReviewGiistsRed;
