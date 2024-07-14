import React from 'react';
import {
  CLEAR_COMMENTS,
  FETCH_DATA_LOADING,
  FETCH_NOTIFICATIONS,
  INCREMENT_NOTIFICATION_COUNT,
  MARK_NOTIFICATION_READ,
} from '../actions/types';

const initialState = {
  notifications: {
    loading: false,
    error: '',
    itemCount: 0,
    items: [],
    nextPage: 0,
    offset: 0,
    page: 0,
    prevPage: null,
    totalItems: 0,
    totalPages: 0,
  },
};

const getInitialNotificationCount = () => {
  if (typeof window !== 'undefined') {
    const { notification_count } = JSON.parse(localStorage.getItem('@LoginData')) || '';
    return Number(notification_count);
  }
};

const initialState2 = {
  notificationCount: getInitialNotificationCount(),
};

export const notificationReducer = (state = initialState2, action) => {
  switch (action.type) {
    case INCREMENT_NOTIFICATION_COUNT:
      let getlocalStorge = JSON.parse(localStorage.getItem('@LoginData'));
      getlocalStorge.notification_count = action.payload;
      console.log('getlocalStorge', getlocalStorge);
      localStorage.setItem('@LoginData', JSON.stringify(getlocalStorge));
      // Store the updated object back into local storage
      return {
        ...state,
        notificationCount: action.payload,
      };
    case MARK_NOTIFICATION_READ:
      return {
        ...state,
        notificationCount: 0,
      };
    default:
      return state;
  }
};

const Notifications = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_COMMENTS:
      return {
        notifications: {
          loading: false,
          error: '',
          itemCount: 0,
          items: [],
          nextPage: 0,
          offset: 0,
          page: 0,
          prevPage: null,
          totalItems: 0,
          totalPages: 0,
        },
      };
    case FETCH_DATA_LOADING:
      return {
        notifications: {
          loading: true,
          error: state.notifications.error,
          itemCount: state.notifications.itemCount,
          items: state.notifications.items,
          nextPage: state.notifications.nextPage,
          offset: state.notifications.offset,
          page: state.notifications.page,
          prevPage: state.notifications.prevPage,
          totalItems: state.notifications.totalItems,
          totalPages: state.notifications.totalPages,
        },
      };

    case FETCH_NOTIFICATIONS:
      const itemCount = action.payload.itemCount;
      const items = action.payload.items;
      const nextPage = action.payload.nextPage;
      const offset = action.payload.offset;
      const page = action.payload.page;
      const prevPage = action.payload.prevPage;
      const totalItems = action.payload.totalItems;
      const totalPages = action.payload.totalPages;

      const newNotifications = items;
      const existingNotifications = state?.notifications?.items;
      const uniqueNotifications = new Set([...existingNotifications, ...newNotifications]);
      const uniqueItemsIntoArray = Array.from(uniqueNotifications);

      return {
        notifications: {
          loading: false,
          error: '',
          itemCount: itemCount,
          items: uniqueItemsIntoArray,
          nextPage: nextPage,
          offset: offset,
          page: page,
          prevPage: prevPage,
          totalItems: totalItems,
          totalPages: totalPages,
        },
      };
    default:
      return state;
  }
};
export default Notifications;
