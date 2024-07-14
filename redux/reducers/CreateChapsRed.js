import { CREATE_GIIST_CHAPTER } from '../actions/types';

const initialState = {
  loading: false,
  create_chapter: [],
  error: '',
};

const CreateChapsRed = (state = initialState, action) => {
  // console.log(action.payload, "this is");
  switch (action.type) {
    case CREATE_GIIST_CHAPTER:
      return { loading: false, create_chapter: action.payload, error: '' };
      break;
    default:
      return state;
  }
};
export default CreateChapsRed;
