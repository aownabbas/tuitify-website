import React from "react";
import { FETCH_GENERAL_STATISTICS,FETCH_GENERAL_STATISTICS_LOADING } from "../actions/types";

const initialState={
    loading:false,
    statistics:[],
    error:""
}


const ReducerGeneralStatistics = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_GENERAL_STATISTICS_LOADING:
            return {
                ...state,
                loading: true,
            }

        case FETCH_GENERAL_STATISTICS:
            return {
                ...state,
                statistics:{
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
export default ReducerGeneralStatistics;