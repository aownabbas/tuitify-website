import React, { useState, useEffect } from "react";
import GlobalSearchBriif from "../cards/GlobalSearchBriif";
import { useDispatch, useSelector } from "react-redux";
// paginator
import WebPagination from '../../../../components/pagination/WebPagination';
import usePagination from "../../../../components/pagination/Pagination";
import globalSearchApplyFilter from "../../../../redux/actions/GlobalSearchApplyFilter";
import Image from "next/image";

const BriifTab = (props) => {

  const dispatch = useDispatch();

  //loading state
  const [globalSearchBriifLoading, setGlobalSearchBriifLoading] =
    useState(true);
  const { inputValue } = useSelector(
      (state) => state.global_search_apply_filter
    );
  const { filter } = useSelector((state) => state.global_search_apply_filter);
  const { indexNum } = useSelector((state) => state.global_search_apply_filter);

  //platform id and user id states
  const [id, setId] = useState("");
  const [platformId, setPlatformId] = useState("");

  //platform data state
  const [getPlatData, setGetPlatData] = useState("");

  const { globalSearch } = useSelector((state) => state.global_search);
  console.log(globalSearch);

  useEffect(() => {
    setGlobalSearchBriifLoading(true);
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
  }, [indexNum]);

  // Pagination

  
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
    const arrayItems = [globalSearch.data.briffs]
    const count = Math.ceil(arrayItems?.length / PER_PAGE);
    const cardData = usePagination(arrayItems, PER_PAGE);
    
    const handleChange = (e, p) => {
      setPage(p);
      cardData.jump(p);
    };

    console.log(globalSearch.data.briffs);
    

  return (
    <>
      <div className="carousel-button-group semibold-small mb-2 ps-1">
        Briifs
      </div>
      <div className="row ms-1" style={{ height: "95%", overflowY: "scroll" }}>
        {globalSearch != "" && globalSearch.data.briffs != "undefined"
          ? globalSearch.data.briffs?.length == 0 ? 
          <div className="text-center mb-3">
          <Image
          src="/assets/icons/new/no_receivedbriifs_icon.svg"
          alt="next"
          className={indexNum == 0 ? "btn-disabled" : "" }
          width="172px"
          height="172px"
        /><p className="d-flex align-items-center justify-content-center regular-small">
            
        There are no futher results on this topic.</p></div>
          : globalSearch.data.briffs?.map((item, index) => {
              return (
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 px-0" key={index}>
                  <GlobalSearchBriif briffs={item} />
                </div>
              );
            })
          : ""}
          {/* {cardData.currentData().map(v => (
              <>{v}</>
            ))} */}
            
      </div>
      {globalSearch.data.briffs?.length == 0 ? "" :
       // && indexNum == 0 ? "" :
      <div className="d-flex justify-content-center mt-3 web-pagination">
        {/* <WebPagination 
      handleChange={handleChange} count={count} page={page}/> */}

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
        {/* {globalSearch.data.briffs?.length > 28 ? "" : */}
      <span style={{opacity: globalSearch.data.briffs?.length == 0 || globalSearch.data.briffs?.length < 10 ? "0.4" : "1"}} className={globalSearch.data.briffs?.length == 0 || globalSearch.data.briffs?.length < 10 ? "semibold-small btn-disabled d-flex align-items-center" : "semibold-small next-button d-flex align-items-center"} onClick={(e)=>{(globalSearch.data.briffs?.length == 0 || globalSearch.data.briffs?.length < 10) ? "" : dispatch(globalSearchApplyFilter(inputValue, filter, indexNum + 10))}}>Next 
      <span className={globalSearch.data.briffs?.length == 0 || globalSearch.data.briffs?.length < 10 ? "ms-2 d-flex btn-disabled align-items-end" : "ms-2 d-flex align-items-end"}>
      <Image
          src="/assets/icons/new/forward_arrow.svg"
          alt="next"
          className={globalSearch.data.briffs?.length == 0 || globalSearch.data.briffs?.length < 10 ? "btn-disabled" : ""}
          width="12px"
          height="12px"
        />
        </span>
      </span>
       </div>}

      <style>{`#tbody::-webkit-scrollbar{	width: 0px;}`}</style>
    </>
  );
};

export default BriifTab;
