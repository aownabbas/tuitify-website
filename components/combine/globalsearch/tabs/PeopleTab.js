import React, { useState, useEffect } from "react";
import GlobalSearchPeople from "../cards/GlobalSearchPeople";
import { useDispatch, useSelector } from "react-redux";
import WebPagination from '../../../../components/pagination/WebPagination'
import Image from "next/image";
import globalSearchApplyFilter from "../../../../redux/actions/GlobalSearchApplyFilter";

const PeopleTab = (props) => {
  //loading state
  const [globalSearchPeopleLoading, setGlobalSearchPeopleLoading] =
    useState(true);

  //platform id and user id states
  const [id, setId] = useState("");
  const [platformId, setPlatformId] = useState("");

  //platform data state
  const [getPlatData, setGetPlatData] = useState("");

  const dispatch = useDispatch();
  const { inputValue } = useSelector(
    (state) => state.global_search_apply_filter
  );
  const { filter } = useSelector((state) => state.global_search_apply_filter);
  const { indexNum } = useSelector((state) => state.global_search_apply_filter);


  const { globalSearch } = useSelector((state) => state.global_search);
  console.log(globalSearch);

  useEffect(() => {
    setGlobalSearchPeopleLoading(true);
    const LoginData = JSON.parse(localStorage.getItem("@LoginData"));
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      const platform_id = LoginData.platform_id;
      setPlatformId(platform_id);
      console.log(id, "dijsncoislkjc");

      const GetPlatData = JSON.parse(localStorage.getItem("@GetPlatData"));

      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
      }
    }
    return () => {};
  }, []);

  return (
    <>
      <div className="carousel-button-group semibold-small mb-2 ps-1">
        People
      </div>
      <div
        className="row ms-1"
        style={{ height: "95%", overflowY: "auto" }}
      >
        {globalSearch != "" && globalSearch.data.users != "undefined"
          ?  globalSearch.data.users?.length == 0 ? 
          <div className="text-center mb-3">
          <Image
          src="/assets/icons/new/no_receivedbriifs_icon.svg"
          alt="next"
          className={indexNum == 0 ? "btn-disabled" : "" }
          width="172px"
          height="172px"
        /><p className="d-flex align-items-center justify-content-center regular-small">
            
        There are no futher results on this topic.</p></div>
          : globalSearch.data.users?.map((item, index) => {
              return (
                <div
                  className="col-sm-4 col-md-3 col-lg-2 justify-content-start p-0"
                  key={index}
                  style={{ height: "225px" }}
                >
                  <GlobalSearchPeople users={item} />
                </div>
              );
            })
          : ""}
      </div>

      <div className="d-flex justify-content-center mt-3 web-pagination">
      {globalSearch.data.users?.length != 0 ?
      <>
        {/* <WebPagination /> */}
        <span style={{opacity: indexNum == 0 ? "0.4" : "1"}} className={indexNum == 0 ? "btn-disabled semibold-small d-flex prev-button align-items-center" : "semibold-small d-flex align-items-center"} onClick={(e)=>{dispatch(globalSearchApplyFilter(inputValue, filter, indexNum == 0 ? indexNum : indexNum - 10))}}>
      <span className={indexNum == 0 ? "me-2 btn-disabled d-flex align-items-end" : "me-2 d-flex align-items-end"}>
      <Image
          src="/assets/icons/new/back_arrow.svg"
          alt="next"
          className={indexNum == 0 ? "btn-disabled" : "" }
          width="12px"
          height="12px"
        />
        </span>Previous</span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span style={{opacity: globalSearch.data.users?.length == 0 || globalSearch.data.users?.length < 10 ? "0.4" : "1"}} className={globalSearch.data.users?.length == 0 || globalSearch.data.users?.length < 10 ? "semibold-small btn-disabled d-flex align-items-center" : "semibold-small next-button d-flex align-items-center"} onClick={(e)=>{(globalSearch.data.users?.length == 0 || globalSearch.data.users?.length < 10) ? "" : dispatch(globalSearchApplyFilter(inputValue, filter, indexNum + 10))}}>Next 
      <span className={globalSearch.data.users?.length == 0 || globalSearch.data.users?.length < 10 ? "ms-2 d-flex btn-disabled align-items-end" : "ms-2 d-flex align-items-end"}>
      <Image
          src="/assets/icons/new/forward_arrow.svg"
          alt="next"
          className={globalSearch.data.users?.length == 0 || globalSearch.data.users?.length < 10 ? "btn-disabled" : ""}
          width="12px"
          height="12px"
        />
        </span>
      </span>
      </> : ""}
        </div>
      <style>{`#tbody::-webkit-scrollbar{	width: 0px;}`}</style>
    </>
  );
};

export default PeopleTab;
