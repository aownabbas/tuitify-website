import React from "react";
import { FETCH_INTERACTIONS_TYPE,FETCH_INTERACTIONS_TYPE_LOADING } from "../actions/types";

const initialState={
    loading:false,
    interactions:[],
    error:""
}
const ReducerInteractionsType = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_INTERACTIONS_TYPE_LOADING:
            return {
                ...state,
                loading: true,
            }

        case FETCH_INTERACTIONS_TYPE:
            return {
                ...state,
                interactions:{
                    ...action.payload,
                    items: action.payload.items.map((item) => {
                      return {
                        ...item,
                        first_name: item.first_name,
                        last_name: item.last_name ,
                        email: item.email,
                        total_number_of_video: item.total_number_of_video,
                        total_number_of_text: item.total_number_of_text,
                        total_number_of_audio: item.total_number_of_audio,

                      };
                    }),
                  },
                loading: false,
            }

        default:
            return { ...state }
    }
}
export default ReducerInteractionsType;