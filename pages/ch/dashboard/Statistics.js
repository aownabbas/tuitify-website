import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import ActionStatistics from '../../../redux/actions/ds_Statistics';
import axios from 'axios';
import { URL } from '../../../public/assets/path/path';
import Layout from '../../../components/layout/Layout';
import DashboardCard from '../../../components/ch/ch_dashboard/statistics/DashboardCard';
import { useRouter } from 'next/router';
import DashboardButton from '../../../components/ch/ch_dashboard/statistics/DashboardButton';
import DashboardGraph from '../../../components/ch/ch_dashboard/statistics/DashboardGraph';
import DashboardFilter from '../../../components/ch/ch_dashboard/statistics/DashboardFilter';
import Kh_StatisticsAction from '../../../redux/actions/Kh_StatisticsAction';
import SkeletonLoader from '../../../components/kh_components/kh_home/SkeletonLoader';

const Statistics = () => {
  const router = useRouter();
  // all states and variables
  const [visible1, setvisible1] = useState('alldata');
  const [visible2, setvisible2] = useState(false);
  const [type, setmytype] = useState();
  const [interval, setinterval] = useState('all_time');
  const [myresponse, setmyResponse] = useState();
  const [heading, setHeading] = useState('');
  const [token, setToken] = useState();
  // (typeof window != "undefined" && router.query.dashboard && router.query.dashboard == "kh" ? "Total Giists" : 'Briifs');

  // platform data state.
  const [getPlatData, setGetPlatData] = useState({});
  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  const { graph, loading } = useSelector((state) => state.graph);
  const { kh_stats, kh_loading } = useSelector((state) => state.kh_stats);
  console.log(graph, 'graphch');
  console.log(kh_stats.data, 'graphkh');
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const [showCommHubIcon, setShowCommHubIcon] = useState(false);
  const [showKHubIcon, setShowKHubIcon] = useState(false);
  const [showGiistIcon, setShowGiistIcon] = useState(false);

  useEffect(async () => {
    // login and platform data
    setHeading(router.query.dashboard == 'kh' ? 'Total Giists' : 'Briifs');
    if (router.query.dashboard == 'kh') {
      setmytype('giists');
      setShowGiistIcon(true);
    } else {
      setmytype('briffs');
      setShowCommHubIcon(true);
    }
    let GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetPlatData(GetPlatData);
    //eslint-disable-next-line
    return () => {};
  }, [router.query.dashboard]);

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    // const id = LoginData.id;
    setToken(LoginData.access_token);
    if (selectedPlatform?.platform_id) {
      const kh_params = `interval=${interval}&type=giists&platform_id=${selectedPlatform?.platform_id}`;
      dispatch(Kh_StatisticsAction(kh_params, LoginData.access_token));
      const ch_params = `platform_id=${selectedPlatform?.platform_id}&type=briffs&interval=${interval}`;
      dispatch(ActionStatistics(ch_params, LoginData.access_token));
    }
    return () => {};
  }, [selectedPlatform?.platform_id]);

  // objects for background colors of buttons
  let buttonstyle4 = {
    backgroundColor: '',
    opacity: '',
  };
  let buttonstyle5 = {
    backgroundColor: '',
    opacity: '',
  };
  let buttonstyle6 = {
    backgroundColor: '',
    opacity: '',
  };
  let buttonstyle7 = {
    backgroundColor: '',
    opacity: '',
  };

  visible2 == 'Briifs' || visible2 == 'Total Giists'
    ? ((buttonstyle4.backgroundColor = '#4E6AFE'), (buttonstyle4.opacity = '1'))
    : visible2 == 'Interactions' || visible2 == 'Giist Interactions'
    ? ((buttonstyle5.backgroundColor = '#4E6AFE'), (buttonstyle5.opacity = '1'))
    : visible2 == 'Active Users'
    ? ((buttonstyle6.backgroundColor = '#4E6AFE'), (buttonstyle6.opacity = '1'))
    : visible2 == 'Live Sessions' || visible2 == 'Total Giist Views'
    ? ((buttonstyle7.backgroundColor = '#4E6AFE'), (buttonstyle7.opacity = '1'))
    : ((buttonstyle4.backgroundColor = '#4E6AFE'), (buttonstyle4.opacity = '1'));

  const [hoverTextWhite, setHoverTextWhite] = useState(false);
  const [hoverTextWhite1, setHoverTextWhite1] = useState(false);
  const [hoverTextWhite2, setHoverTextWhite2] = useState(false);
  const [hoverTextWhite3, setHoverTextWhite3] = useState(false);

  return (
    <Layout
      heading="General Statistics"
      dashboard={router.query.dashboard == 'ch' ? 'dashboard=ch' : 'dashboard=kh'}
      image={``}
      showBriffIcon={router.query.dashboard == 'ch' ? true : false}
      showGiistIcon={router.query.dashboard == 'kh' ? true : false}
      setGetPlatData={setGetPlatData}
      getPlatData={getPlatData}
    >
      <div className="col-12 row overflow-auto mb-5" style={{ height: '85vh' }}>
        {/* stats four main parts for interactions and briifs and live sessions  */}

        {loading !== true && kh_loading !== true ? (
          // graph.data && kh_stats.data ?
          // graph.data.length==0 ?"hyyyyyy":
          <div
            className="col-12 col-lg-9 ps-0 mb-0 pb-0 scroll-bar-width-none pe-md-3 p-0"
            style={{ height: '100%', overflowX: 'hidden', overflowY: 'scroll' }}
          >
            <div className="row dashboard-statistic mb-3 mb-lg-0" style={{ paddingLeft: '12px' }}>
              <Link
                href={
                  router.query.dashboard == 'ch'
                    ? `/ch/dashboard/TotalBriifs?dashboard=ch&interval=${interval}`
                    : `/ch/dashboard/TotalGiists?dashboard=kh&interval=${interval}`
                }
              >
                <div className="dasboardCard col-sm-3 col-md-3 col-lg-3 ps-0 dashboard-active-cards">
                  <DashboardCard
                    circledot={'circledot'}
                    color={'#FE9B7B'}
                    value={router.query.dashboard == 'ch' ? graph.briffsCount : kh_stats.giistCount}
                    myresponse={router.query.dashboard == 'ch' ? 'Total Briifs Created' : 'Total Giists Created'}
                    setHoverTextWhite={setHoverTextWhite}
                    hoverTextWhite={hoverTextWhite}
                  />
                </div>
              </Link>

              <Link
                href={
                  router.query.dashboard == 'ch'
                    ? `/ch/dashboard/Interactions?dashboard=ch&interval=${interval}`
                    : `/ch/dashboard/Interactions?dashboard=kh&interval=${interval}`
                }
              >
                <div className="dasboardCard col-sm-3 col-md-3 mtDashboardCard col-lg-3 ps-0 dashboard-active-cards">
                  <DashboardCard
                    value={router.query.dashboard == 'ch' ? graph.interactionsCount : kh_stats.commentsCount}
                    myresponse={
                      router.query.dashboard == 'ch' ? 'Total Briif Interactions' : 'Total Giist Interactions'
                    }
                    setHoverTextWhite={setHoverTextWhite1}
                    hoverTextWhite={hoverTextWhite1}
                    circledot={'circledotgreen'}
                  />
                </div>
              </Link>

              {/* {graph.activeUsersCount && ( */}
              <Link
                href={
                  router.query.dashboard == 'ch'
                    ? `/ch/dashboard/ActiveUsers?dashboard=ch&interval=${interval}`
                    : `/ch/dashboard/ActiveUsers?dashboard=kh&interval=${interval}`
                }
              >
                <div className="dasboardCard col-sm-3 col-md-3 col-lg-3 ps-0 mt-2 mt-sm-0 dashboard-active-cards">
                  <DashboardCard
                    circledot={'userdot'}
                    value={router.query.dashboard == 'ch' ? graph.activeUsersCount : kh_stats.activeUsersCount}
                    // myresponse={myresponse.users.name}
                    myresponse="Total Active Users"
                    setHoverTextWhite={setHoverTextWhite2}
                    hoverTextWhite={hoverTextWhite2}
                  />
                </div>
              </Link>
              {/* )} */}

              <Link
                href={
                  router.query.dashboard == 'ch'
                    ? `/ch/dashboard/LiveSessions?interval=${interval}`
                    : `/ch/dashboard/EngagementRate?dashboard=kh&interval=${interval}`
                }
              >
                <div className="dasboardCard col-sm-3 col-md-3 col-lg-3 mt-2 mt-sm-0 ps-0 dashboard-active-cards">
                  <DashboardCard
                    circledot={'circledot'}
                    value={router.query.dashboard == 'ch' ? graph.meetingsCount : kh_stats.engagmentRate + '%'}
                    myresponse={router.query.dashboard == 'ch' ? 'Total Live Sessions' : 'Engagement Rate'}
                    setHoverTextWhite={setHoverTextWhite3}
                    hoverTextWhite={hoverTextWhite3}
                  />
                </div>
              </Link>
            </div>

            {/* all graphs design and implementations here */}
            <div
              className="d-flex row align-items-end"
              style={{
                paddingLeft: '12px',
                minHeight: '40px',
                maxHeight: '90px',
              }}
            >
              <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                <div className="row pb-0 scroll-width-none" style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
                  <div className="col-lg-3 col-md-3 col-sm-3 dasboardButtonCard ps-0 pe-3">
                    <DashboardButton
                      setHeading={setHeading}
                      setmytype={setmytype}
                      setvisible2={setvisible2}
                      id={id}
                      interval={interval}
                      type={router.query.dashboard == 'kh' ? 'giists' : 'briffs'}
                      buttonstyle={buttonstyle4}
                      selectedPlatform={selectedPlatform}
                      buttonName={router.query.dashboard == 'kh' ? 'Total Giists' : 'Briifs'}
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 dasboardButtonCard ps-0 pe-3">
                    <DashboardButton
                      setHeading={setHeading}
                      setmytype={setmytype}
                      setvisible2={setvisible2}
                      id={id}
                      interval={interval}
                      type={router.query.dashboard == 'kh' ? 'comments' : 'interactions'}
                      buttonstyle={buttonstyle5}
                      selectedPlatform={selectedPlatform}
                      buttonName={router.query.dashboard == 'kh' ? 'Giist Interactions' : 'Interactions'}
                    />
                  </div>
                  {graph.activeUsersCount !== 0 && (
                    <div className="col-lg-3 col-md-3 col-sm-3 mt-2 mt-sm-0 dasboardButtonCard ps-0 pe-3">
                      <DashboardButton
                        setHeading={setHeading}
                        setmytype={setmytype}
                        setvisible2={setvisible2}
                        id={id}
                        interval={interval}
                        type="users"
                        buttonstyle={buttonstyle6}
                        selectedPlatform={selectedPlatform}
                        buttonName="Active Users"
                      />
                    </div>
                  )}

                  <div className="col-lg-3 col-md-3 col-sm-3 mt-2 mt-sm-0 dasboardButtonCard ps-0 pe-3">
                    <DashboardButton
                      setHeading={setHeading}
                      setmytype={setmytype}
                      setvisible2={setvisible2}
                      id={id}
                      interval={interval}
                      type={router.query.dashboard == 'kh' ? 'giist_views' : 'meetings'}
                      buttonstyle={buttonstyle7}
                      selectedPlatform={selectedPlatform}
                      buttonName={router.query.dashboard == 'kh' ? 'Total Giist Views' : 'Live Sessions'}
                    />
                  </div>
                </div>
              </div>
            </div>

            <DashboardGraph
              heading={heading}
              graph={router.query.dashboard == 'ch' ? graph.data : kh_stats.data}
              visible1={visible1}
            />
          </div>
        ) : (
          // :""
          <div
            className="col-12 col-lg-9 ps-0 mb-0 pb-0 scroll-bar-width-none pe-md-3 p-0"
            style={{ height: '100%', overflowX: 'hidden', overflowY: 'scroll' }}
          >
            <div className="row">
              <div className="col-6 col-lg-3 mt-1">
                <SkeletonLoader height={85} borderRadius="15px" width="100%" />
              </div>
              <div className="col-6 col-lg-3 mt-1">
                <SkeletonLoader height={85} borderRadius="15px" width="100%" />
              </div>
              <div className="col-6 col-lg-3 mt-1">
                <SkeletonLoader height={85} borderRadius="15px" width="100%" />
              </div>
              <div className="col-6 col-lg-3 mt-1">
                <SkeletonLoader height={85} borderRadius="15px" width="100%" />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 col-lg-8">
                <div className="row">
                  <div className="col-6 col-lg-3 mt-1">
                    <SkeletonLoader height={30} borderRadius="9px" width="100%" />
                  </div>
                  <div className="col-6 col-lg-3 mt-1">
                    <SkeletonLoader height={30} borderRadius="9px" width="100%" />
                  </div>
                  <div className="col-6 col-lg-3 mt-1">
                    <SkeletonLoader height={30} borderRadius="9px" width="100%" />
                  </div>
                  <div className="col-6 col-lg-3 mt-1">
                    <SkeletonLoader height={30} borderRadius="9px" width="100%" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <SkeletonLoader height={420} borderRadius="15px" width="99%" />
            </div>
          </div>
        )}
        {loading !== true && kh_loading !== true ? (
          <div
            style={{ borderRadius: '15px', height: '99%' }}
            className="col-12 mt-4 mt-lg-0 col-lg-3 d-flex justify-content-center bg-white px-0 overflow-scroll mb-5 mb-lg-0"
          >
            {/* <div style={{ borderRadius: '25px' }} className="col-3 col-md-2 col-sm-2 col-lg-2"> */}
            <div className="col-9 col-md-9 mb-md-5 mb-lg-0">
              <div className="mrgntp2">
                <div className=" bold mb-3">Filter By:</div>
              </div>

              <DashboardFilter
                visible1={visible1}
                setvisible1={setvisible1}
                setinterval={setinterval}
                selectedPlatform={selectedPlatform}
                type={type}
                id={id}
                tab="alldata"
                interval="all_time"
                value="All Time Data"
                token={token}
              />
              <div className="mrgntp2">
                <DashboardFilter
                  visible1={visible1}
                  setvisible1={setvisible1}
                  setinterval={setinterval}
                  selectedPlatform={selectedPlatform}
                  type={type}
                  id={id}
                  tab="Last7Days"
                  interval="7_days"
                  value="Last 7 Days"
                  token={token}
                />
              </div>
              <div className="mrgntp2">
                <DashboardFilter
                  visible1={visible1}
                  setvisible1={setvisible1}
                  setinterval={setinterval}
                  selectedPlatform={selectedPlatform}
                  type={type}
                  id={id}
                  tab="LastMonth"
                  interval="30_days"
                  value="Last Month"
                  token={token}
                />
              </div>

              <div className="mrgntp2">
                <DashboardFilter
                  visible1={visible1}
                  setvisible1={setvisible1}
                  setinterval={setinterval}
                  selectedPlatform={selectedPlatform}
                  type={type}
                  id={id}
                  tab="6month"
                  interval="6_months"
                  value="Last 6 Months"
                  token={token}
                />
              </div>
              <div className="mrgntp2">
                <DashboardFilter
                  visible1={visible1}
                  setvisible1={setvisible1}
                  setinterval={setinterval}
                  selectedPlatform={selectedPlatform}
                  type={type}
                  id={id}
                  tab="LastYear"
                  interval="last_year"
                  value="Last year"
                  token={token}
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="col-12 mt-4 mt-lg-0 col-lg-3 d-flex justify-content-center px-0 overflow-scroll mb-5 mb-lg-0"
            style={{ borderRadius: '15px', height: '101%' }}
          >
            <SkeletonLoader height="100%" borderRadius="15px" width="99%" />
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Statistics;
