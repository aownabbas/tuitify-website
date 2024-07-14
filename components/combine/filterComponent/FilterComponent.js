import React, { useRef } from 'react';
import { useState } from 'react';
import { Box, Rating } from '@mui/material';
import Calendar from 'react-calendar';
import classes from '../../kh_components/mygiists/PublishedGiists.module.css';
import Image from 'next/image';
import moment from 'moment';
import useOnClickOutside from 'use-onclickoutside';
import FilterCategories from '../../../redux/actions/FilterCategories';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import SuccessModal from '../../modals/simplemodal/SuccessModal';
import SelectedChips from '../../kh_components/search_knowledge/SelectedChips';

function FilterComponent({
  setFromDate,
  fromDate,
  setToDate,
  toDate,
  setFilterCategories,
  filterCategories,
  rating,
  setRating,
  setShowMenu,
  showMenu,
  handleFilter,
  handleResetToDefault,
  selectCategories,
  setSelectCategories,
}) {
  const [selectCats, setSelectCats] = useState([]);
  const [inputClick, setInputClick] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const hideFilterPaneRef = useRef(null);
  const clickOutsideRef = useRef(null);
  useOnClickOutside(hideFilterPaneRef, () => setShowMenu(false));
  useOnClickOutside(clickOutsideRef, () => setInputClick(''));

  const [loginData, setLoginData] = useState(null);

  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);
  const [successErrorMessage, setSuccessErrorMessage] = useState('');

  const firstDate = moment(fromDate).format('YYYY-MM-DD');
  const secondDate = moment(toDate).format('YYYY-MM-DD');

  const handleOpendModalPublish = ({ heading, message, buttonText, image }) => {
    setSuccessErrorMessage({ heading, message, buttonText, image });
    setModalShowErrorSuccess(true);
  };

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };

  const handleCategories = (e, id, category) => {
    const checked = e.target.checked;
    if (checked) {
      filterCategories.push(id);
      setFilterCategories([...filterCategories]);
      selectCategories.push(category);
    } else {
      // Filter out the unchecked category
      const newFilterCategories = filterCategories.filter((catId) => catId !== id);
      const Categoriesdata = selectCategories.filter((categaries) => categaries.id != id);
      setSelectCategories(Categoriesdata);
      setFilterCategories(newFilterCategories);
    }
  };

  useEffect(() => {
    const PlatformData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    setLoginData(LoginData);
    const catsParam = `platform_id=${PlatformData?.platform_id}`;
    dispatch(FilterCategories(catsParam, onCategoriesSuccess, onCategoriesError));
  }, []);

  function onCategoriesSuccess(res) {
    setSelectCats(res);
  }

  function onCategoriesError(error) {
    setSelectCats(error);
  }

  const [hideShowCal, setHideShowCal] = useState(false);
  const clickOutside = useRef(null);
  useOnClickOutside(clickOutside, () => setHideShowCal(false));
  const calenderShowHandler = () => {
    setHideShowCal(true);
  };

  const rateSetting = (e) => {
    setRating(e.target.value);
  };

  return (
    <div>
      <div className={`${classes.filterButton} ps-2 d-flex align-items-center`} onClick={() => setShowMenu(!showMenu)}>
        <Image
          src="/assets/img/searchFilter.svg"
          height={router.pathname == '/combine/UserProfile' ? 65 : 45}
          width={router.pathname == '/combine/UserProfile' ? 65 : 45}
          alt="searchFilter"
        />
      </div>

      {showMenu ? (
        /**temporariry done because this generic component doest not works same in all components
         * router.pathname == '/combine/UserProfile'
         */
        <div
          className={classes.customList}
          ref={hideFilterPaneRef}
          style={{
            padding: router.pathname == '/combine/UserProfile' ? '1rem' : '',
          }}
        >
          <div className="container-fluid">
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ marginTop: router.pathname == '/combine/UserProfile' ? '' : '1rem' }}
            >
              <p className={classes.filterHeading}>Filters by</p>
              <p className={classes.resetDefault} onClick={handleResetToDefault}>
                Reset to default
              </p>
            </div>
            <div>
              <div className="mb-3">
                <label className={`${classes.offcanvasLabels} mb-2`}>Date</label>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      onClick={() => {
                        setInputClick('date1');
                        calenderShowHandler();
                        setFromDate(new Date());
                      }}
                      value={fromDate == '' ? 'Start Date' : firstDate}
                      className="p-3 col-12 border"
                      style={{ borderRadius: '18px' }}
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
                      value={toDate == '' ? 'End Date' : secondDate}
                      className="p-3 col-12 border"
                      style={{ borderRadius: '18px' }}
                    />
                  </div>
                </div>
              </div>
              {hideShowCal && (
                <Box ref={clickOutsideRef} mb={3} style={{ position: 'absolute',zIndex: 10 }}>
                  {inputClick == 'date1' && (
                    <Calendar
                      onChange={inputClick == 'date1' && setFromDate}
                      value={fromDate}
                      prev2Label={null}
                      next2Label={null}
                      nextLabel={
                        <Image src="/assets/icons/new/next_main_color.svg" width="15px" height="15px" alt="back" />
                      }
                      prevLabel={
                        <Image src="/assets/icons/new/previous_main_color.svg" width="15px" height="15px" alt="back" />
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
                        <Image src="/assets/icons/new/next_main_color.svg" width="15px" height="15px" alt="down" />
                      }
                      prevLabel={
                        <Image src="/assets/icons/new/previous_main_color.svg" width="15px" height="15px" alt="back" />
                      }
                      className="text-light filter-calender mt-3 p-2"
                    />
                  )}
                </Box>
              )}

              <div className={`row mb-1`}>
                <label className={`${classes.offcanvasLabels} mb-2`} htmlFor="menu">
                  Category
                </label>
                <details className={classes.mydropdownMenu}>
                  <summary className={classes.mydropdownSummary}>Select Category</summary>
                  <ul className={classes.mydropdownList}>
                    <li>
                      <div className={`${classes.categorySearchPane} mb-3`}>
                        <input
                          type="email"
                          name="email"
                          className={`${classes.categorySearchInput}`}
                          placeholder="Search category..."
                        />
                      </div>
                    </li>
                    {selectCats?.categories?.map((category) => (
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
                              checked={filterCategories.includes(category.id)}
                            />
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
              {selectCategories.length !== 0 && (
                <div style={{ height: '167px', overflow: 'scroll' }}>
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
              <div style={{ position: 'absolute', top: '75%', left: '5%' }}>
                <div className="d-flex justify-content-between ">
                  <label className={`${classes.offcanvasLabels} mb-1`}>Rating</label>
                  
                </div>
                <div className="row mb-2">
                  <div className="d-flex justify-content-start">
                    <Rating 
                      name="size-large"
                      onChange={rateSetting}
                      value={rating}
                      size="large"
                    />
                  </div>
                </div>
                <div>
                  <button
                    className={`${classes.offcanvasButton} text-reset border-0`}
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={() => {
                      if (secondDate >= firstDate) {
                      setShowMenu(false);
                        handleFilter();
                      } else {
                      setShowMenu(false);
                      handleOpendModalPublish({
                        heading: 'Date Issue',
                        message: `You didn't select valid dates. Please select again.`,
                        buttonText: 'Okay',
                        image: '/assets/icons/danger.svg',
                      });
                    }
                  }}
                    type="button"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
      <SuccessModal
        modalOpen={modalShowErrorSuccess}
        handleModalClose={handleCloseModalPublish}
        image={<Image src={successErrorMessage.image} width="65px" height="70px" alt="alert" />}
        title={successErrorMessage.heading}
        description={successErrorMessage.message}
        button1={successErrorMessage.buttonText}
      />
    </div>
  );
}

export default FilterComponent;
