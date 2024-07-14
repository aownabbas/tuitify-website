// import axios from "axios";
// import * as types from "./types";
// import { URL } from "../../public/assets/path/path";

// // live meeting users
// export const LiveMeetUsers = (params, onLiveUsersSuccess, onLiveUsersErr) => {
//     return (dispatch) => {
//         axios.get("https://dev.tuitify.com/live_meeting_users_list?live_id=550&name=test")
//         .then((res)=>{
//           dispatch(usersLiveMeeting(res));
//           onLiveUsersSuccess(res);
//          console.log("success");
//         }).catch(err =>{
//           console.log(err,"error");
//           onLiveUsersErr(err);
//         })
//     };
// }

// const usersLiveMeeting = (data) => {
//   return {
//         type: types.LIVE_USERS,
//         payload: data,
//   }
// }

import axios from 'axios';
import { LIVE_USERS } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchmyUsers = (get_allusers) => {
  return {
    type: LIVE_USERS,
    payload: get_allusers,
  };
};
// export const onClickRefreshUsers = () => {
//     return {

//     }
// }

const LiveMeetUsers = (params) => {
  alert('dv');
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}live_meeting_users_list?${params}`,
      'get',
      {},
      (response) => {
        const get_allusers = response.data.users; // {.data} and {users} came from response in console
        dispatch(fetchmyUsers(get_allusers));
      },
      (error) => {
        const errormsg = error.message;
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}live_meeting_users_list?${params}`)
    //   .then((response) => {
    //     const get_allusers = response.data.users; // {.data} and {users} came from response in console
    //     dispatch(fetchmyUsers(get_allusers));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //   });
  };
};
export default LiveMeetUsers;
