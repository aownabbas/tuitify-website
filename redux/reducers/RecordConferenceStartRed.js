import { START_CONFERENCE_RECORDING, STOP_CONFERENCE_RECORDING } from '../actions/types';

const initialState = {
  recording_status: null,
};

const RecordConferenceStartReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_CONFERENCE_RECORDING:
      return { recording_status: action.payload };
      break;

    case STOP_CONFERENCE_RECORDING:
      return { recording_status: false };
      break;

    default:
      return state;
  }
};

export default RecordConferenceStartReducer;
