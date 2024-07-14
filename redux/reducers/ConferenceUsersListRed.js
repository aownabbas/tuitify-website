import { FETCHING_CONFERENCE_USERS, UPDATE_JOINED_USERS_LIST } from '../actions/types';

const initialState = {
  message: '',
  status: false,
  fetching_conference_users: [],
};

const ConferenceUsersListRed = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CONFERENCE_USERS:
      return {
        message: 'Success',
        status: true,
        fetching_conference_users: action.payload,
      };
    case UPDATE_JOINED_USERS_LIST:
      const allUsers = state.fetching_conference_users;
      const newUser = action.payload;

      let updatedUsers = [];

      if (Array.isArray(allUsers)) {
        updatedUsers = [...allUsers];
      } else if (allUsers) {
        // If allUsers.users exists but is not an array, create a new array with it as the only element
        updatedUsers = [allUsers];
      }
      updatedUsers.push(newUser);

      return {
        message: 'Success',
        status: true,
        fetching_conference_users: updatedUsers,
      };
    default:
      return state;
  }
};

export default ConferenceUsersListRed;
