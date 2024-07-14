import axios from 'axios';
import * as types from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';



const giistRatings = (giist_rating) => {
    return {
      // defining what type of action it is.
      type: types.GIIST_RATING,
      payload: giist_rating,
    };
  };

const RatingsAction = ( params, onRatingSuccess, onRatingError) => {
  return async (dispatch) => {
    console.log('donee');
    // hitting API. This api is used for un following the user.

    await GlobalApiCall(
      `${URL.khbaseUrl}rate_tuity`,
      'post',
      params,
      (res) => {
        // if response true then dispatching action.
        dispatch(giistRatings(res));
    console.log(res,'resp');

        // returning response to the success function.
        onRatingSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onRatingError(err);
      },
    );
  };
};


export default RatingsAction;
