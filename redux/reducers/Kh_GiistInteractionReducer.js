// import React from 'react';
// import { KH_GIISTS_INTERACTIONS,KH_GIISTS_INTERACTIONS_LOADING } from '../actions/types';

// const initialState = {
//   load_giist_int: false,
//   giistInteraction: [],
//   error: '',
// };
// const Kh_GiistInteractionsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case KH_GIISTS_INTERACTIONS_LOADING:
//       return {
//         ...state,
//         load_giist_int: true,
//       };

//     case KH_GIISTS_INTERACTIONS:
//       return {
//         ...state,
//         giistInteraction: action.payload,

//         load_giist_int: false,
//       };

//     default:
//       return { ...state };
//   }
// };
// export default Kh_GiistInteractionsReducer;

import { KH_GIISTS_INTERACTIONS } from "../actions/types";

const initialState={
    loading:false,
    kh_giist_comments:[],
    error:""
}

const Kh_GiistInteractionsReducer = (state=initialState,action)=>{
    switch (action.type) {
            case KH_GIISTS_INTERACTIONS:
                return{
                    loading:false,
                    kh_giist_comments:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default Kh_GiistInteractionsReducer;
