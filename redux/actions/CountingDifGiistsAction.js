import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { COUNTING_NUMBER } from './types';

const fetchCountingGiistsNumbers = (counting_Giists) => {
  return {
    type: COUNTING_NUMBER,
    payload: counting_Giists,
  };
};

// https://khdev.tuitify.com/userGiistsCount
const CountingDifGiistsAction = () => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}userGiistsCount`,
      'get',
      {},
      (res) => {
        const counting_Giists = res.data;
        // console.log(counting_Giists, 'counting_Giists in action');
        // onCountingGiistsSuccess(counting_Giists);
        dispatch(fetchCountingGiistsNumbers(counting_Giists));
      },
      (error) => {
        const msg = error.msg;
        // onCountingGiistsError(msg);
      },
    );

    //   .get(`${URL.khbaseUrl}userGiistsCount`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     const counting_Giists = res.data;
    //     // console.log(counting_Giists, 'counting_Giists in action');
    //     // onCountingGiistsSuccess(counting_Giists);
    //     dispatch(fetchCountingGiistsNumbers(counting_Giists));
    //   })
    //   .catch((error) => {
    //     const msg = error.msg;
    //     // onCountingGiistsError(msg);
    //   });
  };
};

export default CountingDifGiistsAction;
