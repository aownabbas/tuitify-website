import { useRef, useState, useEffect } from 'react';
import classes from '../../components/kh_components/kh_home/knwoledgeHome.module.css';
import UserGiists from '../../components/combine/user_profile/publishedgiists/UserGiists';
import HomeSlider from '../../components/kh_components/kh_home/HomeSlider';
import Layout from '../../components/layout/Layout';
import Kh_LatestGiistsAction from '../../redux/actions/Kh_LatestGiistsAction';
import { useDispatch } from 'react-redux';
import Kh_followedGiistsAction from '../../redux/actions/Kh_FollowedGiistsAction';
import Kh_WatchedGiistsAction from '../../redux/actions/Kh_WatchedGiistsAction';
import Kh_WatchAgainGiistsAction from '../../redux/actions/Kh_WatchAgainAction';
import SkeletonLoader from '../../components/kh_components/kh_home/SkeletonLoader';
import Link from 'next/link';
import FilterCategories from '../../redux/actions/FilterCategories';
import { TopRatedGiists } from '../../redux/actions/TopRatedGiists';
import Header from '../../components/layout/Header';

const KnowlegeHome = () => {
  const videoRef = useRef(null);

  // Aws Link
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [sliderGiists, setSliderGiists] = useState();
  const [topRatedGiists, setTopRatedGiists] = useState([]);
  const [latestGiists, setLatestGiists] = useState();
  const [followedUserGiists, setfollowedUserGiists] = useState();
  const [watchedGiists, setWatchedGiists] = useState();
  const [watchAgainGiists, setWatchAgainGiists] = useState();
  const [selectCategories, setSelectCategories] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const { access_token } = LoginData;
    const params = `page=1&limit=4`;
    dispatch(TopRatedGiists(params, onTopRatedSuccess, onTopRatedError));
    dispatch(Kh_LatestGiistsAction(params, access_token, onlatestGiistsActionSuccess, onlatestGiistsActionError));
    dispatch(Kh_followedGiistsAction(params, access_token, onfollowedUserGiistsSuccess, onfollowedUserGiistsError));
    dispatch(Kh_WatchedGiistsAction(params, access_token, onWatchedGiistsActionSuccess, onWatchedGiistsActionError));
    dispatch(Kh_WatchAgainGiistsAction(params, access_token, onWatchAgainGiistsSuccess, onWatchAgainGiistsError));
    const catsParam = `platform_id=${GetPlatData?.platform_id}`;
    dispatch(FilterCategories(catsParam, onCategoriesSuccess, onCategoriesError));
  }, []);
  // This Api Call For Slider Kh Home Page
  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const { access_token } = LoginData;
    const params = `page=1&limit=5`;
    dispatch(Kh_LatestGiistsAction(params, access_token, onSliderGiistsSuccess, onSliderGiistsError));
  }, []);

  const onSliderGiistsSuccess = (res) => {
    setSliderGiists(res);
  };

  const onSliderGiistsError = (err) => {
    console.log(err);
  };

  const onTopRatedSuccess = (res) => {
    setTopRatedGiists(res.items);
  };
  const onTopRatedError = (err) => {
    console.log('error', err);
  };

  const onlatestGiistsActionSuccess = (res) => {
    setLatestGiists(res.items);
  };

  const onlatestGiistsActionError = (err) => {
    console.log(err);
  };

  const onfollowedUserGiistsSuccess = (res) => {
    setfollowedUserGiists(res);
  };

  const onfollowedUserGiistsError = (err) => {
    console.log(err);
  };

  const onWatchedGiistsActionSuccess = (res) => {
    setWatchedGiists(res);
  };

  const onWatchedGiistsActionError = (err) => {
    console.log(err);
  };

  const onWatchAgainGiistsSuccess = (res) => {
    setWatchAgainGiists(res);
  };

  const onWatchAgainGiistsError = (err) => {
    console.log(err);
  };

  const onCategoriesSuccess = (res) => {
    setSelectCategories(res.categories);
  };

  const onCategoriesError = (err) => {
    console.log(err);
  };

  return (
    <Layout heading="Knowledge Hub" bgColor="#fff" KH={true} showGiistIcon={true}>

      <div
        className="col-12 d-inline-flex justify-content-center px-0"
        style={{
          maxWidth: '100%',
          height: '98vh',
          borderRadius: '15px',
          position:"relative"
        }}
      >
        <div className="col-12 col-sm-12 col-md-12 px-0">
          <div className="col-12 justify-content-center w-100 mx-auto px-0">
            <div className="mb-2 w-100">
            {/* <div style={{ position: 'absolute',width:"100%",zIndex: 10 }}>
              <Header/>
              </div> */}
              <HomeSlider sliderGiists={sliderGiists} selectCategories={selectCategories} />
              
            </div>
            {topRatedGiists?.length !== 0 ? (
              <div className="col-lg-12 col-md-12 col-sm-12 mb-3 px-2">
                <div className="row mt-4 mb-0">
                  <div className="col-6">
                    <p className={`${classes.rowHeading}`}>
                      <a className={`${classes.rowlink}`}>Top Rated Giists</a>
                    </p>
                  </div>
                  <div className="col-6">
                    <Link
                      href={{
                        pathname: '../kh/ViewAllGiists',
                        query: { name: 'Top Giists', awsLink: awsLink },
                      }}
                    >
                      <button
                        className="main-background-color text-white p-2 px-2 regular-mid border-0 align-right"
                        style={{
                          borderRadius: '.25rem',
                        }}
                      >
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="row mx-0 mb-2 px-2">
                  {topRatedGiists ? (
                    topRatedGiists?.map((item) => (
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3 p-1">
                        <UserGiists
                          id={item.id}
                          title={item.title}
                          thumbnail={awsLink + 'giists/images/' + item.thumbnail}
                          created={item.created}
                          avg_rating={item.avg_rating}
                          first_name={item.first_name}
                          last_name={item.last_name}
                          image={item.image}
                          progress={item.progress}
                          language={item.language}
                          userId={item.user_id}
                          favorite={item.favorite}
                          viewsCount={item.viewsCount}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="row pe-sm-0 my-1 px-2">
                      {[1, 2, 3, 4].map(() => (
                        <div className="col-lg-3 col-sm-6 ">
                          <SkeletonLoader height={170} borderRadius="15px" width="100%" />
                          <div className="mt-2 d-flex px-1">
                            <SkeletonLoader height={13} borderRadius="12px" width="50%" />
                          </div>
                          <div className="d-flex mt-1 align-items-center justify-content-between px-1">
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
            {latestGiists?.length !== 0 ? (
              <div className="col-lg-12 col-md-12 col-sm-12 mb-3 px-2">
                <div className="row mt-4 mb-0">
                  <div className="col-6">
                    <p className={`${classes.rowHeading}`}>
                      <a className={`${classes.rowlink}`}>Latest Giists</a>
                    </p>
                  </div>
                  <div className="col-6">
                    <Link
                      href={{
                        pathname: '../kh/ViewAllGiists',
                        query: { name: 'Latest Giists', awsLink: awsLink },
                      }}
                    >
                      <button
                        className="main-background-color text-white p-2 px-2 regular-mid border-0 align-right"
                        style={{
                          borderRadius: '.25rem',
                        }}
                      >
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="row mx-0 mb-2 px-2">
                  {latestGiists ? (
                    latestGiists?.map((item) => (
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3 p-1">
                        <UserGiists
                          id={item.id}
                          title={item.title}
                          thumbnail={awsLink + 'giists/images/' + item.thumbnail}
                          created={item.created}
                          avg_rating={item.avg_rating}
                          first_name={item.first_name}
                          last_name={item.last_name}
                          image={item.image}
                          progress={item.progress}
                          language={item.language}
                          userId={item.user_id}
                          favorite={item.favorite}
                          viewsCount={item.viewsCount}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="row pe-sm-0 my-1 px-2">
                      {[1, 2, 3, 4].map(() => (
                        <div className="col-lg-3 col-sm-6 ">
                          <SkeletonLoader height={170} borderRadius="15px" width="100%" />
                          <div className="mt-2 d-flex px-1">
                            <SkeletonLoader height={13} borderRadius="12px" width="50%" />
                          </div>
                          <div className="d-flex mt-1 align-items-center justify-content-between px-1">
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
            {followedUserGiists?.totalItems !== 0 ? (
              <div className="col-lg-12 col-md-12 col-sm-12 mb-3 px-2">
                <div className="row mt-4 mb-0">
                  <div className="col-6 ">
                    <p className={`${classes.rowHeading}`}>
                      <a className={`${classes.rowlink}`}>Followed Users</a>
                    </p>
                  </div>
                  <div className="col-6">
                    <Link
                      href={{
                        pathname: '../kh/ViewAllGiists',
                        query: { name: 'Followed Users', awsLink: awsLink },
                      }}
                    >
                      <button
                        className="main-background-color text-white p-2 px-2 regular-mid border-0 align-right"
                        style={{
                          borderRadius: '.25rem',
                        }}
                      >
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="row mx-0 mb-2 px-2">
                  {followedUserGiists ? (
                    followedUserGiists?.items?.map((item) => (
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3 p-1">
                        <UserGiists
                          id={item.id}
                          title={item.title}
                          thumbnail={awsLink + 'giists/images/' + item.thumbnail}
                          created={item.created}
                          avg_rating={item.avg_rating}
                          first_name={item.first_name}
                          last_name={item.last_name}
                          image={item.image}
                          progress={item.progress}
                          language={item.language}
                          userId={item.user_id}
                          favorite={item.favorite}
                          viewsCount={item.viewsCount}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="row pe-sm-0 my-1 px-2">
                      {[1, 2, 3, 4].map(() => (
                        <div className="col-lg-3 col-sm-6 ">
                          <SkeletonLoader height={170} borderRadius="15px" width="100%" />
                          <div className="mt-2 d-flex px-1">
                            <SkeletonLoader height={13} borderRadius="12px" width="50%" />
                          </div>
                          <div className="d-flex mt-1 align-items-center justify-content-between px-1">
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
            {watchedGiists?.totalItems !== 0 ? (
              <div className="col-lg-12 col-md-12 col-sm-12 mb-3 px-2">
                <div className="row mt-4 mb-0">
                  <div className="col-6 ">
                    <p className={`${classes.rowHeading}`}>
                      <a className={`${classes.rowlink}`}>Recently Watched Giists</a>
                    </p>
                  </div>
                  <div className="col-6">
                    <Link
                      href={{
                        pathname: '../kh/ViewAllGiists',
                        query: { name: 'Recently Watched Giists', awsLink: awsLink },
                      }}
                    >
                      <button
                        className="main-background-color text-white p-2 px-2 regular-mid border-0 align-right"
                        style={{
                          borderRadius: '.25rem',
                        }}
                      >
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="row mx-0 mb-2 px-2">
                  {watchedGiists ? (
                    watchedGiists?.items?.map((item) => (
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3 p-1">
                        <UserGiists
                          id={item.id}
                          title={item.title}
                          thumbnail={awsLink + 'giists/images/' + item.thumbnail}
                          created={item.created}
                          avg_rating={item.avg_rating}
                          first_name={item.first_name}
                          last_name={item.last_name}
                          image={item.image}
                          progress={item.progress}
                          language={item.language}
                          userId={item.user_id}
                          favorite={item.favorite}
                          viewsCount={item.viewsCount}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="row pe-sm-0 my-1 px-2">
                      {[1, 2, 3, 4].map(() => (
                        <div className="col-lg-3 col-sm-6 ">
                          <SkeletonLoader height={170} borderRadius="15px" width="100%" />
                          <div className="mt-2 d-flex px-1">
                            <SkeletonLoader height={13} borderRadius="12px" width="50%" />
                          </div>
                          <div className="d-flex mt-1 align-items-center justify-content-between px-1">
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
            {watchAgainGiists?.totalItems !== 0 ? (
              <div className="col-lg-12 col-md-12 col-sm-12 mb-3 px-2">
                <div className="row mt-4 mb-0">
                  <div className="col-6 ">
                    <p className={`${classes.rowHeading}`}>
                      <a className={`${classes.rowlink}`}>Watch Again</a>
                    </p>
                  </div>
                  <div className="col-6">
                    <Link
                      href={{
                        pathname: '../kh/ViewAllGiists',
                        query: { name: 'Watch Again', awsLink: awsLink },
                      }}
                    >
                      <button
                        className="main-background-color text-white p-2 px-2 regular-mid border-0 align-right"
                        style={{
                          borderRadius: '.25rem',
                        }}
                      >
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="row mx-0 mb-2 ">
                  {watchAgainGiists ? (
                    watchAgainGiists?.items?.map((item) => (
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3 p-1">
                        <UserGiists
                          id={item.id}
                          title={item.title}
                          thumbnail={awsLink + 'giists/images/' + item.thumbnail}
                          created={item.created}
                          avg_rating={item.avg_rating}
                          first_name={item.first_name}
                          last_name={item.last_name}
                          image={item.image}
                          progress={item.progress}
                          language={item.language}
                          userId={item.user_id}
                          favorite={item.favorite}
                          viewsCount={item.viewsCount}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="row pe-sm-0 my-1 px-2">
                      {[1, 2, 3, 4].map(() => (
                        <div className="col-lg-3 col-sm-6 ">
                          <SkeletonLoader height={170} borderRadius="15px" width="100%" />
                          <div className="mt-2 d-flex px-1">
                            <SkeletonLoader height={13} borderRadius="12px" width="50%" />
                          </div>
                          <div className="d-flex mt-1 align-items-center justify-content-between px-1">
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                            <SkeletonLoader height={45} borderRadius="100%" width={45} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
     </Layout>
  );
};

export default KnowlegeHome;
