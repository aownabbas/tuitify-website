import { CREATE_GIIST_CHAPTER_MEDIA } from '../actions/types';

const initialState = {
  loading: false,
  create_chapter_media: [],
  error: '',
};

const CreateChapsMediaRed = (state = initialState, action) => {
  // console.log(action.payload, "this is");
  switch (action.type) {
    case CREATE_GIIST_CHAPTER_MEDIA:
      return { loading: false, create_chapter_media: action.payload, error: '' };
      break;
    default:
      return state;
  }
};
export default CreateChapsMediaRed;
