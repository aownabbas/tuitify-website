import React, { useState, useEffect } from "react";
import GlobalSearchGiist from "../cards/GlobalSearchGiist";
import { useDispatch, useSelector } from "react-redux";
import globalSearchApplyFilter from "../../../../redux/actions/GlobalSearchApplyFilter";
import WebPagination from '../../../../components/pagination/WebPagination'
import Image from "next/image";

const GiistTab = (props) => {

  const dispatch = useDispatch();
  const { inputValue } = useSelector(
    (state) => state.global_search_apply_filter
  );
  const { filter } = useSelector((state) => state.global_search_apply_filter);
  const { indexNum } = useSelector((state) => state.global_search_apply_filter);

  //loading state
  const [globalSearchGiistLoading, setGlobalSearchGiistLoading] =
    useState(true);

  const [showMore, setShowMore] = useState(true);
  const [showHover, setShowHover] = useState(false);
  //platform id and user id states
  const [id, setId] = useState("");
  const [platformId, setPlatformId] = useState("");

  //platform data state
  const [getPlatData, setGetPlatData] = useState("");

  const { globalSearch } = useSelector((state) => state.global_search);
  console.log(globalSearch);

  useEffect(() => {
    setGlobalSearchGiistLoading(true);
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
      globalSearch != ""
        ? globalSearch.data.tuties != "undefined"
          ? globalSearch.data.tuties?.length < 10
            ? setShowMore(false)
            : setShowMore(true)
          : ""
        : "";
    }
    return () => {};
  }, []);

  const handleShowMore = () => {
    globalSearch != ""
      ? globalSearch.data.tuties != "undefined"
        ? globalSearch.data.tuties?.length < 10
          ? setShowMore(false)
          : (setShowMore(true),
            dispatch(
              globalSearchApplyFilter(inputValue, filter, indexNum + 10)
            ))
        : ""
      : "";
  };

  const handleShowLess = () => {
    globalSearch != ""
      ? globalSearch.data.tuties != "undefined"
        ? globalSearch.data.tuties?.length > 10
          ? setShowMore(false)
          : (setShowMore(true),
            dispatch(
              globalSearchApplyFilter(inputValue, filter, indexNum - 10)
            ))
        : ""
      : "";
  };

  return (
    <>
      <div className="carousel-button-group semibold-small mb-2 ps-1">
        Giists
      </div>
      <div
        className="row ms-1"
        style={{ height: "95%", overflowY: "scroll" }}
      >
        <div className="px-0">
      {/* <div className="flexrow">
  <div>...</div>
  <div>...</div>
  <div>...</div>
  <div>...<br/>..</div>
  <div>...</div>

</div> */}
        {globalSearch != "" && globalSearch.data.tuties != "undefined"
          ? globalSearch.data.tuties?.length == 0  ? 
          <div className="text-center mb-3">
          <Image
          src="/assets/icons/new/no_receivedbriifs_icon.svg"
          alt="next"
          className={indexNum == 0 ? "btn-disabled" : "" }
          width="172px"
          height="172px"
        /><p className="d-flex align-items-center justify-content-center regular-small">
            
        There are no futher results on this topic.</p></div>
          : globalSearch.data.tuties?.map((item, index) => {
              return (
                <div
                  className="col d-inline-flex text-start justify-content-start p-0"
                  key={index}
                  style={{ width: "220px", height: "300px" }}
                >
                  <GlobalSearchGiist tuties={item} />
                </div>
              );
            })
          : ""}
          </div>
      </div>
      <div className="d-flex justify-content-center mt-3 web-pagination">
        {/* <WebPagination /> */}
        {globalSearch.data.tuties?.length != 0 ?
        <>
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
      <span style={{opacity: globalSearch.data.tuties?.length == 0 || globalSearch.data.tuties?.length < 10 ? "0.4" : "1"}} className={globalSearch.data.tuties?.length == 0 || globalSearch.data.tuties?.length < 10 ? "semibold-small btn-disabled d-flex align-items-center" : "semibold-small next-button d-flex align-items-center"} onClick={(e)=>{(globalSearch.data.tuties?.length == 0 || globalSearch.data.tuties?.length < 10) ? "" : dispatch(globalSearchApplyFilter(inputValue, filter, indexNum + 10))}}>Next 
      <span className={globalSearch.data.tuties?.length == 0 || globalSearch.data.tuties?.length < 10 ? "ms-2 d-flex btn-disabled align-items-end" : "ms-2 d-flex align-items-end"}>
      <Image
          src="/assets/icons/new/forward_arrow.svg"
          alt="next"
          className={globalSearch.data.tuties?.length == 0 || globalSearch.data.tuties?.length < 10 ? "btn-disabled" : ""}
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

export default GiistTab;
