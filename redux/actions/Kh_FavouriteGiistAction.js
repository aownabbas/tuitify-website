import axios from "axios";
import { KH_FAVOURITE_GIISTS } from "./types";
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

export const favouriteGiists=(favourite_giist)=>{
  return{
      type:KH_FAVOURITE_GIISTS,
      payload:favourite_giist,
  }
  }

const Kh_FavouriteGiistAction=(params,token, favouriteGiistSuccess, favouriteGiistError)=>{
  return async (dispatch)=>{
    await GlobalApiCall(`${URL.khbaseUrl}changeFavouriteGiist?${params}`,
    'get',
    {},
    (response)=>{
      const favouriteGiist=response.data
      favouriteGiistSuccess(favouriteGiist);
      dispatch(favouriteGiists(favouriteGiist));
  },
  (error)=>{
    const errormsg=error.message;
    favouriteGiistError(errormsg);
    },
    )
      // axios.get(`${URL.khbaseUrl}changeFavouriteGiist?${params}`,{
      //    headers: {"Authorization" : `Bearer ${token}`} }
      // )
      // .then(response=>{
      //     const favouriteGiist=response.data
      //     favouriteGiistSuccess(favouriteGiist);
      //     dispatch(favouriteGiists(favouriteGiist));
      // }).catch(error=>{
      //     const errormsg=error.message;
      //     favouriteGiistError(errormsg);
      // })
  }
}
export default Kh_FavouriteGiistAction;
