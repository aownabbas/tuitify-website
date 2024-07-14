import axios from "axios";
import { KH_LATEST_GIISTS } from "./types";
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

export const fetchlatestGiists=(latest_giists)=>{
  return{
      type:KH_LATEST_GIISTS,
      payload:latest_giists,
  }
  }

const Kh_LatestGiistsAction=(params,token, onlatestGiistsActionSuccess, onlatestGiistsActionError)=>{
  return async (dispatch)=>{
    await GlobalApiCall(`${URL.khbaseUrl}publishedGiists?${params}`,
    'get',
    {},
    response=>{
      const latestGiists=response.data
      onlatestGiistsActionSuccess(latestGiists);
      dispatch(fetchlatestGiists(latestGiists));
  },
  error=>{
    const errormsg=error.message;
    onlatestGiistsActionError(errormsg);
},
    )
      // axios.get(`${URL.khbaseUrl}publishedGiists?${params}`,{
      //    headers: {"Authorization" : `Bearer ${token}`} }
      // )
      // .then(response=>{
      //     const latestGiists=response.data
      //     onlatestGiistsActionSuccess(latestGiists);
      //     dispatch(fetchlatestGiists(latestGiists));
      // }).catch(error=>{
      //     const errormsg=error.message;
      //     onlatestGiistsActionError(errormsg);
      // })
  }
}
export default Kh_LatestGiistsAction;
