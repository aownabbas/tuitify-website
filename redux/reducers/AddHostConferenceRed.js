import { ADD_HOST } from '../actions/types';

const initialState = { loading: false, add_host: [], error: '' };

const AddHostConferenceRed = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HOST:
      return { loading: false, add_host: action.payload, error: '' };
      break;
    default:
      return state;
  }
};

export default AddHostConferenceRed;
