import React from 'react';
import { DRAFT_SEARCH_BRIIFS, FETCH_SEARCH_RECEIVE } from '../actions/types';

const initialState = {
  loading: false,
  SearchReceive: [],
  error: '',
};

const initialState2 = {
  loading: false,
  SearchDraft: [],
  error: '',
};

export const reducerSearchDraft = (state = initialState2, action) => {
  switch (action.type) {
    case DRAFT_SEARCH_BRIIFS:
      return {
        loading: false,
        SearchDraft: action.payload,
        error: '',
      };
    default:
      return state;
  }
};
const reducerSearchReceive = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RECEIVE:
      return {
        loading: false,
        SearchReceive: action.payload,
        error: '',
      };
    default:
      return state;
  }
};
export default reducerSearchReceive;
