import React from "react";
import {
  KH_TOTAL_GIISTS,
  KH_TOTAL_GIISTS_LOADING,
  KH_ENGAGEMENT_RATE,
} from "../actions/types";
import moment from "moment";

const initialState = {
  loading1: false,
  kh_totalgiist: [],
  error: "",
};

const initialState2 = {
  loading1: false,
  kh_EngagementGiist: [],
  error: "",
};

const Kh_TotalGiistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case KH_TOTAL_GIISTS_LOADING:
      return {
        ...state,
        loading1: true,
      };

    case KH_TOTAL_GIISTS:
      return {
        ...state,
        kh_totalgiist: {
          ...action.payload,
          items: action.payload.items.map((item) => {
            return {
              ...item,
              first_name: item.first_name,
              last_name: item.last_name,
              email: item.email,
              title: item.title,
              status: item.status,
              created: moment(item.created).format("DD MMMM, YYYY"),
            };
          }),
        },
        loading1: false,
      };

    default:
      return { ...state };
  }
};

export const kh_EngagementGiistReducer = (state = initialState2, action) => {
  switch (action.type) {
    case KH_ENGAGEMENT_RATE:
      return {
        ...state,
        kh_EngagementGiist: action.payload,
      };
    default:
      return { ...state };
  }
};
export default Kh_TotalGiistsReducer;
