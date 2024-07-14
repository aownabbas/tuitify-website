import { SET_ACTIVE_STEP } from './types';

export function setActiveStep(step) {
  return { type: SET_ACTIVE_STEP, payload: step };
}
