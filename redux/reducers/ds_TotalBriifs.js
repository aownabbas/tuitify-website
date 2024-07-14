import React from 'react';
import { FETCH_TOTAL_INTERACTIONS } from '../actions/types';

const initialState = {
  loading: false,
  comment: [],
  error: '',
};

const ds_TotalBriifs = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOTAL_INTERACTIONS:
      return {
        loading: false,
        comment: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default ds_TotalBriifs;
