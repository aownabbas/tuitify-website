import { SET_GLOBAL_PINNED } from '../types';

export const SetPinned = (newValue) => ({
  type: SET_GLOBAL_PINNED,
  payload: newValue,
});
