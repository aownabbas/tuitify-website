// import axios from 'axios';
// import { FETCH_STATISTICS_GRAPH } from './types';
// import { URL } from '../../public/assets/path/path';

// export const fetchstatisticsgraph = (graph) => {
//   return {
//     type: FETCH_STATISTICS_GRAPH,
//     payload: graph,
//   };
// };

// const ActionStatistics = (params,token) => {
//   return (dispatch) => {
//     axios
//       .get(`${URL.khbaseUrl}chubdashboarddata?${params}`)
//       .then((response) => {
//         const graph = response.data.data;
//         dispatch(fetchstatisticsgraph(graph));
//       })
//       .catch((error) => {
//         const errormsg = error.message;
//       });
//   };
// };
// export default ActionStatistics;

import axios from 'axios';
import { FETCH_STATISTICS_GRAPH, LOADING_CH_GRAPH } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
const ActionStatistics = (params, token) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: LOADING_CH_GRAPH,
      });

      await GlobalApiCall(
        `${URL.khbaseUrl}cHubDashboardData?${params}`,
        'get',
        {},
        (response) => {
          if (response.data.status == true) {
            dispatch({
              type: FETCH_STATISTICS_GRAPH,
              payload: response.data.data,
            });
          } else {
            console.log('error in fetching ch stats');
          }
        },
        (error) => {
          const errormsg = error.message;
        },
      );
      // await axios
      //   .get(`${URL.khbaseUrl}chubdashboarddata?${params}`, {
      //             method: 'GET',
      //             headers: { Authorization: `Bearer ${token}` },})
      //   .then((response) => {
      //     if (response.data.status == true) {
      //       dispatch({
      //         type: FETCH_STATISTICS_GRAPH,
      //         payload: response.data.data,
      //       });
      //     } else {
      //       console.log('error in fetching ch stats');
      //     }
      //   })
      //   .catch((error) => {
      //     const errormsg = error.message;
      //   });
    } catch (error) {
      console.log(error);
    }
  };
};
export default ActionStatistics;
