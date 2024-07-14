import axios from 'axios';
import { Final_Attempted } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const KhFinalQuizAttempted = (finalAttempted) => {
  return {
    type: Final_Attempted,
    payload: finalAttempted,
  };
};

const kh_FinalQuizAttempted = (params, onFinalAttemptedSuccess, onFinalAttemptedError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}quiz_result_add`,
      'post',
      params,
      (response) => {
        const finalAttempted = response.data;
        onFinalAttemptedSuccess(finalAttempted);
        dispatch(KhFinalQuizAttempted(finalAttempted));
      },
      (error) => {
        const errormsg = error.message;
        onFinalAttemptedError(errormsg);
      },
    );
  };
};
export default kh_FinalQuizAttempted;
