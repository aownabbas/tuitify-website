import { END_CONFERENCE } from '../actions/types';

const initialState = {
  end_conference_data: [],
};

const EndConferenceRed = (state = initialState, action) => {
  switch (action.type) {
    case END_CONFERENCE:
      return { end_conference_data: action.payload };
      break;

    default:
      state;
      break;
  }
};

export default EndConferenceRed;
