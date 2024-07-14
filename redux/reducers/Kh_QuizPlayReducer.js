import React from 'react';
import { Kh_QuizPlay_Giist, Kh_Quiz_Submit, Kh_Get_result, TIME_UP_FINAL_QUIZ } from '../actions/types';

const initialState = {
  quiz: [],
  error: '',
};

const Kh_QuizPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case Kh_QuizPlay_Giist:
      return {
        ...state,
        quiz: action.payload,
      };
    default:
      return { ...state };
  }
};

export const Kh_QuizSubmitReducer = (state = initialState, action) => {
  switch (action.type) {
    case Kh_Quiz_Submit:
      return {
        ...state,
        quiz: action.payload,
      };
    default:
      return { ...state };
  }
};

export const Kh_FinalQuizTimeUp = (state = initialState, action) => {
  switch (action.type) {
    case TIME_UP_FINAL_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
    default:
      return { ...state };
  }
};

export const Kh_SubmitGetResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case Kh_Get_result:
      return {
        ...state,
        quiz: action.payload,
      };
    default:
      return { ...state };
  }
};

export default Kh_QuizPlayReducer;
