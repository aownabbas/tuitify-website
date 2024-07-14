import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { Kh_QuizPlay_Giist, Kh_Quiz_Submit, Kh_Get_result, TIME_UP_FINAL_QUIZ } from './types';

const QuizPlayGiist = (stats_data) => {
  return {
    type: Kh_QuizPlay_Giist,
    payload: stats_data,
  };
};

const QuizSubmit = (stats_data) => {
  return {
    type: Kh_Quiz_Submit,
    payload: stats_data,
  };
};

const QuizSubmitGetResult = (stats_data) => {
  return {
    type: Kh_Get_result,
    payload: stats_data,
  };
};

const TimeUpFinalQuiz = (data) => {
  return {
    type: TIME_UP_FINAL_QUIZ,
    payload: data,
  };
};

const Kh_QuizPlayGiist = (params, onPlayGiistSuccess, onPlayGiistError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}quiz_question_options12?${params}`,
      'get',
      {},
      (res) => {
        const stats_data = res.data;
        dispatch(QuizPlayGiist(stats_data));
        onPlayGiistSuccess(stats_data);
      },
      (error) => {
        // const msg = error.message;
        onPlayGiistError(error);
      },
    );
  };
};

export const Kh_SubmitAnwer = (params, onSubmitQuizSuccess, onSubmitQuizError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}quiz_submit_answers`,
      'post',
      params,
      (res) => {
        console.log('res.data', res.data);
        dispatch(QuizSubmit(res.data));
        onSubmitQuizSuccess(res.data);
      },
      (error) => {
        // const msg = error.message;
        onSubmitQuizError(error);
      },
    );
  };
};

export const Kh_GetResult = (params, onGetResultSuccess, onGetResultError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}quiz_result_review?${params}`,
      'get',
      {},
      (res) => {
        console.log('res.data', res.data);
        dispatch(QuizSubmitGetResult(res.data));
        onGetResultSuccess(res.data);
      },
      (error) => {
        // const msg = error.message;
        onGetResultError(error);
      },
    );
  };
};

export const Time_UpCallFinal = (params, onTimeUPSuccess, onTimeUpError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}quiz_result_time_over`,
      'post',
      params,
      (res) => {
        console.log('res.data', res.data);
        dispatch(TimeUpFinalQuiz(res.data));
        onTimeUPSuccess(res.data);
      },
      (error) => {
        // const msg = error.message;
        onTimeUpError(error);
      },
    );
  };
};

export default Kh_QuizPlayGiist;
