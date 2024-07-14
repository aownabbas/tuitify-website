import React, { useState, useEffect } from "react";
import GlobalSearchGiist from "../cards/GlobalSearchGiist";
import GlobalSearchBriif from "../cards/GlobalSearchBriif";
import GlobalSearchPeople from "../cards/GlobalSearchPeople";
import { useDispatch, useSelector } from "react-redux";
import globalSearchTabs from "../../../../redux/actions/GlobalSearchTabs";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import GenericTooltip from "../../../ch/GenericTooltip";

const AllTab = (props) => {
  const dispatch = useDispatch();

  //loading state
  const [globalSearchLoading, setGlobalSearchLoading] = useState(true);

  //tab value.
  const [value, setValue] = React.useState("all");

  // tab change function
  const handleChange = (e, newValue) => {
    setValue(newValue);
    dispatch(globalSearchTabs(newValue));
  };


  //platform id and user id states
  const [id, setId] = useState("");
  const [platformId, setPlatformId] = useState("");

  const [next, setNext] = useState(true);
  const [prev, setPrev] = useState(true);

  //platform data state
  const [getPlatData, setGetPlatData] = useState("");
  const [isMobile, setIsMobile] = useState("");


  const { globalSearch } = useSelector((state) => state.global_search);

  console.log(props.isMobile);
  
  const handleResize = () => {
    if (window.innerWidth > 1920) {
      setIsMobile("Desktop")
  }
    if (window.innerWidth <= 1920 && window.innerWidth > 1200) {
      setIsMobile("SMDesktop")
  }
    if (window.innerWidth <= 1200 && window.innerWidth > 1024) {
      setIsMobile("LGTablet")
  }
    if (window.innerWidth <= 1024 && window.innerWidth > 768) {
      setIsMobile("Tablet")
    }
    if (window.innerWidth <= 768 && window.innerWidth > 480) {
      setIsMobile("SMTablet")
  }
    if (window.innerWidth <= 480 && window.innerWidth > 320) {
      setIsMobile("LGMobile")
    }
    if (window.innerWidth <= 320) {
      setIsMobile("Mobile")
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("load", handleResize);
    window.addEventListener("visibilitychange", handleResize);
    window.addEventListener("resize", handleResize);

    setGlobalSearchLoading(true);
    const LoginData = JSON.parse(localStorage.getItem("@LoginData"));
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      const platform_id = LoginData.platform_id;
      setPlatformId(platform_id);

      const GetPlatData = JSON.parse(localStorage.getItem("@GetPlatData"));

      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
      }
    }

    return () => {};
  }, [props.value]);

  return (
    <>
      <div
        className="row mx-auto d-flex justify-content-start ps-2"
        style={{ width: "100%", height: "100%"}}
      >
        {(globalSearch != "" &&
            // globalSearch.data.tuties != "undefined" && globalSearch.data.briffs != "undefined" && globalSearch.data.users != "undefined" &&
            globalSearch.data.tuties?.length == 0 && globalSearch.data.briffs?.length == 0 && globalSearch.data.users?.length == 0) ?
        <>
        <div className="text-center mb-3">
          <Image
          src="/assets/icons/new/no_receivedbriifs_icon.svg"
          alt="next"
          // className={indexNum == 0 ? "btn-disabled" : "" }
          width="172px"
          height="172px"
        /><p className="d-flex align-items-center justify-content-center regular-small">
            
        There are no futher results on this topic.</p></div>
        </>
        :
        <>
        <CarouselProvider
        className="px-0"
          naturalSlideWidth={100}
          naturalSlideHeight={160}
          totalSlides={
            globalSearch != "" &&
            globalSearch.data.tuties != "undefined" &&
            globalSearch.data.tuties?.length
          }
          visibleSlides={
          isMobile == "Desktop" ? 7 : 
          isMobile == "SMDesktop" ? 5 : 
          isMobile == "LGTablet" ? 5 : 
          isMobile == "Tablet" ? 3 :
          isMobile == "SMTablet" ? 2 :  
          isMobile == "LGMobile" ? 1 : 
          isMobile == "Mobile" ? 1 : ""
        }
        >
          {globalSearch != "" &&
          globalSearch.data.tuties != "undefined" &&
          globalSearch.data.tuties?.length != 0 ? (
            <>
            <div className="row">
              <div
                className="col-6 carousel-button-group position-absolute semibold-small"
                style={{ width: "100%" }}
              >
                Giists
              </div>
              {globalSearch != "" &&
              globalSearch.data.tuties != "undefined" &&
              globalSearch.data.tuties?.length > 5 ? (
                <div
                  className="col-6 carousel-button-group position-absolute text-end"
                  style={{ width: "100%" }}
                >
                  {/* <ButtonBack className="bg-white border-0">
                    <Image
                      src="/assets/icons/new/back_arrow.svg"
                      width="12px"
                      height="13px"
                      alt="back arrow"
                    />
                  </ButtonBack> */}
                  {/* <ButtonNext className="ms-2 bg-white border-0"> */}
                  <span className="ms-2 bg-white border-0" onClick={(e)=>{props.changeTab(e,"tuties")}}>
                    <GenericTooltip 
                      placement="top"
                      title="View All"
                      component={
                        <Image
                          src="/assets/icons/new/forward_arrow.svg"
                          width="12px"
                          height="13px"
                          alt="forward_arrow"
                        />} />
                    </span>
                  {/* </ButtonNext> */}
                </div>
                
              ) : (
                ""
              )}
              </div>
            </>
          ) : (
            ""
          )}
          <Slider>
            {globalSearch != "" && globalSearch.data.tuties != "undefined"
              ? globalSearch.data.tuties?.map((item, index) => {
                  return (
                    <Slide index={index} key={index}>
                      <GlobalSearchGiist tuties={item} tab="all" />
                    </Slide>
                  );
                })
              : ""}
          </Slider>
        </CarouselProvider>

        {/* <CarouselProvider
          className="px-0"
          naturalSlideWidth={100}
          naturalSlideHeight={65}
          totalSlides={
            globalSearch != "" &&
            globalSearch.data.briffs != "undefined" &&
            globalSearch.data.briffs?.length
          }
          visibleSlides={
          isMobile == "Desktop" ? 6 : 
          isMobile == "SMDesktop" ? 4 : 
          isMobile == "LGTablet" ? 3 : 
          isMobile == "Tablet" ? 2 :
          isMobile == "SMTablet" ? 1 :  
          isMobile == "LGMobile" ? 1 : 
          isMobile == "Mobile" ? 1 : ""}
        > */}
          {globalSearch != "" &&
          globalSearch.data.briffs != "undefined" &&
          globalSearch.data.briffs?.length != 0 ? (
            <>
            <div className="row px-0">
              <div
                className="col-6 semibold-small"
                // style={{ width: "100%" }}
              >
                Briifs
              </div>
              {/* {globalSearch != "" &&
              globalSearch.data.briffs != "undefined" &&
              globalSearch.data.briffs?.length > 4 ? 
              ( */}
                <div
                  className="col-6  text-end"
                  // style={{ width: "100%" }}
                >
                  {/* <ButtonBack className="bg-white border-0">
                    <Image
                      src="/assets/icons/new/back_arrow.svg"
                      width="12px"
                      height="13px"
                      alt="back_arrow"
                    />
                  </ButtonBack> */}
                  {/* <ButtonNext className="ms-2 bg-white border-0"> */}
                  <span className="ms-2 bg-white border-0" onClick={(e)=>{props.changeTab(e, "briffs")}}>
                  <GenericTooltip 
                      placement="top"
                      title="View All"
                      component={
                        <Image
                          src="/assets/icons/new/forward_arrow.svg"
                          width="12px"
                          height="13px"
                          alt="forward_arrow"
                        />} />
                    </span>
                    </div>
                
              {/* // ) : (
              //   ""
              // )} */}
              </div>
            </>
          ) : (
            ""
          )}
          {/* <Slider> */}
            {globalSearch != "" && globalSearch.data.briffs != "undefined"
              ? globalSearch.data.briffs?.slice(0, isMobile == "Desktop" ? 6 : 
              isMobile == "SMDesktop" ? 4 : 
              isMobile == "LGTablet" ? 3 : 
              isMobile == "Tablet" ? 2 :
              isMobile == "SMTablet" ? 1 :  
              isMobile == "LGMobile" ? 1 : 
              isMobile == "Mobile" ? 1 : 1).map((item, index) => {
                  return (
                    // <Slide index={index} key={index}>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3 px-0" key={index}>
                      <GlobalSearchBriif briffs={item}  />
                      </div>
                    // </Slide>
                  );
                })
              : ""}
          {/* </Slider>
        </CarouselProvider> */}

        <CarouselProvider
          className="px-0"
          naturalSlideWidth={100}
          naturalSlideHeight={110}
          totalSlides={
            globalSearch != "" &&
            globalSearch.data.users != "undefined" &&
            globalSearch.data.users?.length
          }
          visibleSlides={
            
          isMobile == "Desktop" ? 8 : 
          isMobile == "SMDesktop" ? 7 : 
          isMobile == "LGTablet" ? 5 : 
          isMobile == "Tablet" ? 4 :
          isMobile == "SMTablet" ? 2 :  
          isMobile == "LGMobile" ? 1 : 
          isMobile == "Mobile" ? 1 : ""}
        >
          {globalSearch != "" &&
          globalSearch.data.users != "undefined" &&
          globalSearch.data.users?.length != 0 ? (
            <>
            <div className="row">
              <div
                className="col-6 carousel-button-group position-absolute semibold-small mx-auto"
                style={{ width: "100%" }}
              >
                People
              </div>
              {globalSearch != "" &&
              globalSearch.data.users != "undefined" &&
              globalSearch.data.users?.length > 8 ? (
                <div
                  className="col-6 carousel-button-group position-absolute text-end"
                  style={{ width: "100%" }}
                >
                  <span className="ms-2 bg-white border-0" onClick={(e)=>{props.changeTab(e, "users")}}>
                  <GenericTooltip 
                      placement="top"
                      title="View All"
                      component={
                        <Image
                          src="/assets/icons/new/forward_arrow.svg"
                          width="12px"
                          height="13px"
                          alt="forward_arrow"
                        />} />
                    </span>
                </div>
                
              ) : (
                ""
              )}
              </div>
            </>
          ) : (
            ""
          )}
          <Slider>
            {globalSearch != "" && globalSearch.data.users != "undefined"
              ? globalSearch.data.users?.map((item, index) => {
                  return (
                    <Slide index={index} key={index}>
                      <GlobalSearchPeople users={item} tab="all" />
                    </Slide>
                  );
                })
              : ""}
          </Slider>
        </CarouselProvider>
        </> }
          
      </div>
      {/* <style>{`#tbody::-webkit-scrollbar{	width: 0px;}`}</style> */}
    </> 
  );
};

export default AllTab;
