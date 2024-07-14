import COLORS from '../../public/assets/colors/colors';
import classes from '../../components/kh_components/search_knowledge/SearchKnowledge.module.css';
import Image from 'next/image';
import { Box, Rating, Typography } from '@mui/material';
import moment from 'moment';
import Calendar from 'react-calendar';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { useRef } from 'react';
import Layout from '../../components/layout/Layout';
import Records from '../../dumData.json';
import { withRouter } from 'next/router';
import Kh_LatestGiistsAction from '../../redux/actions/Kh_LatestGiistsAction';
import { useDispatch } from 'react-redux';
import UserGiists from '../../components/combine/user_profile/publishedgiists/UserGiists';
import WebPagination from '../../components/pagination/WebPagination';
import usePagination from '../../components/pagination/Pagination';
import FilterCategories from '../../redux/actions/FilterCategories';
import PublishedGiistsSkeleton from '../../components/combine/giists_skeleton/PublishedGiistsSkeleton';
import KH_Search from '../../redux/actions/Kh_Search';
import SkeletonLoader from '../../components/kh_components/kh_home/SkeletonLoader';
import { Button, Offcanvas } from 'react-bootstrap';
import SelectedChips from '../../components/kh_components/search_knowledge/SelectedChips';

// import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';

const SearchKnowledge = (props) => {
  const dispatch = useDispatch();

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [userGiists, setUserGiists] = useState(null);
  const [rating, setRating] = useState('');
  const [filterCategories, setFilterCategories] = useState([]);
  console.log(filterCategories, 'filtercategories');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [inputClick, setInputClick] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const [searchInput2, setSearchInput2] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [getPlatData, setGetPlatData] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [selectCats, setSelectCats] = useState();

  const [latestGiists, setLatestGiists] = useState(null);
  const [clearingFilter, setClearingFilter] = useState(false);

  const [skeletonLoading, setSkeletonLoading] = useState(false);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // paginator code
  let [page, setPage] = useState(1);
  const [totalLatestGiist, setTotalLatestGiist] = useState(3);

  const latesGiistItems = latestGiists?.items;
  const latestGiistTotalCount = latestGiists?.totalItems;

  const GiistsItems = userGiists?.items;
  const GiistTotalItemsCount = userGiists?.totalItems;

  const PER_PAGE = 8;
  var count = Math.ceil(latestGiistTotalCount / PER_PAGE);
  var giistsCounted = Math.ceil(GiistTotalItemsCount / PER_PAGE); // it is for local search pagination
  const cardData = usePagination(latesGiistItems, latestGiistTotalCount, PER_PAGE);
  const searchCardData = usePagination(GiistsItems, GiistTotalItemsCount, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    latestGiistTotalCount !== 0 ? cardData.jump(p) : searchCardData.jump(p);
  };

  useEffect(() => {
    // selected giists action
    try {
      const id = JSON.parse(props.router.query.result);
      const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
      const { access_token } = LoginData;
      const params = `page=${page}&limit=${PER_PAGE}&categoryIds=[${id}]`;
      dispatch(Kh_LatestGiistsAction(params, access_token, onlatestGiistsActionSuccess, onlatestGiistsActionError));
    } catch (err) {
      console.log(err);
    }
  }, [page, props.router.query.result]);

  const searchItems = (searchValue) => {
    setSearchInput2(searchValue);
    if (searchInput2 !== '') {
      const filteredData = selectCats?.categories?.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput2.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(selectCats?.categories);
      console.log(filteredResults, 'search input');
    }
  };

  var firstFormattedDate = fromDate == '' ? '' : moment(fromDate).format('YYYY-MM-DD');
  var secondFormattedDate = toDate == '' ? '' : moment(toDate).format('YYYY-MM-DD');

  useEffect(() => {
    setSkeletonLoading(true);
    let getPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    let getLoginData = JSON.parse(localStorage.getItem('@LoginData'));
    setGetPlatData(getPlatData);
    setLoginData(getLoginData);

    const catsParam = `platform_id=${getPlatData?.platform_id}`;
    dispatch(FilterCategories(catsParam, onCategoriesSuccess, onCategoriesError));
    const giistsparams = `limit=${PER_PAGE}&page=${page}&search=${searchInput}&fromDate=${firstFormattedDate}&toDate=${secondFormattedDate}&categoryIds=${
      !filterCategories.length ? null : `[${filterCategories}]`
    }&rating=${rating}`;
    dispatch(KH_Search(giistsparams, onSearchSuccess, onSearchError));
    return () => {};
  }, [page]);

  // filtering code through API
  const handleGiistSearch = (inputFrominputfield) => {
    console.log('inputFrominputfield', inputFrominputfield);
    setSearchInput(inputFrominputfield);

    const giistsparams = `limit=${PER_PAGE}&page=${page}&search=${inputFrominputfield}`;
    console.log(giistsparams, 'all params');
    dispatch(KH_Search(giistsparams, onSearchSuccess, onSearchError));
    console.log('api with category');
  };

  const onSearchSuccess = (res) => {
    setUserGiists(res);
    setSkeletonLoading(false);
    console.log(res?.items, 'onSearchSuccess');
    setSelectCategories([]);
    setIsCheck([]);
    setFilterCategories([]);
  };

  const onSearchError = (err) => {
    console.log(err);
    console.log(err, 'err');
    setSkeletonLoading(false);
  };

  function onCategoriesSuccess(res) {
    setSelectCats(res);
    console.log(res);
  }
  function onCategoriesError(error) {
    setSelectCats(error);
    console.log(error);
  }

  const [selectCategories, setSelectCategories] = useState([]);
  const [isCheck, setIsCheck] = useState([]);
  console.log(selectCategories, 'filterCategories');
  console.log(filterCategories, 'filterCategories');
  const handleCategories = (e, id1, category) => {
    const checked = e.target.checked;
    if (checked) {
      filterCategories.push(id1);
      setFilterCategories([...filterCategories]);
      selectCategories.push(category);
      setIsCheck((prevCategories) => [...prevCategories, id1]);
    } else {
      // Filter out the unchecked category
      const newFilterCategories = filterCategories.filter((catId) => catId !== id1);
      const Categoriesdata = selectCategories.filter((categaries) => categaries.id != id1);
      setFilterCategories(newFilterCategories);
      setSelectCategories(Categoriesdata);
      setIsCheck((prevCategories) => prevCategories.filter((id) => id !== id1));
    }
  };

  // end of filtering code through API

  // selected giists data fetch

  const onlatestGiistsActionSuccess = (res) => {
    setLatestGiists(res);
    console.log(res, 'latestGiists');
  };

  const onlatestGiistsActionError = (err) => {
    console.log(err);
  };

  const [menuShowing, setMenuShowing] = useState(false);
  const clickAside = useRef(null);
  useOnClickOutside(clickAside, () => setMenuShowing(false));

  const [hideShowCal, setHideShowCal] = useState(false);
  const clickOutside = useRef(null);
  useOnClickOutside(clickOutside, () => setHideShowCal(false));

  const calenderShowHandler = () => {
    setHideShowCal(true);
  };

  const fetchGiistBySearch = (searchItem) => {
    const giistsparams = `limit=${PER_PAGE}&page=${page}&search=${searchItem}`;
    dispatch(KH_Search(giistsparams, onSearchSuccess, onSearchError));
  };
  // Giist Search
  const handleFilterUser = () => {
    let timerId;
    return (e) => {
      setSkeletonLoading(true);
      const searchItem = e.target.value;
      setSearchInput(searchItem);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fetchGiistBySearch(searchItem);
      }, 500);
    };
  };

  let searchitem = useMemo(() => handleFilterUser(), []);

  const [selectCategory, setSelectCategory] = useState('');
  const handleCheck = () => {
    const allcategories = dummyData;
    setSelectCategory(allcategories, 'allcategories');
  };
  const rateSetting = (e) => {
    setRating(e.target.value);
  };

  const handleFilter = () => {
    setSkeletonLoading(true);
    const giistsparams = `limit=${PER_PAGE}&page=${page}&search=${searchInput}&fromDate=${firstFormattedDate}&toDate=${secondFormattedDate}${
      filterCategories.length ? `&categoryIds=[${filterCategories}]` : ''
    }&rating=${rating}`;
    dispatch(KH_Search(giistsparams, onSearchSuccess, onSearchError));
    setShowOffcanvas(false);
    setClearingFilter(true);
  };

  const handleResetToDefault = async () => {
    setFromDate('');
    setToDate('');
    setRating('');
    setPage(1);
    setFilterCategories([]);
    setClearingFilter(false);
    fetchGiistBySearch(searchInput);
  };

  // toggleOffcanvas function opening offcanvas/drawer
  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const checkboxRef = useRef(null);
  console.log(checkboxRef, 'checkboxref');
  const handleUncheck = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  const handleCheck1 = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = true;
    }
  };

  return (
    <Layout
      heading="Knowledge Hub"
      setSearchInput={searchitem}
      searchInput={searchInput}
      handleGiistSearch={handleGiistSearch}
    >
      <div
        className="container-fluid"
        style={{ overflowY: 'scroll', maxWidth: '100%', height: '85vh', borderRadius: '15px' }}
      >
        {props.router.query.name !== 'selected Giists' ? (
          <>
            <div className="d-flex justify-content-between mt-4">
              <p className={`${classes.nameRelatedGiistsTxt} d-flex justify-content-center`}>
                Explore Giists Related to: <b>“{searchInput}”</b>
              </p>
              <div className="d-flex justify-content-center ">
                {clearingFilter == true ? (
                  <p
                    className="mt-2 cursor-pointer text-primary"
                    style={{
                      fontWeight: '500',
                      fontSize: '14px',
                      lineHeight: '18px',
                      marginRight: '1rem',
                      textDecoration: 'underline',
                    }}
                    onClick={() => handleResetToDefault()}
                  >
                    Clear Filter
                  </p>
                ) : (
                  <p
                    className="mt-2"
                    style={{ fontWeight: '500', fontSize: '14px', lineHeight: '18px', marginRight: '1rem' }}
                  >
                    Filter By :
                  </p>
                )}
                <button className={`${classes.filterButton}`} type="button" onClick={toggleOffcanvas}>
                  <Image src="/assets/img/searchFilter.svg" alt="search filter" height={35} width={35} />
                </button>
                <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} placement="end">
                  <div className="d-flex justify-content-between p-3 pt-4">
                    <p className={classes.filterByText}>Filters by</p>
                    <p className={classes.resettoDefault} onClick={handleResetToDefault}>
                      Reset to default
                    </p>
                  </div>
                  <Offcanvas.Body>
                    <div className="mb-3">
                      <label className={`${classes.offcanvasLabels} mb-2`}>Date</label>
                      <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            onClick={() => {
                              setInputClick('date1');
                              calenderShowHandler();
                              setFromDate(new Date());
                            }}
                            value={fromDate == '' ? 'Start Date' : moment(fromDate).format('YYYY-MM-DD')}
                            className={`${classes.dateInput} p-3`}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            onClick={() => {
                              setInputClick('date2');
                              calenderShowHandler();
                              setToDate(new Date());
                            }}
                            value={toDate == '' ? 'End Date' : moment(toDate).format('YYYY-MM-DD')}
                            className={`${classes.dateInput} p-3`}
                          />
                        </div>
                      </div>
                    </div>
                    {hideShowCal && (
                      <Box ref={clickOutside} mb={3} style={{ position: 'absolute',zIndex: 10 }}>
                        {inputClick == 'date1' && (
                          <Calendar
                            onChange={inputClick == 'date1' && setFromDate}
                            value={fromDate}
                            prev2Label={null}
                            next2Label={null}
                            nextLabel={
                              <Image
                                src="/assets/icons/new/next_main_color.svg"
                                width="15px"
                                height="15px"
                                alt="back"
                              />
                            }
                            prevLabel={
                              <Image
                                src="/assets/icons/new/previous_main_color.svg"
                                width="15px"
                                height="15px"
                                alt="back"
                              />
                            }
                            className={`text-light filter-calender mt-3 p-3`}
                          />
                        )}
                        {inputClick == 'date2' && (
                          <Calendar
                            onChange={inputClick == 'date2' && setToDate}
                            value={toDate}
                            prev2Label={null}
                            next2Label={null}
                            nextLabel={
                              <Image
                                src="/assets/icons/new/next_main_color.svg"
                                width="15px"
                                height="15px"
                                alt="down"
                              />
                            }
                            prevLabel={
                              <Image
                                src="/assets/icons/new/previous_main_color.svg"
                                width="15px"
                                height="15px"
                                alt="back"
                              />
                            }
                            className="text-light filter-calender mt-3 p-2"
                          />
                        )}
                      </Box>
                    )}

                    <div className={` row mb-4`}>
                      <label className={`${classes.offcanvasLabels} mb-2`} htmlFor="menu">
                        Category
                      </label>
                      <details className={classes.mydropdownMenu}>
                        <summary className={`${classes.mydropdownSummary} p-3`}>Select Category</summary>
                        <ul className={classes.mydropdownList}>
                          <li>
                            <div className={`${classes.emailNow} mb-3`}>
                              <input
                                type="text"
                                name="category_search"
                                className={`${classes.emailInput}`}
                                placeholder="Search category..."
                                onChange={(e) => searchItems(e.target.value)}
                              />
                              <button className={`${classes.emlButton} `} type="submit">
                                <Image
                                  src="/assets/img/dropdownSearch.svg"
                                  alt="dropdown search"
                                  height={20}
                                  width={20}
                                />
                              </button>
                            </div>
                          </li>
                          {filteredResults.length !== 0
                            ? filteredResults.map((category) => (
                                <li key={category.id}>
                                  <div className="px-3">
                                    <label htmlFor={category.id} className="w-100 d-flex justify-content-between">
                                      <div style={{ width: '100%' }}>{category.title}</div>
                                      <input
                                        key={category.id}
                                        id={category.id}
                                        type="checkbox"
                                        name="category"
                                        style={{ width: '18px', height: '18px', marginTop: '3px' }}
                                        onChange={(e) => {
                                          handleCategories(e, category.id, category);
                                        }}
                                        checked={isCheck?.includes(category.id)}
                                      />
                                    </label>
                                  </div>
                                </li>
                              ))
                            : selectCats?.categories?.map((category) => (
                                <li key={category.id}>
                                  <div className="px-3">
                                    <label htmlFor={category.id} className="w-100 d-flex justify-content-between">
                                      <div style={{ width: '100%' }}>{category.title}</div>
                                      <input
                                        key={category.id}
                                        id={category.id}
                                        type="checkbox"
                                        name="category"
                                        style={{ width: '18px', height: '18px', marginTop: '3px' }}
                                        onChange={(e) => {
                                          handleCategories(e, category.id, category);
                                        }}
                                        checked={isCheck?.includes(category.id)}
                                      />
                                    </label>
                                  </div>
                                </li>
                              ))}
                        </ul>
                      </details>
                    </div>

                    {selectCategories.length !== 0 && (
                      <div style={{ height: '220px', overflow: 'scroll' }}>
                        <div className="d-flex" style={{ flexWrap: 'wrap' }}>
                          {selectCategories?.map((item) => (
                            <div className="p-1">
                              <SelectedChips
                                selectCategoryTitle={item.title}
                                categoryId={item.id}
                                categoryData={item}
                                handleCategories={handleCategories}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: '80%', left: '9%' }}>
                    <div className="d-flex justify-content-between ">
                      <label className={`${classes.offcanvasLabels} mb-2`}>Rating</label>
                    </div>
                    <div className="row">
                      <div className="d-flex justify-content-start mb-2">
                        <Rating
                          name="size-large"
                          onChange={rateSetting}
                          value={rating}
                          size="large"
                          sx={{ color: rating == 0 ? '' : `${COLORS.yellowSea}` }}
                        />
                      </div>
                    </div>
                    <div className="row text-center">
                      <button
                        className={`${classes.offcanvasButton} text-reset border-0`}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={() => {
                          handleFilter();
                        }}
                        type="button"
                      >
                        Apply Filter
                      </button>
                    </div>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        <div className="col-lg-12 col-md-12 col-sm-12 ">
          {latesGiistItems && props.router.query.name == 'selected Giists' ? (
            <div className="row">
              {latestGiistTotalCount == 0 ? (
                <div style={{ height: '75vh' }}>
                  <div className="d-flex justify-content-center align-items-center flex-column h-100">
                    <Image src="/assets/images/no-result-found.svg" height={117} width={102} alt="no result found" />
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
              ) : !skeletonLoading ? (
                latesGiistItems?.map((item) => (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3 p-1">
                    <UserGiists
                      id={item.id}
                      title={item.title}
                      thumbnail={`${awsLink}giists/images/${item.thumbnail}`}
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
                <>
                  <PublishedGiistsSkeleton />
                  <PublishedGiistsSkeleton />
                  <PublishedGiistsSkeleton />
                  <PublishedGiistsSkeleton />
                  <PublishedGiistsSkeleton />
                  <PublishedGiistsSkeleton />
                </>
              )}
              {latestGiistTotalCount <= 8 ? (
                ''
              ) : (
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
              )}
            </div>
          ) : (
            <>
              <div className="row">
                {GiistTotalItemsCount == 0 ? (
                  <div style={{ height: '75vh' }}>
                    <div className="d-flex justify-content-center align-items-center flex-column h-100">
                      <Image src="/assets/images/no-result-found.svg" height={117} width={102} alt="no result found" />
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
                ) : !skeletonLoading ? (
                  GiistsItems?.map((card) => (
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3 p-1" key={card.id}>
                      <UserGiists
                        id={card.id}
                        title={card.title}
                        first_name={card.first_name}
                        last_name={card.last_name}
                        avg_rating={card.avg_rating}
                        created={card.created}
                        category={card.category}
                        thumbnail={`${awsLink}giists/images/${card.thumbnail}`}
                        image={card.image}
                        progress={card.progress}
                        language={card.language}
                        favorite={card.favorite}
                        viewsCount={card.viewsCount}
                        userId={card.user_id}
                      />
                    </div>
                  ))
                ) : (
                  [1, 2].map(() => {
                    return (
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
                    );
                  })
                )}
                {GiistTotalItemsCount <= 8 ? (
                  ''
                ) : (
                  <div className="d-flex justify-content-center">
                    <WebPagination
                      handleChange={handleChange}
                      count={giistsCounted}
                      page={page}
                      size="small"
                      shape="rounded"
                      color="primary"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(SearchKnowledge);
