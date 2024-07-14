import { Kh_Publish_Giist } from '../actions/types';

const initialState = {
  publish_Giist: [],
  error: '',
};

const Kh_PublishGiistReducer = (state = initialState, action) => {
  switch (action.type) {
    case Kh_Publish_Giist:
      return {
        loading: false,
        publish_Giist: action.payload,
        error: '',
      };
    default:
      return state;
  }
};
export default Kh_PublishGiistReducer;
