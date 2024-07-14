import React, { useState, useRef, useEffect } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import Calendar from 'react-calendar';
import styles from './GlobalSearchFilterSidebar.module.scss';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import getPlatformCategories from '../../../redux/actions/GetPlatformCategories';
import moment from 'moment';
import globalSearchApplyFilter from '../../../redux/actions/GlobalSearchApplyFilter';
import Image from 'next/image';
import FilterCategories from '../../../redux/actions/FilterCategories';

const GlobalSearchFilterSidebar = (props) => {
  const dispatch = useDispatch();

  const clickOutside = useRef(null);

  const { indexNum } = useSelector((state) => state.global_search_apply_filter);

  const [firstValue, onChangeFirst] = useState(new Date());
  const [secondValue, onChangeSecond] = useState(new Date());

  const [firstDate, setFirstDate] = useState('');
  const [secondDate, setSecondDate] = useState('');

  const [removeFirst, setRemoveFirst] = useState(false);
  const [removeSecond, setRemoveSecond] = useState(false);

  const { globalSearch } = useSelector((state) => state.global_search);

  useOnClickOutside(clickOutside, () => props.setSidebarOpen('false'));

  //platform id and user id states
  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');

  const [inputClick, setInputClick] = useState('');

  //platform data state
  const [getPlatData, setGetPlatData] = useState('');

  const [getPlatformCategoriesData, setGetPlatformCategoriesData] = useState({
    status: '',
    quiz: [],
  });

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      const platform_id = LoginData.platform_id;
      setPlatformId(platform_id);

      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
      }
      /** this commented code has been removed from swagger
       * new api is /categories
       * =====> need to remove getPlatformCategories action and reducers
       */
      // const params = `name=${GetPlatData.name}&env=${GetPlatData.env}&platform_id=${GetPlatData.platform_id}`;
      // dispatch(getPlatformCategories(params, onGetPlatformCategoriesSuccess, onGetPlatformCategoriesError));
      const catsParam = `platform_id=${GetPlatData?.platform_id}`;
      dispatch(
        FilterCategories(
          LoginData?.access_token,
          catsParam,
          onGetPlatformCategoriesSuccess,
          onGetPlatformCategoriesError,
        ),
      );
    }
    // if (firstValue != '' && removeFirst != true) props.setFromDate(moment(firstValue).format('YYYY-MM-DD'));
    // else props.setFromDate('');

    // if (secondValue != '' && removeSecond != true) props.setToDate(moment(secondValue).format('YYYY-MM-DD'));
    // else props.setToDate('');

    return () => {};
  }, [firstValue, removeFirst, secondValue, removeSecond, dispatch]);

  const onGetPlatformCategoriesSuccess = (res) => {
    setGetPlatformCategoriesData(res);
  };
  const onGetPlatformCategoriesError = (err) => {
    console.log('not ok');
  };

  const handleReset = (e) => {
    setRemoveFirst(true);
    setRemoveSecond(true);
    setInputClick('date1');
  };

  const handleFirstDate = (e) => {
    setFirstDate(e.target.value);
  };

  const handleSecondDate = (e) => {
    setSecondDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
    props.setCategoryId(e.target.value);
  };
  return (
    <>
      <div>
        <div
          ref={clickOutside}
          id="global_search_sidebar"
          className="global_search_filters_sidebar row pt-5"
          style={{ width: props.sidebarOpen == 'true' ? '410px' : '0px' }}
        >
          <div className="col-10 mx-auto">
            <div className="row">
              <div className="col-6 medium-large">Filters by</div>
              <div
                className="col-6 text-decoration-underline light-small"
                onClick={(e) => {
                  handleReset(e);
                }}
              >
                Reset to default
              </div>
            </div>
            <div style={{ opacity: '0.4' }} className="ultralight mt-3">
              Date
            </div>
            <div className="row">
              <div className={`${styles.first_date_filter} col-6 pe-1`}>
                <input
                  type="text"
                  onClick={() => {
                    setInputClick('date1');
                    setRemoveFirst(false);
                  }}
                  onChange={(e) => {
                    handleFirstDate(e);
                  }}
                  value={removeFirst == true ? '' : moment(firstValue).format('D MMM YYYY')}
                  className="p-3 col-12 border"
                  style={{ borderRadius: '18px' }}
                />
              </div>
              <div className={`${styles.first_date_filter} col-6 ps-1`}>
                <input
                  type="text"
                  onClick={() => {
                    setInputClick('date2');
                    setRemoveSecond(false);
                  }}
                  onChange={(e) => {
                    handleSecondDate(e);
                  }}
                  value={removeSecond == true ? '' : moment(secondValue).format('D MMM YYYY')}
                  className="p-3 col-12 border"
                  style={{ borderRadius: '18px' }}
                />
              </div>
            </div>
            <div>
              {inputClick != 'date2' && (
                <Calendar
                  onChange={inputClick == 'date1' && onChangeFirst}
                  onClickDay={() => {
                    setRemoveFirst(false);
                  }}
                  value={firstValue}
                  prev2Label={null}
                  next2Label={null}
                  nextLabel={
                    <Image src="/assets/icons/new/next_main_color.svg" width="20px" height="20px" alt="back" />
                  }
                  prevLabel={
                    <Image src="/assets/icons/new/previous_main_color.svg" width="20px" height="20px" alt="back" />
                  }
                  className="text-light filter-calender mt-3 p-2 semibold"
                />
              )}
              {inputClick == 'date2' && (
                <Calendar
                  onChange={inputClick == 'date2' && onChangeSecond}
                  onClickDay={() => {
                    setRemoveSecond(false);
                  }}
                  value={secondValue}
                  prev2Label={null}
                  next2Label={null}
                  nextLabel={
                    <Image src="/assets/icons/new/next_main_color.svg" width="20px" height="20px" alt="down" />
                  }
                  prevLabel={
                    <Image src="/assets/icons/new/previous_main_color.svg" width="20px" height="20px" alt="back" />
                  }
                  className="text-light filter-calender mt-3 p-2"
                />
              )}
            </div>
            {globalSearch != '' && globalSearch.config != 'undefined' && globalSearch.config?.url.includes('tuties') ? (
              <>
                <div style={{ opacity: '0.4' }} className="ultralight mt-4">
                  Category
                </div>
                <div>
                  <select
                    aria-label="Default select example"
                    className="p-3 col-12 border form-select"
                    style={{ borderRadius: '18px' }}
                    value={props.categoryId}
                    onChange={(e) => {
                      handleCategoryChange(e);
                    }}
                  >
                    <option selected>Select Category</option>
                    {getPlatformCategoriesData.quiz?.map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </>
            ) : (
              ''
            )}
            <div
              className={
                globalSearch != '' && globalSearch.config != 'undefined' && globalSearch.config?.url.includes('tuties')
                  ? 'mt-4'
                  : 'mt-5'
              }
            >
              <button
                className="main-background-color text-white w-100 py-2"
                onClick={(e) => {
                  props.setApplyFilter(true);
                  props.handleGlobalSearchInputChange(e, 'filter', props.inputValue);
                  props.setSidebarOpen('false');
                  dispatch(globalSearchApplyFilter(props.inputValue, true, indexNum));
                }}
                style={{ borderRadius: '14px', border: '2px solid #303548' }}
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalSearchFilterSidebar;
