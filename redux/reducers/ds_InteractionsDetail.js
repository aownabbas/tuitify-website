import React from "react";
import { FETCH_INTERACTIONS_DETAIL, FETCH_INTERACTIONS_DETAIL_LOADING } from "../actions/types";
import moment from "moment";

const initialState={
    loading:false,
    detail:[],
    error:""
}
const InteractionsDetail = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_INTERACTIONS_DETAIL_LOADING:
            return {
                ...state,
                loading: true,
            }

        case FETCH_INTERACTIONS_DETAIL:
            return {
                ...state,
                detail:{
                    ...action.payload,
                    items: action.payload.items.map((item) => {
                      return {
                        ...item,
                        Briff_titile: item.Briff_titile,
                        email: item.email ,
                        Date_of_interaction: item.Date_of_interaction,
                        interaction_user_first_name: item.interaction_user_first_name,
                        interaction_user_last_name: item.interaction_user_last_name,
                        interaction_user_email: item.interaction_user_email,
                        type: item.type,
                        text: item.text,
                        Date_of_interaction: moment(item.Date_of_interaction).format("DD MMMM, YYYY"),
                      };
                    }),
                  },

                loading: false,
            }

        default:
            return { ...state }
    }
}
export default InteractionsDetail;