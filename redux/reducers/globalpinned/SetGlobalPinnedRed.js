import { SET_GLOBAL_PINNED } from '../../actions/types';

const initialState = null;

const SetPinnedRed = (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL_PINNED:
      return action.payload;

    default:
      return state;
  }
};

export default SetPinnedRed;
