import React from 'react';
import { Kh_UnPublish_Giist } from '../actions/types';

const initialState = {
  loading1: false,
  message: [],
  error: '',
};
const Kh_UnpublishGiistReducer = (state = initialState, action) => {
  switch (action.type) {
    case Kh_UnPublish_Giist:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return { ...state };
  }
};
export default Kh_UnpublishGiistReducer;
