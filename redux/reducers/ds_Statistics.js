// import React from "react";
// import { FETCH_STATISTICS_GRAPH } from "../actions/types";

// const initialState={
//     loading:false,
//     graph:[],
//     error:""
// }

// const ReducerStatistics=(state=initialState,action)=>{
//     switch (action.type) {
//             case FETCH_STATISTICS_GRAPH:
//                 return{
//                     loading:false,
//                     graph:action.payload,
//                     error:""
//                 }
//             break;
//         default:
//             return state
//     }
// }
// export default ReducerStatistics;

import React from 'react';
import { FETCH_STATISTICS_GRAPH, LOADING_CH_GRAPH } from '../actions/types';

const initialState = {
  loading: false,
  graph: [],
  error: '',
};
const ReducerStatistics = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CH_GRAPH:
      return {
        ...state,
        loading: true,
      };

    case FETCH_STATISTICS_GRAPH:
      return {
        ...state,
        graph: action.payload,

        loading: false,
      };

    default:
      return { ...state };
  }
};
export default ReducerStatistics;
