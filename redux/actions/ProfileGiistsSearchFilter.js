import * as types from './types';

// dispatching methods inside action
const userProfileGiistsSearchFilter = (data) => {
  return {
    // defining what type of action it is.
    type: types.PROFILE_SEARCH_APPLY_FILTER,
    payload: data,
  };
};

// GLOBAL_SEARCH_APPLY_FILTER action displayed.
const ProfileGiistsSearchFilter = (searchInputVal, dateFilter, indexNum) => {
  return (dispatch) => {
    // if response true then dispatching action.
    dispatch(userProfileGiistsSearchFilter([searchInputVal, dateFilter, indexNum]));
  };
};

export default ProfileGiistsSearchFilter;
