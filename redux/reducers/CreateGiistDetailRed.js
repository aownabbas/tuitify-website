import { GIIST_CREATE_DETAIL } from '../actions/types';

const initialState = {
  loading: false,
  create_giist_detail: [],
  error: '',
};

const CreateGiistDetailRed = (state = initialState, action) => {
  // console.log(action.payload, "this is");
  switch (action.type) {
    case GIIST_CREATE_DETAIL:
      return { loading: false, create_giist_detail: action.payload, error: '' };
      break;
    default:
      return state;
  }
};
export default CreateGiistDetailRed;
