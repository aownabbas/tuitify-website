import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, useStepContext } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import useOnClickOutside from 'use-onclickoutside';
import moment from 'moment';
import Layout from '../../../components/layout/Layout';
import PublishedGiistsAction from '../../../redux/actions/PublishedGiistsAction';
import classes from '../../../components/kh_components/mygiists/PublishedGiists.module.css';
import ShareWithMeGiists from '../../../redux/actions/ShareWithMeGiists';
import FavouriteGiists from '../../../redux/actions/FavouriteGiists';
import AwaitingReviewGiists from '../../../redux/actions/AwaitingReviewGiists';
import PublishedGiistsTabContent from '../../../components/kh_components/mygiists/PublishedGiistsTabContent';
import FilterCategories from '../../../redux/actions/FilterCategories';
import CountingDifGiistsAction from '../../../redux/actions/CountingDifGiistsAction';
import DotProgress from '../../../components/DotProgress';
import { useMemo } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
//

const Styles = {
  tabsStyles: {
    alignItems: 'self-start !important',
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
    pt: 2,
    pb: 2,
    textShadow: 'none',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '23px',
    color: '#353452',
    fontFamily: 'Gilroy-Regular',
    '&:hover': {
      textShadow: 'none',
    },
  },
  activeTabsStyles: {
    alignItems: 'self-start !important',
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
    pt: 2,
    pb: 2,
    fontSize: '18px',
    lineHeight: '23px',
    fontWeight: 500,
    textShadow: 'none',
    display: 'flex',
    color: '#625EFE !important',
    justifyContent: 'center',
    fontFamily: 'Gilroy-Regular',
    '&:hover': {
      textShadow: 'none',
    },
  },
  tabsBadge: {
    background: '#424a5c',
    borderRadius: '20px 20px 20px 0px',
    height: '16px',
    width: '16px',
    transform: 'translateY(-60%)',
    fontSize: '12px',
    // marginLeft: '5px',
    color: '#FFFFFF !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    fontFamily: 'Gilroy-Regular',
    right: 5,
    mt: 0.5,
  },
  activeTabsBadge: {
    background: 'linear-gradient(241.72deg, #88edfe -43.84%, #625efe 59.56%, #c224fe 167.61%)',
    borderRadius: '20px 20px 20px 0px',
    height: '16px',
    width: '16px',
    transform: 'translateY(-60%)',
    fontSize: '12px',
    // marginLeft: '5px',
    color: '#FFFFFF !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    fontFamily: 'Gilroy-Regular',
    right: 5,
    mt: 0.5,
  },
  activeText: {
    fontWeight: '600',
    fontSize: '8px',
    lineHeight: '10px',
    /* identical to box height */
    textAlign: 'center',
    color: '#F4FAFF',
    fontStyle: 'normal',
    fontFamily: 'Gilroy-Regular',
  },
};

const PublishedGiists = () => {
  const { tabsStyles, tabsBadge, activeTabsBadge, activeTabsStyles, activeText } = Styles;
  // this is and function is made to handle tab state

  // Aws Link

  const counting_number_giists = useSelector((state) => state.counting_number_giists);
  const countedGiistsNums = counting_number_giists.counting_giists;

  const tabs = [
    { label: 'My Published Giists', value: 0 },
    { label: 'Sent for Publishing', value: 1 },
    { label: 'Awaiting My Review', value: 2 },
    { label: 'Unpublished Giists', value: 3 },
    { label: 'Draft Giists', value: 4 },
    { label: 'Rejected Giists', value: 5 },
  ];

  const PER_PAGE = 6;

  const [value, setValue] = useState(0);
  let [status, setStatus] = useState(2);
  const [dotProgressLoading, setDotProgressLoading] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterCategories, setFilterCategories] = useState([]);
  const [rating, setRating] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [GiistData, setGiistData] = useState(null);
  const [searchGiist, setSearchGiist] = useState('');
  const [selectCategories, setSelectCategories] = useState([]);

  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [getPlatData, setGetPlatData] = useState(null);
  const [page, setPage] = useState(1);

  const [clearingFilter, setClearingFilter] = useState(false);

  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setSearchGiist('');
    setValue(newValue);
    setPage(1);
    setRating('');
    setFilterCategories([]);
    setFromDate('');
    setToDate('');
    setClearingFilter(false);
  };

  const [loginData, setLoginData] = useState(null);

  var firstFormattedDate = fromDate == '' ? '' : moment(fromDate).format('YYYY-MM-DD');
  var secondFormattedDate = toDate == '' ? '' : moment(toDate).format('YYYY-MM-DD');

  useEffect(async () => {
    const LoginData = await JSON.parse(localStorage.getItem('@LoginData'));
    setLoginData(LoginData);
    const GetPlatData = await JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetPlatData(GetPlatData);
  }, []);

  useEffect(async () => {
    setSkeletonLoading(true);
    const LoginData = await JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      dispatch(CountingDifGiistsAction());
      const GiistApiCallParams = `limit=${PER_PAGE}&search=${searchGiist}&page=${page}&user_id=${
        LoginData?.id
      }&status=${status}&rating=${rating}&categoryIds=${
        !filterCategories?.length ? null : `[${filterCategories}]`
      }&fromDate=${firstFormattedDate}&toDate=${secondFormattedDate}`;
      status === null
        ? dispatch(
            AwaitingReviewGiists(
              `limit=${PER_PAGE}&page=${page}&search=${searchGiist}&rating=${rating}&categoryIds=${
                !filterCategories?.length ? null : `[${filterCategories}]`
              }&fromDate=${firstFormattedDate}&toDate=${secondFormattedDate}`,
              onGiistDataSuccess,
              onGiistsDataError,
            ),
          )
        : dispatch(PublishedGiistsAction(GiistApiCallParams, onGiistDataSuccess, onGiistsDataError));
    }
    return () => {};
  }, [status, page]);

  const handleFilter = () => {
    setSkeletonLoading(true);
    const GiistApiCallParams = `limit=${PER_PAGE}&search=${searchGiist}&page=${page}&user_id=${
      loginData?.id
    }&status=${status}&rating=${rating}&categoryIds=${
      !filterCategories?.length ? null : `[${filterCategories}]`
    }&fromDate=${firstFormattedDate}&toDate=${secondFormattedDate}`;
    status === null
      ? dispatch(
          AwaitingReviewGiists(
            `limit=${PER_PAGE}&page=${page}&search=${searchGiist}&rating=${rating}&categoryIds=${
              !filterCategories?.length ? null : `[${filterCategories}]`
            }&fromDate=${firstFormattedDate}&toDate=${secondFormattedDate}`,
            onGiistDataSuccess,
            onGiistsDataError,
          ),
        )
      : dispatch(PublishedGiistsAction(GiistApiCallParams, onGiistDataSuccess, onGiistsDataError));
    setClearingFilter(true);
  };

  const fetchGiistBySearch = async (searchItem, status, id) => {
    const LoginData = await JSON.parse(localStorage.getItem('@LoginData'));
    const GiistApiCallParams = `limit=${PER_PAGE}&search=${searchItem}&page=${page}&user_id=${LoginData?.id}&status=${status}`;
    if (status !== null) {
      dispatch(PublishedGiistsAction(GiistApiCallParams, onGiistDataSuccess, onGiistsDataError));
      setClearingFilter(true);
      return;
    } else {
      dispatch(
        AwaitingReviewGiists(
          `limit=${PER_PAGE}&page=${page}&search=${searchItem}`,
          onGiistDataSuccess,
          onGiistsDataError,
        ),
      );
      setClearingFilter(true);
      return;
    }
  };

  const handleFilterUser = () => {
    let timerId;
    return (e) => {
      setSkeletonLoading(true);
      const searchItem = e.target.value;
      setSearchGiist(searchItem);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fetchGiistBySearch(searchItem, status, loginData?.id);
      }, 500);
    };
  };

  let searchitem = useMemo(() => handleFilterUser(), [status]);

  const onGiistDataSuccess = (res) => {
    setSkeletonLoading(false);
    setGiistData(res);
    setSelectCategories([]);
    setFilterCategories([])
    console.log('Giist Res', res);
  };

  const onGiistsDataError = (error) => {
    console.log('error', error);
    setSkeletonLoading(false);
    setSelectCategories([]);
    setFilterCategories([])
  };

  const handleResetToDefault = () => {
    setSkeletonLoading(true);
    setRating('');
    setFromDate('');
    setToDate('');
    setFilterCategories([]);
    setSearchGiist('');
    setPage(1);
    const GiistApiCallParams = `limit=${PER_PAGE}&page=${page}&user_id=${loginData?.id}&status=${status}`;
    if (status !== null) {
      dispatch(PublishedGiistsAction(GiistApiCallParams, onGiistDataSuccess, onGiistsDataError));
      setClearingFilter(false);
      return;
    } else {
      dispatch(AwaitingReviewGiists(`limit=${PER_PAGE}&page=${page}`, onGiistDataSuccess, onGiistsDataError));
      setClearingFilter(false);
      return;
    }
  };

  return (
    <Layout heading="Knowledge Hub" showGiistIcon={true}>
      {dotProgressLoading == true && <DotProgress />}
      <div className="col-12">
        <div className="row mb-1 pt-2">
          <div className="d-flex align-items-center justify-content-start">
            <Link href="/kh/KnowledgeHome" passHref>
              <WestIcon sx={{ height: 24, width: 24 }} />
            </Link>
            <div
              className="ps-3"
              style={{
                fontFamily: 'Gilroy-Regular',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '18px',
                color: '#0F172A',
              }}
            >
              My Profile
            </div>
            <ChevronRightIcon fontSize="small" />
            <div
              className=" text-primary"
              style={{
                fontFamily: 'Gilroy-Regular',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '18px',
              }}
            >
              My Giists
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <Box sx={{ display: 'flex', height: 'auto' }}>
            <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 py-3">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                  background: '#F4FAFF',
                  borderRadius: '12px',
                  pt: 1,
                  pb: 1,
                }}
                TabIndicatorProps={{ style: { background: 'transparent' } }}
              >
                <Tab
                  label="Published"
                  icon={
                    countedGiistsNums ? (
                      <Typography sx={value == 0 ? activeTabsBadge : tabsBadge}>
                        <Typography sx={activeText}>{countedGiistsNums.publishedCount}</Typography>
                      </Typography>
                    ) : (
                      ''
                    )
                  }
                  sx={value == 0 ? activeTabsStyles : tabsStyles}
                  disableRipple
                  disableFocusRipple
                  {...a11yProps(0)}
                  onClick={() => {
                    setStatus(2);
                  }}
                />
                <Tab
                  label="Sent to Publisher"
                  sx={value == 1 ? activeTabsStyles : tabsStyles}
                  disableRipple
                  disableFocusRipple
                  icon={
                    // fetchedSentForPublishing?.totalItems > 0 ? (
                    countedGiistsNums ? (
                      <Typography sx={value == 1 ? activeTabsBadge : tabsBadge}>
                        <Typography sx={activeText}>{countedGiistsNums.sentForPublishingCount}</Typography>
                      </Typography>
                    ) : (
                      ''
                    )
                  }
                  {...a11yProps(1)}
                  onClick={() => {
                    setStatus(1);
                  }}
                />
                <Tab
                  label="Awaiting review"
                  sx={value == 2 ? activeTabsStyles : tabsStyles}
                  disableRipple
                  disableFocusRipple
                  icon={
                    // fetchedAwaitingReviewGiists?.totalItems > 0 ? (
                    countedGiistsNums ? (
                      <Typography sx={value == 2 ? activeTabsBadge : tabsBadge}>
                        <Typography sx={activeText}>{countedGiistsNums.awaitingReviewCount}</Typography>
                      </Typography>
                    ) : (
                      ''
                    )
                  }
                  {...a11yProps(2)}
                  onClick={() => {
                    setStatus(null);
                  }} //there is no status
                />
                <Tab
                  label="Unpublished"
                  sx={value == 3 ? activeTabsStyles : tabsStyles}
                  disableRipple
                  disableFocusRipple
                  icon={
                    countedGiistsNums ? (
                      <Typography sx={value == 3 ? activeTabsBadge : tabsBadge}>
                        <Typography sx={activeText}>{countedGiistsNums.unPublishedCount}</Typography>
                      </Typography>
                    ) : (
                      ''
                    )
                  }
                  {...a11yProps(3)}
                  onClick={() => {
                    setStatus(3);
                  }}
                />
                <Tab
                  label="Draft"
                  sx={value == 4 ? activeTabsStyles : tabsStyles}
                  // sx={value == 2 ? activeTabsStyles : tabsStyles}
                  disableRipple
                  disableFocusRipple
                  icon={
                    // fetchedDraftGiists?.totalItems > 0 ? (
                    countedGiistsNums ? (
                      <Typography sx={value == 4 ? activeTabsBadge : tabsBadge}>
                        <Typography sx={activeText}>{countedGiistsNums.draftCount}</Typography>
                      </Typography>
                    ) : (
                      ''
                    )
                  }
                  {...a11yProps(4)}
                  onClick={() => {
                    setStatus(0);
                  }}
                />
                <Tab
                  label="Rejected"
                  sx={value == 5 ? activeTabsStyles : tabsStyles}
                  disableRipple
                  disableFocusRipple
                  icon={
                    countedGiistsNums ? (
                      <Typography sx={value == 5 ? activeTabsBadge : tabsBadge}>
                        <Typography sx={activeText}>{countedGiistsNums.rejectedCount}</Typography>
                      </Typography>
                    ) : (
                      ''
                    )
                  }
                  {...a11yProps(5)}
                  onClick={() => {
                    setStatus(4);
                  }}
                />
                {/* <Tab
                  label="My Favorite"
                  sx={value == 6 ? activeTabsStyles : tabsStyles}
                  disableRipple
                  disableFocusRipple
                  icon={
                    // fetchedFavouriteGiists?.totalItems > 0 ? (
                    countedGiistsNums ? (
                      <Typography sx={value == 6 ? activeTabsBadge : tabsBadge}>
                        {countedGiistsNums.favoriteCount}
                      </Typography>
                    ) : (
                      ''
                    )
                  }
                  {...a11yProps(6)}
                  onClick={favouriteGiistsHandler}
                  onClick={refreshMedias}
                /> */}
                {/* <Tab
                  label="Shared with me"
                  sx={value == 7 ? activeTabsStyles : tabsStyles}
                  disableRipple
                  disableFocusRipple
                  icon={
                    // fetchedSharemeGiists?.totalItems > 0 ? (
                    countedGiistsNums ? (
                      <Typography sx={value == 7 ? activeTabsBadge : tabsBadge}>
                        {countedGiistsNums.receivedCount}
                      </Typography>
                    ) : (
                      ''
                    )
                  }
                  {...a11yProps(7)}
                  onClick={shareWithMeHandler}
                  onClick={refreshMedias}
                /> */}
              </Tabs>
            </div>
            <div className="col-lg-10 col-md-9 col-sm-8 col-xs-12">
              {tabs.map((tab, i) => {
                return i === value ? (
                  <TabPanel value={tab.value} index={i} key={i}>
                    <PublishedGiistsTabContent
                      tabTitle={tab.label}
                      fetchedGiistsData={GiistData}
                      setPage={setPage}
                      getPlatData={getPlatData}
                      setDotProgressLoading={setDotProgressLoading}
                      DotProgressLoading={dotProgressLoading}
                      PER_PAGE={PER_PAGE}
                      page={page}
                      setGiistData={setGiistData}
                      skeletonLoading={skeletonLoading}
                      searchitem={searchitem}
                      searchGiist={searchGiist}
                      status={status}
                      setSkeletonLoading={setSkeletonLoading}
                      setFromDate={setFromDate}
                      fromDate={fromDate}
                      setToDate={setToDate}
                      toDate={toDate}
                      setFilterCategories={setFilterCategories}
                      filterCategories={filterCategories}
                      rating={rating}
                      setRating={setRating}
                      setShowMenu={setShowMenu}
                      showMenu={showMenu}
                      handleFilter={handleFilter}
                      handleResetToDefault={handleResetToDefault}
                      clearingFilter={clearingFilter}
                      selectCategories={selectCategories}
                      setSelectCategories={setSelectCategories}
                    />
                  </TabPanel>
                ) : (
                  ''
                );
              })}
            </div>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default PublishedGiists;
