import React from 'react';
import { GET_STATS } from '../actions/types';

const initialState = {
  loading: false,
  stats_data: [],
  error: '',
};

const RankingStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATS:
      return { loading: false, stats_data: action.payload, error: '' };
      break;
    default:
      return state;
  }
};

export default RankingStatsReducer;
