import COLORS from '../../public/assets/colors/colors';
import classes from '../../components/home/Home.module.css';
import HomeMyRankings from '../../components/home/HomeMyRankings';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Main from '../ch/Main';
import UserGiists from '../../components/combine/user_profile/publishedgiists/UserGiists';
import React, { useEffect, useState } from 'react';
import GenericTooltip from '../../components/ch/GenericTooltip';
// paginator
import WebPagination from '../../components/pagination/WebPagination';
import usePagination from '../../components/pagination/Pagination';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import KH_homeGiists from '../../redux/actions/KH_homeGiists';
import { useDispatch, useSelector } from 'react-redux';
import RankingStats from '../../redux/actions/KH_RankingStats';
import MyRankings from '../../redux/actions/KH_MyRankings';
import TableContainer from '@mui/material/TableContainer';
// import BriffDetails from '../../components/ch/chmainpage/briifdetail/BriffDetails';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Image from 'next/image';
import { Grid } from '@mui/material';
import SkeletonLoader from '../../components/kh_components/kh_home/SkeletonLoader';
import RankRowSkeleton from '../../components/home/RankRowSkeleton';


// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   // border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   textAlign: 'center',
// };

const HomePage = () => {
  const root = {
    width: '100%',
    height: '40vh',
    // background: 'red',
    overflowY: 'scroll',
    // overflowX: 'hidden',
    borderRadius: '10px',
    padding: '15px',
  };
  const table = {
    overflowX: 'scroll',
    overflowY: 'scroll',
    minWidth: 700,
  };

  const dispatch = useDispatch();
  const all_home_giists = useSelector((state) => state.all_home_giists);
  const combine_home_stats = useSelector((state) => state.combine_home_stats);
  const combine_home_rankings = useSelector((state) => state.combine_home_rankings);

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const allRankings = combine_home_rankings.user_rankings;
  const stats = combine_home_stats.stats_data;

  const [userGiistsItems, setUserGiistsItems] = useState([]);
  const [getPlat, setGetplat] = useState(null);

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetplat(GetPlatData);
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const { access_token } = LoginData;
    // dispatch(RankingStats(access_token, tokenModel));
    dispatch(RankingStats(access_token));
    dispatch(MyRankings(access_token));
  }, []);

  const myItems = all_home_giists.get_homeGiistsData;
  const gisstsItems = myItems.items;

  // paginator code

  let [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const PER_PAGE = 3;

  const count = Math.ceil(myItems.totalItems / PER_PAGE);
  const cardData = usePagination(gisstsItems, myItems.totalItems, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    cardData.jump(p);
  };
  // commented code end
  const handleResize = () => {
    if (window.innerWidth > 1920) {
      setIsMobile('Desktop');
      setLimit(3);
    }
    if (window.innerWidth <= 1920 && window.innerWidth > 1200) {
      setIsMobile('SMDesktop');
      setLimit(3);
    }
    if (window.innerWidth <= 1200 && window.innerWidth > 1024) {
      setIsMobile('LGTablet');
      setLimit(2);
    }
    if (window.innerWidth <= 1024 && window.innerWidth > 768) {
      setIsMobile('Tablet');
      setLimit(2);
    }
    if (window.innerWidth <= 768 && window.innerWidth > 480) {
      setIsMobile('SMTablet');
      setLimit(2);
    }
    if (window.innerWidth <= 480 && window.innerWidth > 320) {
      setIsMobile('LGMobile');
      setLimit(1);
    }
    if (window.innerWidth <= 320) {
      setIsMobile('Mobile');
      setLimit(1);
    }
  };

  const [isMobile, setIsMobile] = useState('');
  const [briifDetails, setBriifDetails] = useState(false);
  useEffect(() => {
    handleResize();
    window.addEventListener('load', handleResize);
    window.addEventListener('visibilitychange', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {};
  }, [isMobile]);

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const { access_token } = LoginData;

    let params = page;
    dispatch(KH_homeGiists(access_token, params, limit, onUserGiistsSuccess, onUserGiistsError));
    return () => {};
  }, [page, limit]);

  const onUserGiistsSuccess = (res) => {
    setUserGiistsItems(res);
  };
  const onUserGiistsError = (err) => {
    setUserGiistsItems(err);
  };
  // const briifDetaile = () => {
  //   setBriifDetails(true);
  // };
  // const [open, setOpen] = useState(true);
  // const handlemobileclose = () => setOpen(false);

  // const [showmodal, setShowModal] = useState(false);
  // const tokenModel = () => {
  //   setShowModal(true);
  // };

  return (
    <Layout heading="My Home">
      {/* this modal for future use for session expiry alert and redirect user to login */}
      {/* {showmodal ? (
        <div>
          <Modal
            open={open}
            onClose={handlemobileclose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Session expired
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Your login athentication has been expired
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '20px' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      localStorage.removeItem('@LoginData');
                      router.pathname === '/' ? router.reload('/') : router.replace('/');
                    }}
                    className="main-background-color text-white p-2 px-2 regular-mid border-0 align-right"
                    style={{
                      borderRadius: '.25rem',
                      fontWeight: '400',
                      width: '50px',
                    }}
                  >
                    Login
                  </button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </div>
      ) : null} */}
      <div className="col-12 px-3">
        <div className="row">
          <div
            className="col-12 col-sm-12 col-lg-4 col-xl-3 p-0"
            style={{ height: '85vh', backgroundColor: '#303548', borderRadius: '15px', overflow: 'hidden scroll' }}
          >
            <Main />
          </div>

          <div
            style={{ height: '85vh', overflowX: 'hidden', overflowY: 'auto' }}
            className="col-12 col-sm-12 col-lg-8 col-xl-9 mb-0 pe-2"
          >
            <div className="row mt-3 mt-lg-0">
              <div className="col-md-12 mb-2 pe-2 ps-0 ps-lg-2">
                <div
                  className="card w-100 "
                  style={{
                    borderRadius: '13px',
                    background: COLORS.mid_grey,
                  }}
                >
                  <div className="card-body px-3">
                    <div className="row mb-2 mt-2">
                      <div className="col-md-4 col-4 text-nowrap px-0 textCenter">
                        <p className={`${classes.cardtext} card-title regular-mid`} style={{ marginLeft: '10px' }}>
                          Latest Giists
                        </p>
                      </div>
                      <div className="col-md-8 col-md-8 col-12 mx-auto d-flex justify-content-end px-0">
                        <div className=" paginator">
                          <WebPagination
                            handleChange={handleChange}
                            count={count}
                            page={page}
                            size="small"
                            shape="rounded"
                            color="primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {/* {cardData.currentData()? */}
                      {/* {userGiistsItems !== [] ? ( */}
                      {gisstsItems !== undefined ? (
                        gisstsItems.map((giistItem) => (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-12 px-1">
                            <UserGiists
                              id={giistItem.id}
                              title={giistItem.title}
                              thumbnail={awsLink + 'giists/images/' + giistItem.thumbnail}
                              created={giistItem.created}
                              avg_rating={giistItem.avg_rating}
                              first_name={giistItem.first_name}
                              last_name={giistItem.last_name}
                              image={giistItem.image}
                              progress={giistItem.progress}
                              favorite={giistItem.favorite}
                              viewsCount={giistItem.viewsCount}
                            />
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-12 px-1">
                            <SkeletonLoader height={180} width="100%" borderRadius="20px" />
                            <SkeletonLoader height={14} width="80%" borderRadius="20px" />
                            <div className="row">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <SkeletonLoader height={40} width="40px" borderRadius="40px" />
                                </div>

                                <SkeletonLoader height={14} width="40%" borderRadius="20px" />

                                <div>
                                  <SkeletonLoader height={40} width="40px" borderRadius="40px" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-12 px-1">
                            <SkeletonLoader height={180} width="100%" borderRadius="20px" />
                            <SkeletonLoader height={14} width="80%" borderRadius="20px" />
                            <div className="row">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <SkeletonLoader height={40} width="40px" borderRadius="40px" />
                                </div>

                                <SkeletonLoader height={14} width="40%" borderRadius="20px" />

                                <div>
                                  <SkeletonLoader height={40} width="40px" borderRadius="40px" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-12 px-1">
                            <SkeletonLoader height={180} width="100%" borderRadius="20px" />
                            <SkeletonLoader height={14} width="80%" borderRadius="20px" />
                            <div className="row">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <SkeletonLoader height={40} width="40px" borderRadius="40px" />
                                </div>

                                <SkeletonLoader height={14} width="40%" borderRadius="20px" />

                                <div>
                                  <SkeletonLoader height={40} width="40px" borderRadius="40px" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-0">
              <div className="row mb-0">
                <Grid container spacing={0.7} className="pe-0 ps-0 ps-lg-2">
                  <Grid item md={9} xs={12} mb={0}>
                    <Paper elevation={0} style={root}>
                      <div className="bold">
                        <h6 className={`card-title ${classes.cardtext} regular-mid`}>My rankings</h6>
                      </div>
                      <TableContainer>
                        <Table sx={{ minWidth: 300 }} style={table}>
                          <TableHead>
                            <TableRow>
                              <TableCell className="text-secondary regular-small lh-1 py-0">Rank</TableCell>
                              <TableCell className="text-secondary regular-small lh-1 py-0" align="center">
                                Name
                              </TableCell>
                              <TableCell className="text-secondary regular-small lh-sm py-0" align="center">
                                Total Giists (Viewed)
                              </TableCell>
                              <TableCell className="text-secondary regular-small lh-sm py-0" align="center">
                                Total Giists (Created)
                              </TableCell>
                              <TableCell className="text-secondary regular-small lh-sm py-0" align="center">
                                Total Viewers (Gained)
                              </TableCell>
                              <TableCell className="text-secondary regular-small lh-sm py-0" align="center">
                                Total Giist Rating
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {allRankings !== undefined &&
                              allRankings.items?.map((userRank) => (
                                <TableRow hover key={userRank.id}>
                                  <TableCell className="regular-small" align="center" component="th" scope="row">
                                    {userRank.id}.
                                  </TableCell>
                                  <TableCell align="center">
                                    <div className="row">
                                      <div className="col-4">
                                        <Image
                                          src="/assets/images/ranking_image.png"
                                          height="32px"
                                          width="32px"
                                          className="img-row"
                                        />
                                      </div>
                                      {/* <div className="w-15 "></div> */}
                                      <span className="col-8 text-truncate text-start">
                                        <GenericTooltip
                                          placement="top"
                                          title={userRank.first_name + userRank.last_name}
                                          component={
                                            <div
                                              className={`w-100 align-start regular-small text-nowrap text-truncate ${classes.randingUserName}`}
                                            >
                                              {userRank.first_name} {userRank.last_name}
                                            </div>
                                          }
                                        />
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="regular-small" align="center">
                                    {userRank.own_tutorial_views_count}
                                  </TableCell>
                                  <TableCell className="regular-small" align="center">
                                    {userRank.tutorial_views_count}
                                  </TableCell>
                                  <TableCell className="regular-small" align="center">
                                    {userRank.tutorials_count}
                                  </TableCell>
                                  <TableCell align="center">
                                    <div className={`ratingradient text-center regular-small`}>
                                      {' '}
                                      {userRank.avg_rating}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            {allRankings?.items == undefined && (
                              <>
                                <RankRowSkeleton />
                                <RankRowSkeleton />
                                <RankRowSkeleton />
                              </>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item md={3} xs={12} mb={0}>
                    {/* <HomeStatistics mystats={stats} /> */}
                    <div
                      className="card ms-0 ms-lg-2 mt-2 mt-lg-0"
                      style={{ borderRadius: '10px', overflowY: 'scroll', height: '40vh', boxShadow: '1px black' }}
                    >
                      <div className="card-body px-2 mt-2">
                        <div className="row">
                          <h6 className={`card-title ${classes.cardtext} regular-small text-nowrap`}>My Statistics</h6>
                        </div>
                        {stats !== [] &&
                          stats?.map((stat) => (
                            <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '30vh' }}>
                              <div className="row mb-2 ">
                                <p className={`mb-2  ${classes.notiText}`}>{stat.tutorial_views_count}</p>
                                <p className={`card-text  ${classes.statText}`}>Total views Gained</p>
                              </div>
                              <div className="row mb-3">
                                <p className={`mb-2  ${classes.notiText}`}>{stat.tutorials_count}</p>
                                <p className={`card-text  ${classes.statText}`}>Total giists created</p>
                              </div>
                              <div className="row mb-3">
                                <p className={`mb-2  ${classes.notiText}`}>{stat.avg_rating}</p>
                                <p className={` card-text ${classes.statText}`}>Average Rating</p>
                              </div>
                            </div>
                          ))}
                        {stats.length == 0 && (
                          <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '30vh' }}>
                            <div className="row mb-2 ">
                              <p className={`mb-2  ${classes.notiText}`}>
                                <SkeletonLoader height={25} width={'10%'} borderRadius="20px" />
                              </p>
                              <p className={`card-text  ${classes.statText}`}>Total views Gained</p>
                            </div>
                            <div className="row mb-3">
                              <p className={`mb-2  ${classes.notiText}`}>
                                <SkeletonLoader height={25} width={'10%'} borderRadius="20px" />
                              </p>
                              <p className={`card-text  ${classes.statText}`}>Total giists created</p>
                            </div>
                            <div className="row mb-3">
                              <p className={`mb-2  ${classes.notiText}`}>
                                <SkeletonLoader height={25} width={'10%'} borderRadius="20px" />
                              </p>
                              <p className={` card-text ${classes.statText}`}>Average Rating</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
