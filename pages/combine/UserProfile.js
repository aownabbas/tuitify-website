import { useEffect, useMemo, useState } from 'react';
import Layout from '../../components/layout/Layout';
import UserGiists from '../../components/combine/user_profile/publishedgiists/UserGiists';
import classes from '../../components/combine/user_profile/otheruserprofile/UserProfile.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileAction, { CheckFollowStatus } from '../../redux/actions/UserProfileAction';
import Image from 'next/image';
import WebPagination from '../../components/pagination/WebPagination';
import usePagination from '../../components/pagination/Pagination';
import MyProfileInfo from '../../components/combine/user_profile/myprofile/MyProfileInfo';
import MyProfileEdit from '../../components/combine/user_profile/myprofile/MyProfileEdit';
import UserGroupsAction from '../../redux/actions/UserGroupsAction';
import UserGiistsAction from '../../redux/actions/UserGiistsAction';
import OtherUserDetails from '../../components/combine/user_profile/otheruserprofile/OtherUserDetails';
import OtherUserProfileInfo from '../../components/combine/user_profile/otheruserprofile/OtherUserProfileInfo';
import { withRouter, useRouter } from 'next/router';
import forwardBriif from '../../redux/actions/Forward';
import useOnClickOutside from 'use-onclickoutside';
import { useRef } from 'react';
import moment from 'moment';
import { Box, Rating, Skeleton, Stack, Typography } from '@mui/material';
import ProfileGiistsSearchFilter from '../../redux/actions/ProfileGiistsSearchFilter';
import FilterCategories from '../../redux/actions/FilterCategories';
import SkeletonLoader from '../../components/kh_components/kh_home/SkeletonLoader';
import UserActivitiesAction from '../../redux/actions/UserAcivitiesAction';
import FilterComponent from '../../components/combine/filterComponent/FilterComponent';
import CustomScrollbar from '../../components/combine/CustomScrollbar.js/CustomScrollbar';

const UserProfile = (props) => {
  var otherUserId = props.router.query.user;

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [showMenu, setShowMenu] = useState(false);
  const [follow, setFollow] = useState(false);
  const [getPlatData, setGetPlatData] = useState('');
  const [userGroups, setUserGroups] = useState();
  const [userActivity, setUserActivity] = useState('');
  const [userGiists, setUserGiists] = useState([]);

  const [loginUser, setLoginUser] = useState('');

  const [userProfileDetails, setUserProfileDetails] = useState({
    status: '',
    detail: [],
    tuties: [],
    follow_status: '',
    following: [],
    followers: [],
    message: '',
    userProfile: [],
  });
  const [categoryId, setCategoryId] = useState([]);
  const [selectCats, setSelectCats] = useState('');
  const [otherUser_id, setOtherUser_id] = useState('');
  const [selectCategories, setSelectCategories] = useState([]);

  const { searchInputVal, dateFilter, indexNum } = useSelector((state) => state.user_profile_search_filter);

  const hideFilterPane = useRef();
  useOnClickOutside(hideFilterPane, () => setShowMenu(false));

  const handleCategories = (e, id) => {
    const checked = e.target.checked;
    if (checked) {
      categoryId.push(id);
      setCategoryId([...categoryId]);
    } else {
      for (var i = 0; i <= categoryId.length; i++) {
        if (categoryId[i] == id) {
          categoryId.splice(i, 1);
          setCategoryId([...categoryId]);
        }
      }
    }
  };

  const users_giists = useSelector((state) => state.users_giists);
  const giistsTotalItems = users_giists?.users_giists.totalItems;
  const giistsData = users_giists.users_giists.items;
  const totalItems = giistsData?.length;

  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(giistsTotalItems / PER_PAGE);
  const cardData = usePagination(giistsData, giistsTotalItems, PER_PAGE);
  // this will provide giists data

  const handleChange = (e, p) => {
    setPage(p);
    cardData.jump(p);
  };

  const dispatch = useDispatch();

  //logged in user profile detail edit states

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [description, setDescription] = useState('');

  const [followStatus, setFollowStatus] = useState('');

  //logged in user profile info edit states
  const [profilePic, setProfilePic] = useState('');

  const [mybearerToken, setMyBearerToken] = useState();
  const [rating, setRating] = useState('');
  const [starFilterHandling, setFilterHandling] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [removeFirst, setRemoveFirst] = useState(false);
  const [removeSecond, setRemoveSecond] = useState(false);
  const [inputClick, setInputClick] = useState('');
  const [searchRecord, setSearchRecord] = useState('');

  const [skeletonLoading, setSkeletonLoading] = useState(false);

  const [applyFilter, setApplyFilter] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [loading, setLoading] = useState(false);

  const [hideShowCal, setHideShowCal] = useState(false);
  const clickOutside = useRef(null);
  useOnClickOutside(clickOutside, () => setHideShowCal(false));

  const rateSetting = (e) => {
    setRating(e.target.value);
  };
  const calenderShowHandler = () => {
    setHideShowCal(true);
  };

  // const handleFilter = (e, value, input) => {

  const handleFirstDate = (e) => {
    // setFirstDate(e.target.value);
    setFromDate(e.target.value);
  };
  const handleSecondDate = (e) => {
    // setSecondDate(e.target.value);
    setToDate(e.target.value);
  };

  const firstFormattedDate = fromDate == '' ? '' : moment(fromDate).format('YYYY-MM-DD');
  const secondFormattedDate = toDate == '' ? '' : moment(toDate).format('YYYY-MM-DD');
  const [searchInput, setSearchInput] = useState('');

  console.log(loading, 'from date');
  useEffect(() => {
    setOtherUser_id(otherUserId);
    setLoading(true);
    setSkeletonLoading(true);
    if (otherUserId) {
      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
      setGetPlatData(GetPlatData);
      const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
      setLoginUser(LoginData);
      const bearerToken = LoginData.access_token;
      setMyBearerToken(bearerToken);
      const params = `limit=12&page=1`;
      const userParams = `user_id=${otherUserId}`;
      const usersParams = `limit=12&page=1`;
      const forwardBriifParams = `name=${GetPlatData?.name}&env=${GetPlatData?.env}&platform_id=${GetPlatData?.platform_id}&id=${GetPlatData?.platform_id}&user_id=${loginUser.id}`;
      dispatch(UserProfileAction(userParams, bearerToken, onUserProfileActionSuccess, onUserProfileActionError));
      let paramsFollow = `id=${otherUserId}&myId=${LoginData.id}&platform_id=${GetPlatData?.platform_id}`;
      dispatch(CheckFollowStatus(paramsFollow, onFollowStatusSuccess, onFollowStatusError));
      // Dispatch for groups/users shown in publisher's list
      dispatch(UserGroupsAction(params, onUserGroupsActionSuccess, onUserGroupsActionError));

      dispatch(UserActivitiesAction(usersParams, onUserActivitiesActionSuccess, onUserActivitiesActionError));

      dispatch(forwardBriif(forwardBriifParams, bearerToken, onForwardBriifSuccess, onForwardBriifError));

      const catsParam = `platform_id=${GetPlatData?.platform_id}`;
      dispatch(FilterCategories(catsParam, onCategoriesSuccess, onCategoriesError));
    }
  }, [otherUserId]);

  useEffect(() => {
    if (otherUserId) {
      setSkeletonLoading(true);
      const mygiistsparams = `limit=${PER_PAGE}&page=${page}&search=${searchInput}&fromDate=${firstFormattedDate}&toDate=${secondFormattedDate}&categoryIds=${
        !categoryId.length ? null : `[${categoryId}]`
      }&rating=${rating}&user_id=${otherUserId}&status=${'2'}`;
      dispatch(UserGiistsAction(mygiistsparams, mybearerToken, onUserGiistsActionSuccess, onUserGiistsActionError));
    }
    return () => {};
  }, [otherUserId, page]);

  const [userResponseData, setUserResponseData] = useState({});

  const onFollowStatusSuccess = (res) => {
    setFollowStatus(res.followstatus);
    setLoading(false);
  };

  const onFollowStatusError = (err) => {
    console.log('error', err);
  };

  const onForwardBriifSuccess = (res) => {
    setUserResponseData(res);
    setLoading(false);
  };
  const onForwardBriifError = (err) => {
    console.log(err);
  };

  const fetchGiistBySearch = (searchItem) => {
    setSkeletonLoading(true);
    const mygiistsparams = `limit=${PER_PAGE}&page=${page}&search=${searchItem}&user_id=${otherUserId}&status=${'2'}`;
    dispatch(UserGiistsAction(mygiistsparams, mybearerToken, onUserGiistsActionSuccess, onUserGiistsActionError));
  };

  const handleFilterUser = () => {
    let timerId;
    return (e) => {
      const searchItem = e.target.value;
      setSearchInput(searchItem);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fetchGiistBySearch(searchItem);
      }, 500);
    };
  };

  let searchItems = useMemo(() => handleFilterUser(), []);

  const onUserProfileActionSuccess = (res) => {
    setUserProfileDetails(res);
    setLoading(false);

    console.log(res, 'userProfile');
  };

  const onUserProfileActionError = (err) => {
    console.log(err, 'err');
  };

  const onUserGroupsActionSuccess = (res) => {
    setUserGroups(res);
    console.log(res, 'onUserGroupsActionSuccess');
  };

  const onUserGroupsActionError = (err) => {
    console.log(err);
    console.log(err, 'err');
  };
  const onUserActivitiesActionSuccess = (res) => {
    setUserActivity(res);
    setLoading(false);
    console.log(res, 'onAcitivities');
  };

  const onUserActivitiesActionError = (err) => {
    console.log(err);
    setLoading(false);

    console.log(err, 'err');
  };

  const onUserGiistsActionSuccess = (res) => {
    setUserGiists(res?.items);
    setSkeletonLoading(false);
    console.log(res?.items, 'onUserGiistsActionSuccess');
    setCategoryId([]);
    setSelectCategories([]);
  };

  const onUserGiistsActionError = (err) => {
    setSkeletonLoading(false);
    setCategoryId([]);
    setSelectCategories([]);
    console.log(err);
  };
  function onCategoriesSuccess(res) {
    setSelectCats(res);
    console.log(res, 'the response of ');
  }
  function onCategoriesError(error) {
    console.log(error);
  }

  const handleFilter = () => {
    setSkeletonLoading(true);
    const mygiistsparams = `limit=${PER_PAGE}&page=${page}&search=${searchInput}&fromDate=${firstFormattedDate}&toDate=${secondFormattedDate}&categoryIds=${
      !categoryId.length ? null : `[${categoryId}]`
    }&rating=${rating}&user_id=${otherUserId}&status=${'2'}`;
    dispatch(UserGiistsAction(mygiistsparams, mybearerToken, onUserGiistsActionSuccess, onUserGiistsActionError));
    setClearingFilter(true);
  };

  const handleResetToDefault = () => {
    setSearchInput('');
    setFromDate('');
    setToDate('');
    setCategoryId([]);
    setRating('');
    fetchGiistBySearch((searchInput = ''));
    setClearingFilter(false);
    setPage(1);
  };

  const [clearingFilter, setClearingFilter] = useState(false);

  return (
    // <Fragment>
    <Layout heading="Knowledge Hub">
      <div className=" justify-content-center w-100 mx-auto px-0">
        <div className="w-100 p-0">
          <div>
            <div className="row pe-3 ps-1 gx-0">
              {loading == true ? (
                <div className="col-lg-4 col-12 mb-3 d-flex align-items-center" style={{ flexDirection: 'column' }}>
                  <Skeleton
                    variant="circular"
                    height={160}
                    width={160}
                    style={{ marginRight: '10px', marginTop: '1rem' }}
                  />
                  <Skeleton variant="text" height={60} width={200} style={{ marginRight: '10px' }} />
                  <div className="d-flex ">
                    <Skeleton variant="text" height={70} width={100} style={{ marginRight: '10px' }} />
                    <Skeleton variant="text" height={70} width={100} style={{ marginRight: '10px' }} />
                  </div>
                  <div className="d-flex ">
                    <Skeleton
                      variant="rectangular"
                      height={30}
                      width={80}
                      style={{ marginRight: '25px', marginBottom: '10px' }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={30}
                      width={80}
                      style={{ marginRight: '25px', marginBottom: '10px' }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={30}
                      width={80}
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                    />
                  </div>
                  <Skeleton
                    variant="rectangular"
                    height={150}
                    width={'100%'}
                    style={{ marginRight: '10px', borderRadius: '10px' }}
                  />
                </div>
              ) : (
                <div className="col-lg-4 col-12 ">
                  {otherUserId == loginUser?.id ? (
                    <MyProfileInfo
                      fname={fname}
                      lname={lname}
                      setLname={setLname}
                      setFname={setFname}
                      companyName={companyName}
                      setCompanyName={setCompanyName}
                      department={department}
                      setDepartment={setDepartment}
                      position={position}
                      setPosition={setPosition}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      linkedinUrl={linkedinUrl}
                      setLinkedinUrl={setLinkedinUrl}
                      description={description}
                      setDescription={setDescription}
                      userProfileDetails={userProfileDetails}
                      follow={follow}
                      profilePic={profilePic}
                      setProfilePic={setProfilePic}
                      userGroups={userGroups}
                      userActivity={userActivity}
                      getPlatData={getPlatData}
                      mybearerToken={mybearerToken}
                      setFollow={setFollow}
                      setLoading={setLoading}
                      setUserProfileDetails={setUserProfileDetails}
                      awsLink={awsLink}
                    />
                  ) : (
                    <OtherUserProfileInfo
                      userProfileDetails={userProfileDetails}
                      setFollow={setFollow}
                      followStatus={followStatus}
                      setFollowStatus={setFollowStatus}
                      follow={follow}
                      otherUser_id={otherUser_id}
                      user_id={loginUser?.id}
                      userActivity={userActivity}
                      userGroups={userGroups}
                      getPlatData={getPlatData}
                      setLoading={setLoading}
                      setUserProfileDetails={setUserProfileDetails}
                      awsLink={awsLink}
                    />
                  )}
                </div>
              )}
              <div className="col-lg-8 col-12 px-2 mt-lg-0 mt-3" style={{ height: '87.5vh', overflowY: 'scroll' }}>
                {/* {typeof window != 'undefined' && router.query.user == loginUser.id ? (
                  <div>
                    <MyPublisher
                      userResponseData={userResponseData}
                      userProfileDetails={userProfileDetails}
                      getPlatData={getPlatData}
                      mybearerToken={mybearerToken}
                    />
                  </div>
                ) : (
                  ''
                )} */}
                {loading == true ? (
                  <Skeleton
                    variant="rounded"
                    className="mb-3"
                    height={383}
                    width={'100%'}
                    style={{ borderRadius: '20px' }}
                  />
                ) : (
                  <div className="mb-3">
                    {otherUserId == loginUser?.id ? (
                      <MyProfileEdit
                        fname={fname}
                        lname={lname}
                        setLname={setLname}
                        setFname={setFname}
                        companyName={companyName}
                        setCompanyName={setCompanyName}
                        department={department}
                        setDepartment={setDepartment}
                        position={position}
                        setPosition={setPosition}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        linkedinUrl={linkedinUrl}
                        setLinkedinUrl={setLinkedinUrl}
                        description={description}
                        setDescription={setDescription}
                        profilePic={profilePic}
                        setProfilePic={setProfilePic}
                        userProfileDetails={userProfileDetails}
                        mybearerToken={mybearerToken}
                        onUserGiistsActionSuccess={onUserGiistsActionSuccess}
                        setLoading={setLoading}
                        setUserProfileDetails={setUserProfileDetails}
                      />
                    ) : (
                      <OtherUserDetails
                        userProfileDetails={userProfileDetails}
                        setUserProfileDetails={setUserProfileDetails}
                        setLoading={setLoading}
                      />
                    )}
                  </div>
                )}

                <div className={`${classes.publishedGiistsCard} `}>
                  <div className={`card-body`}>
                    {/* <div className="container"> */}
                    <div className=" d-flex align-items-center justify-content-between ">
                      <div className={`${classes.detailCardTitle} `}>
                        <Link href="../kh/published_giists/PublishedGiists">Published Giists</Link>
                      </div>
                      <div className="d-flex align-items-center">
                        {searchInput.length || clearingFilter ? (
                          <p
                            className={` text-primary `}
                            style={{
                              fontWeight: '500',
                              fontSize: '14px',
                              lineHeight: '18px',
                              marginRight: '1rem',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                            onClick={handleResetToDefault}
                          >
                            Clear filter
                          </p>
                        ) : null}
                        <div className="d-flex align-items-center">
                          <div className={`${classes.emailNow} `}>
                            <input
                              type="text"
                              name="email"
                              className={`${classes.emailInput}`}
                              placeholder="Search category..."
                              onChange={searchItems}
                              onClick={() => dispatch(ProfileGiistsSearchFilter(inputValue, false, 0))}
                              value={searchInput}
                            />
                            <button className={`${classes.emlButton} `} type="submit">
                              <Image
                                src="/assets/img/dropdownSearch.svg"
                                alt="dropdown filter button"
                                height={20}
                                width={20}
                              />
                            </button>
                          </div>
                          <div className="position-relative">
                            <FilterComponent
                              setFromDate={setFromDate}
                              fromDate={fromDate}
                              setToDate={setToDate}
                              toDate={toDate}
                              setFilterCategories={setCategoryId}
                              filterCategories={categoryId}
                              rating={rating}
                              setShowMenu={setShowMenu}
                              setRating={setRating}
                              showMenu={showMenu}
                              handleFilter={handleFilter}
                              handleResetToDefault={handleResetToDefault}
                              selectCategories={selectCategories}
                              setSelectCategories={setSelectCategories}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`row pt-2`}>
                      {skeletonLoading ? (
                        [1, 2].map(() => (
                          <div className="row pe-sm-0 my-1 ">
                            {[1, 2, 3].map(() => (
                              <div className="col-lg-4 col-sm-6 ">
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
                        ))
                      ) : userGiists?.length > 0 ? (
                        userGiists?.map((item) => (
                          <div className={`col-lg-4 col-6 mb-2`}>
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
                              userId={item.user_id}
                              favorite={item.favorite}
                              viewsCount={item.viewsCount}
                            />
                          </div>
                        ))
                      ) : (
                        <div style={{ height: '75vh' }}>
                          <div className="d-flex justify-content-center align-items-center flex-column h-100">
                            <Image
                              src="/assets/images/no-result-found.svg"
                              height={117}
                              width={102}
                              alt="no result found"
                            />
                            <Typography
                              sx={{
                                pt: 2,
                                fontFamily: 'Gilroy-Regular',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                fontSize: '20px',
                                lineHeight: '25px',
                              }}
                            >
                              No Results Found
                            </Typography>
                          </div>
                        </div>
                      )}
                      {userGiists?.length >= 6 && (
                        <div className="row mb-2 mt-4">
                          <div className="d-flex justify-content-center">
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    // </Fragment>
  );
};

export default withRouter(UserProfile);
