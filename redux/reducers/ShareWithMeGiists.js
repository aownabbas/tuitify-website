import { SHARE_ME_GIISTS } from '../actions/types';

const initialState = {
  loading: false,
  share_with_me: [],
  error: '',
};

const ShareWithmeGiistsRed = (state = initialState, action) => {
  switch (action.type) {
    case SHARE_ME_GIISTS:
      return {
        loading: false,
        share_with_me: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default ShareWithmeGiistsRed;
