import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import UserGiists from '../../components/combine/user_profile/publishedgiists/UserGiists';
import Link from 'next/link';
import WebPagination from '../../components/pagination/WebPagination';
import { withRouter } from 'next/router';
import { useRouter } from 'next/router';
import Kh_LatestGiistsAction from '../../redux/actions/Kh_LatestGiistsAction';
import { useDispatch } from 'react-redux';
import Kh_followedGiistsAction from '../../redux/actions/Kh_FollowedGiistsAction';
import Kh_WatchedGiistsAction from '../../redux/actions/Kh_WatchedGiistsAction';
import Kh_WatchAgainGiistsAction from '../../redux/actions/Kh_WatchAgainAction';
import SkeletonLoader from '../../components/kh_components/kh_home/SkeletonLoader';
import usePagination from '../../components/pagination/Pagination';
import { TopRatedGiists } from '../../redux/actions/TopRatedGiists';
import WestIcon from '@mui/icons-material/West';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ViewAllGiists = (props) => {
  const router = useRouter();
  // Aws Link
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  const [topRatedGiists, setTopRatedGiists] = useState();
  const [latestGiists, setLatestGiists] = useState();
  const [followedUserGiists, setfollowedUserGiists] = useState();
  const [watchedGiists, setWatchedGiists] = useState();
  const [watchAgainGiists, setWatchAgainGiists] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const { access_token } = LoginData;
    const params = `limit=8&page=${page}`;
    dispatch(TopRatedGiists(params, onTopRatedSuccess, onTopRatedError));
    dispatch(Kh_LatestGiistsAction(params, access_token, onlatestGiistsActionSuccess, onlatestGiistsActionError));
    dispatch(Kh_followedGiistsAction(params, access_token, onfollowedUserGiistsSuccess, onfollowedUserGiistsError));
    dispatch(Kh_WatchedGiistsAction(params, access_token, onWatchedGiistsActionSuccess, onWatchedGiistsActionError));
    dispatch(Kh_WatchAgainGiistsAction(params, access_token, onWatchAgainGiistsSuccess, onWatchAgainGiistsError));
    return () => {};
  }, []);

  const onTopRatedSuccess = (res) => {
    setTopRatedGiists(res.items);
    setTotalTopGiist(res.totalItems);
  };
  const onTopRatedError = (err) => {
    setTopRatedGiists(err);
  };

  const onlatestGiistsActionSuccess = (res) => {
    setLatestGiists(res.items);
    setTotalLatestGiist(res.totalItems);
  };

  const onlatestGiistsActionError = (err) => {
    console.log(err);
  };

  const onfollowedUserGiistsSuccess = (res) => {
    setfollowedUserGiists(res.items);
    setTotalFollowedGiist(res.totalItems);
  };

  const onfollowedUserGiistsError = (err) => {
    console.log(err);
  };

  const onWatchedGiistsActionSuccess = (res) => {
    setWatchedGiists(res.items);
    setTotalRecentlyWatchedGiist(res.totalItems);
  };

  const onWatchedGiistsActionError = (err) => {
    console.log(err);
  };

  const onWatchAgainGiistsSuccess = (res) => {
    setWatchAgainGiists(res.items);
    setTotalWatchAgainGiist(res.totalItems);
  };

  const onWatchAgainGiistsError = (err) => {
    console.log(err);
  };

  // paginator code
  const [totalTopGiist, setTotalTopGiist] = useState(8);
  const [totalLatestGiist, setTotalLatestGiist] = useState(8);
  const [totalFollowedGiist, setTotalFollowedGiist] = useState(8);
  const [totalRecentlyWatchedGiist, setTotalRecentlyWatchedGiist] = useState(8);
  const [totalWatchAgainGiist, setTotalWatchAgainGiist] = useState(8);
  let [page, setPage] = useState(1);

  const PER_PAGE = 8;
  console.log(PER_PAGE, 'PER PAGE');
  if (props.router.query.name == 'Latest Giists') {
    var count = Math.ceil(totalLatestGiist / PER_PAGE);
  } else if (props.router.query.name == 'Top Giists') {
    var count = Math.ceil(totalTopGiist / PER_PAGE);
  } else if (props.router.query.name == 'Followed Users') {
    var count = Math.ceil(totalFollowedGiist / PER_PAGE);
  } else if (props.router.query.name == 'Recently Watched Giists') {
    var count = Math.ceil(totalRecentlyWatchedGiist / PER_PAGE);
  } else {
    var count = Math.ceil(totalWatchAgainGiist / PER_PAGE);
  }
  const topRatedCardData = usePagination(topRatedGiists, totalTopGiist, PER_PAGE);
  const cardData = usePagination(latestGiists, totalLatestGiist, PER_PAGE);
  const followeduserData = usePagination(followedUserGiists, totalFollowedGiist, PER_PAGE);
  const recentlyWatcheduserData = usePagination(watchedGiists, totalRecentlyWatchedGiist, PER_PAGE);
  const watchAgainUserData = usePagination(watchAgainGiists, totalWatchAgainGiist, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    cardData.jump(p);
    followeduserData.jump(p);
    recentlyWatcheduserData.jump(p);
    watchAgainUserData.jump(p);
  };

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const { access_token } = LoginData;
    let params = `limit=8&page=${page}`;
    dispatch(TopRatedGiists(params, onTopRatedSuccess, onTopRatedError));
    dispatch(Kh_LatestGiistsAction(params, access_token, onlatestGiistsActionSuccess, onlatestGiistsActionError));
    dispatch(Kh_followedGiistsAction(params, access_token, onfollowedUserGiistsSuccess, onfollowedUserGiistsError));
    dispatch(Kh_WatchedGiistsAction(params, access_token, onWatchedGiistsActionSuccess, onWatchedGiistsActionError));
    dispatch(Kh_WatchAgainGiistsAction(params, access_token, onWatchAgainGiistsSuccess, onWatchAgainGiistsError));
    return () => {};
  }, [page]);

  return (
    <Layout heading="Knowledge Hub">
      <div
        className="w-100 px-2"
        style={{ overflowY: 'scroll', overflowX: 'hidden', maxWidth: '100%', height: '85vh', borderRadius: '15px' }}
      >
        <div className="col-lg-6 col-12">
          <div className="d-flex align-items-center ">
            <Link href="../../kh/KnowledgeHome">
              {/* <Image src="/assets/icons/new/back-arrow.png" alt="play" width="20px" height="15px" /> */}
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
              Home
            </div>

            <ChevronRightIcon fontSize="small" />
            {/* <Image src="/assets/img/arrow-right.svg" alt="play" width="30px" height="15px" /> */}
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
              {props.router.query.name}
            </div>
          </div>
          <div className="bold mt-2 mb-3">{props.router.query.name}</div>
        </div>
        <div className="row">
          {props.router.query.name == 'Top Giists' && topRatedGiists ? (
            topRatedGiists != [] &&
            topRatedGiists?.map((item) => (
              <div className="col-lg-3 col-sm-6 mb-3 p-1">
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
                  favorite={item.favorite}
                  viewsCount={item.viewsCount}
                  userId={item.user_id}
                />
              </div>
            ))
          ) : props.router.query.name == 'Latest Giists' && latestGiists ? (
            latestGiists != [] &&
            latestGiists?.map((item) => (
              <div className="col-lg-3 col-sm-6 mb-3 p-1">
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
                  favorite={item.favorite}
                  viewsCount={item.viewsCount}
                  userId={item.user_id}
                />
              </div>
            ))
          ) : props.router.query.name == 'Followed Users' && followedUserGiists ? (
            followedUserGiists?.map((item) => (
              <div className="col-lg-3 col-sm-6 mb-3 p-1">
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
                  favorite={item.favorite}
                  viewsCount={item.viewsCount}
                  userId={item.user_id}
                />
              </div>
            ))
          ) : props.router.query.name == 'Recently Watched Giists' && watchedGiists ? (
            watchedGiists?.map((item) => (
              <div className="col-lg-3 col-sm-6 mb-3 p-1">
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
                  favorite={item.favorite}
                  viewsCount={item.viewsCount}
                  userId={item.user_id}
                />
              </div>
            ))
          ) : props.router.query.name == 'Watch Again' && watchAgainGiists ? (
            watchAgainGiists?.map((item) => (
              <div className="col-lg-3 col-sm-6 mb-3 p-1">
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
                  favorite={item.favorite}
                  viewsCount={item.viewsCount}
                  userId={item.user_id}
                />
              </div>
            ))
          ) : (
            <div className="row pe-sm-0 ">
              <div className="col-lg-3 col-sm-6">
                <SkeletonLoader height={130} borderRadius="15px" width="100%" />
                <div className="mt-3">
                  <SkeletonLoader height={10} borderRadius="15px" width="50%" />
                </div>
                <div className="d-flex mt-3">
                  <div className="col-3">
                    <SkeletonLoader height={50} borderRadius="100%" width="70%" />
                  </div>
                  <div className="col-6 mt-2">
                    <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    <div className="mt-3">
                      <SkeletonLoader height={10} borderRadius="15px" width="100%" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="ms-3">
                      <SkeletonLoader height={50} borderRadius="100%" width="93%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <SkeletonLoader height={130} borderRadius="15px" width="100%" />
                <div className="mt-3">
                  <SkeletonLoader height={10} borderRadius="15px" width="50%" />
                </div>
                <div className="d-flex mt-3">
                  <div className="col-3">
                    <SkeletonLoader height={50} borderRadius="100%" width="70%" />
                  </div>
                  <div className="col-6 mt-2">
                    <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    <div className="mt-3">
                      <SkeletonLoader height={10} borderRadius="15px" width="100%" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="ms-3">
                      <SkeletonLoader height={50} borderRadius="100%" width="93%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <SkeletonLoader height={130} borderRadius="15px" width="100%" />
                <div className="mt-3">
                  <SkeletonLoader height={10} borderRadius="15px" width="50%" />
                </div>
                <div className="d-flex mt-3">
                  <div className="col-3">
                    <SkeletonLoader height={50} borderRadius="100%" width="70%" />
                  </div>
                  <div className="col-6 mt-2">
                    <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    <div className="mt-3">
                      <SkeletonLoader height={10} borderRadius="15px" width="100%" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="ms-3">
                      <SkeletonLoader height={50} borderRadius="100%" width="93%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <SkeletonLoader height={130} borderRadius="15px" width="100%" />
                <div className="mt-3">
                  <SkeletonLoader height={10} borderRadius="15px" width="50%" />
                </div>
                <div className="d-flex mt-3">
                  <div className="col-3">
                    <SkeletonLoader height={50} borderRadius="100%" width="70%" />
                  </div>
                  <div className="col-6 mt-2">
                    <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    <div className="mt-3">
                      <SkeletonLoader height={10} borderRadius="15px" width="100%" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="ms-3">
                      <SkeletonLoader height={50} borderRadius="100%" width="93%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-5">
                <SkeletonLoader height={130} borderRadius="15px" width="100%" />
                <div className="mt-3">
                  <SkeletonLoader height={10} borderRadius="15px" width="50%" />
                </div>
                <div className="d-flex mt-3">
                  <div className="col-3">
                    <SkeletonLoader height={50} borderRadius="100%" width="70%" />
                  </div>
                  <div className="col-6 mt-2">
                    <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    <div className="mt-3">
                      <SkeletonLoader height={10} borderRadius="15px" width="100%" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="ms-3">
                      <SkeletonLoader height={50} borderRadius="100%" width="93%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-5">
                <SkeletonLoader height={130} borderRadius="15px" width="100%" />
                <div className="mt-3">
                  <SkeletonLoader height={10} borderRadius="15px" width="50%" />
                </div>
                <div className="d-flex mt-3">
                  <div className="col-3">
                    <SkeletonLoader height={50} borderRadius="100%" width="70%" />
                  </div>
                  <div className="col-6 mt-2">
                    <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    <div className="mt-3">
                      <SkeletonLoader height={10} borderRadius="15px" width="100%" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="ms-3">
                      <SkeletonLoader height={50} borderRadius="100%" width="93%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-5">
                <SkeletonLoader height={130} borderRadius="15px" width="100%" />
                <div className="mt-3">
                  <SkeletonLoader height={10} borderRadius="15px" width="50%" />
                </div>
                <div className="d-flex mt-3">
                  <div className="col-3">
                    <SkeletonLoader height={50} borderRadius="100%" width="70%" />
                  </div>
                  <div className="col-6 mt-2">
                    <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    <div className="mt-3">
                      <SkeletonLoader height={10} borderRadius="15px" width="100%" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="ms-3">
                      <SkeletonLoader height={50} borderRadius="100%" width="93%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-5">
                <SkeletonLoader height={130} borderRadius="15px" width="100%" />
                <div className="mt-3">
                  <SkeletonLoader height={10} borderRadius="15px" width="50%" />
                </div>
                <div className="d-flex mt-3">
                  <div className="col-3">
                    <SkeletonLoader height={50} borderRadius="100%" width="70%" />
                  </div>
                  <div className="col-6 mt-2">
                    <SkeletonLoader height={10} borderRadius="15px" width="80%" />
                    <div className="mt-3">
                      <SkeletonLoader height={10} borderRadius="15px" width="100%" />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="ms-3">
                      <SkeletonLoader height={50} borderRadius="100%" width="93%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="justify-content-center d-flex mt-2 mb-3">
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
    </Layout>
  );
};

export default withRouter(ViewAllGiists);
