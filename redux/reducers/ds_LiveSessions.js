import React from 'react';
import { FETCH_LIVE_USERS, FETCH_LIVE_USERS_LOADING } from '../actions/types';

const initialState = {
  loading: false,
  liveusers: [],
  error: '',
};
const LiveUsers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIVE_USERS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_LIVE_USERS:
      return {
        ...state,
        liveusers: {
          ...action.payload,
          items: action.payload.items.map((item) => {
            return {
              ...item,
              user_name: item.user_name,
              image: item.avatar ? `users/profileImages/${item.avatar}` : '',
              title: item.title,
              duration: item.duration == null ? '0 minute' : item.duration,
              views: item.views,
            };
          }),
        },

        loading: false,
      };

    default:
      return { ...state };
  }
};
export default LiveUsers;
