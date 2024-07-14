import { GET_HOME_GIISTS } from '../actions/types';

const initialState = {
  loading: false,
  get_homeGiistsData: [],
  error: '',
};

const KH_homeGiistsRed = (state = initialState, action) => {
  // console.log(action.payload, "this is");
  switch (action.type) {
    case GET_HOME_GIISTS:
      return { loading: false, get_homeGiistsData: action.payload, error: '' };
      break;
    default:
      return state;
  }
};
export default KH_homeGiistsRed;
