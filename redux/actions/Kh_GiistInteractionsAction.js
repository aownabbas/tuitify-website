// import axios from 'axios';
// import { KH_GIISTS_INTERACTIONS,KH_GIISTS_INTERACTIONS_LOADING } from './types';
// import { URL } from '../../public/assets/path/path';
// const Kh_GiistInteractionsAction = (params,token) => {
//   return async (dispatch) => {
//     try {
//       await dispatch({
//         type: KH_GIISTS_INTERACTIONS_LOADING,
//       });
//       await axios
//         .get(`${URL.khbaseUrl}kHubDashboardComments?${params}`, {
//                   method: 'GET',
//                   headers: { Authorization: `Bearer ${token}` },})
//         .then((response) => {
//           if (response.data.status == true) {
//             dispatch({
//               type: KH_GIISTS_INTERACTIONS,
//               payload: response.data.data,
//             });
//           } else {
//             console.log("Error")
//           }
//         })
//         .catch((error) => {
//           const errormsg = error.message;
//           console.log(error,"error")
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
// export default Kh_GiistInteractionsAction;

import axios from 'axios';
import { KH_GIISTS_INTERACTIONS } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchKhComments = (kh_giist_comments) => {
  return {
    type: KH_GIISTS_INTERACTIONS,
    payload: kh_giist_comments,
  };
};

const Kh_GiistInteractionsAction = (params, token, onGiistCommentSuccess, onGiistCommentError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}kHubDashboardComments?${params}`,
      'get',
      {},
      (response) => {
        const kh_giist_comments = response;
        onGiistCommentSuccess(kh_giist_comments.data);
        dispatch(fetchKhComments(kh_giist_comments));
      },
      (error) => {
        const errormsg = error.message;
        onGiistCommentError(errormsg);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}kHubDashboardComments?${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const kh_giist_comments = response;
    //     onGiistCommentSuccess(kh_giist_comments);
    //     dispatch(fetchKhComments(kh_giist_comments));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onGiistCommentError(errormsg);
    //   });
  };
};
export default Kh_GiistInteractionsAction;
