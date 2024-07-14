import { CREATE_WEB_CONFERENCE } from '../actions/types';

const initialState = {
  get_conference_data: [],
};
export const CreateConferenceRed = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_WEB_CONFERENCE:
      console.log(action.payload, 'this is action reducer');
      return { get_conference_data: action.payload };
      break;
    default:
      return state;
  }
};
