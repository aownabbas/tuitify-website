import { PEOPLE_JOIN_CONFERENE } from '../actions/types';

const initialState = {
  join_confernce_data: [],
};

const JoinMeetingRed = (state = initialState, action) => {
  switch (action.type) {
    case PEOPLE_JOIN_CONFERENE:
      console.log(action.payload, 'this is action reducer');
      return { join_confernce_data: action.payload };
      break;
    default:
      return state;
  }
};

export default JoinMeetingRed;
