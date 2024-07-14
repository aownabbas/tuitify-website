import axios from "axios";
import { KH_FOLLOWED_USER_GIISTS } from "./types";
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

export const fetchfollowedUserGiists=(followed_user_giists)=>{
  return{
      type:KH_FOLLOWED_USER_GIISTS,
      payload:followed_user_giists,
  }
  }

const Kh_followedGiistsAction=(params,token, onfollowedUserGiistsSuccess, onfollowedUserGiistsError)=>{
  return async (dispatch)=>{

    await GlobalApiCall(`${URL.khbaseUrl}followedUserGiists?${params}`,
    'get',
    {},
    response=>{
      const followedUserGiists=response.data
      onfollowedUserGiistsSuccess(followedUserGiists);
      dispatch(fetchfollowedUserGiists(followedUserGiists));
  },
  error=>{
    const errormsg=error.message;
    onfollowedUserGiistsError(errormsg);
},
    )
      // axios.get(`${URL.khbaseUrl}followedUserGiists?${params}`,{
      //    headers: {"Authorization" : `Bearer ${token}`} }
      // )
      // .then(response=>{
      //     const followedUserGiists=response.data
      //     onfollowedUserGiistsSuccess(followedUserGiists);
      //     dispatch(fetchfollowedUserGiists(followedUserGiists));
      // }).catch(error=>{
      //     const errormsg=error.message;
      //     onfollowedUserGiistsError(errormsg);
      // })
  }
}
export default Kh_followedGiistsAction;
