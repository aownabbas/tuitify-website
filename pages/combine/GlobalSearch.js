import React from "react";
import COLORS from "../../public/assets/colors/colors";
// importing the four tabs of global search.
import GlobalSearchTabs from "../../components/combine/globalsearch/tabs/GlobalSearchTabs";
import { useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";

const GlobalSearch = () => {

  // getting the global search data from redux.
  const { globalSearch } = useSelector((state) => state.global_search);
  // getting the global search input value from redux.
  const { inputValue } = useSelector(
    (state) => state.global_search_apply_filter
  );
  // getting the filters value from the filter sidebar.
  const { filter } = useSelector((state) => state.global_search_apply_filter);

  // getting the input value from the global search api url as a string.
  let parts = "";
  let the_text = "";
  if (globalSearch != "") {
    parts = globalSearch.config.url.split("=", 10);
    the_text = inputValue;
  }

  return (
    <>
    {/* basic layout */}
      <Layout heading="Global Search">
        {/* <div
          // style={{
          //   backgroundColor: COLORS.whiteColor,
          //   // objectFit: "cover",
          //   // width: "600px",
          //   height: "960px",
          //   borderRadius: "25px",
          // }}
        > */}
              <div className="container-fluid col-12 row ps-0" style={{ height: "85vh", backgroundColor: COLORS.white, borderRadius: '20px' }}>
          {/* all the data renders based on the tab that is opened */}
          <GlobalSearchTabs
            globalSearch={globalSearch}
            the_text={the_text}
            filter={filter}
            inputValue={inputValue}
          />
        </div>
      </Layout>
    </>
  );
};

export default GlobalSearch;
