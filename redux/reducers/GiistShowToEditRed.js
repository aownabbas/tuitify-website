import { SHOW_TO_EDIT } from '../actions/types';

const initialState = {
  loading: false,
  show_edit_giist: [],
  error: '',
};

const GiistShowToEditRed = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TO_EDIT:
      return {
        loading: false,
        show_edit_giist: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default GiistShowToEditRed;
