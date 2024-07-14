import React, {useState} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BriifTab from "./BriifTab";
import GiistTab from "./GiistTab";
import PeopleTab from "./PeopleTab";
import globalSearchTabs from "../../../../redux/actions/GlobalSearchTabs";
import globalSearchApplyFilter from "../../../../redux/actions/GlobalSearchApplyFilter";
import { useDispatch, useSelector } from "react-redux";
import styles from './GlobalSearchTabs.module.scss';
import dynamic from "next/dynamic";

const AllTab = dynamic(() => import("./AllTab"), {
  ssr: false,
});
// import styles from "./GlobalSearchTabs.module.scss";

const GlobalSearchTabs = (props) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.global_search_apply_filter);
  const { inputValue } = useSelector(
    (state) => state.global_search_apply_filter
  );

  // tab responsive handle state
  const [isMobile, setIsMobile] = useState("");

  //active tab state value
  const [value, setValue] = React.useState("all");

  let from_parts = "";
  let to_parts = "";
  let from = "";
  let to = "";
  let before_from = "";
  let before_to = "";
  if (props.globalSearch != "") {
    from_parts = props.globalSearch.config.url.split("=", 8);
    before_from = from_parts[7].substring(0, 10);
    from = before_from;
    to_parts = props.globalSearch.config.url.split("=", 9);
    before_to = to_parts[8].substring(0, 10);
    to = before_to;
  }

  
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


  // function for to change tab based on value of tab clicked
  const handleChange = (e, newValue) => {
    // console.log(newValue);
    if(newValue == "all"){
      handleResize();
      console.log("hello")
    }
    console.log(isMobile);
    setValue(newValue);
    dispatch(globalSearchTabs(newValue));
    dispatch(globalSearchApplyFilter(inputValue, filter, 0))
  };

  return (
    <div className="overflow-auto h-100">
      <TabContext value={value}>
        <Box className={`${styles.global_search_tabs} mt-4`}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{style: {display: "none"}}}
            // className="overflow-scroll"
            // className={`${styles.global_search_tabs}`}
          >
            <Tab
              className="text-white regular-small mx-2 py-1"
              style={{ borderRadius: "10px", height: "40px" }}
              label="All"
              value="all"
            />

            <Tab
              className="text-white regular-small mx-2"
              style={{ borderRadius: "10px" }}
              label="Briifs"
              value="briffs"
            />

            <Tab
              className="text-white regular-small mx-2"
              style={{ borderRadius: "10px" }}
              label="Giists"
              value="tuties"
            />

            <Tab
              className="text-white regular-small mx-2"
              style={{ borderRadius: "10px" }}
              label="People"
              value="users"
            />
          </TabList>
        </Box>
        {props.filter == true ? (
          <div className="row ms-0 d-flex justify-content-center">
            <div className="mt-2 ps-2 col-6">
              <span style={{ opacity: "0.4" }} className="medium-large">
                From{" "}
              </span>
              <span className="medium-large">{from}</span>
              <span style={{ opacity: "0.4" }} className="medium-large">
                {" "}
                - To{" "}
              </span>
              <span className="medium-large">{to}</span>
            </div>
            <div className="mt-2 col-6 text-end">
              <p
                className="text-danger"
                onClick={(e) => {
                  dispatch(globalSearchApplyFilter(props.inputValue, false, 0));
                }}
                style={{ cursor: "pointer" }}
              >
                Clear All
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        <p
          className={
            props.filter == true
              ? "medium-large mt-0 ps-2 mb-1"
              : "medium-large mt-0 ps-2 mb-1"
          }
        >
          <span className="text-secondary">Explore search Related to:</span>{" "}
          <b>&ldquo;{inputValue}&rdquo;</b>
        </p>
        <TabPanel value="all" className="px-0 pt-0 h-100 overflow-scroll" >
          <AllTab the_text={props.the_text} changeTab={handleChange} value={value} isMobile={isMobile} />{" "}
        </TabPanel>
        <TabPanel value="briffs" className="pt-2 ps-2 pe-0">
          <BriifTab />{" "}
        </TabPanel>
        <TabPanel value="tuties" className="pt-2 ps-2 pe-0">
          <GiistTab />{" "}
        </TabPanel>
        <TabPanel value="users" className="pt-2 ps-2 pe-0">
          <PeopleTab />{" "}
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default GlobalSearchTabs;
