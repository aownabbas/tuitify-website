import React from 'react';
import { KH_STATISTICS, KH_STATISTICS_LOADING } from '../actions/types';

const initialState = {
  kh_loading: false,
  kh_stats: [],
  error: '',
};
const Kh_StatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case KH_STATISTICS_LOADING:
      return {
        ...state,
        kh_loading: true,
      };

    case KH_STATISTICS:
      return {
        ...state,
        kh_stats: action.payload,

        kh_loading: false,
      };

    default:
      return { ...state };
  }
};
export default Kh_StatisticsReducer;
