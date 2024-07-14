import { SENDING_INVITATION } from '../actions/types';

// initial state of reducer.
const initialState = {
  loading: false,
  invitation_response: [],
  error: '',
};

// reducer function.
const ConferenceInvitationRed = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case SENDING_INVITATION:
      return {
        ...state,
        invitation_response: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default ConferenceInvitationRed;
