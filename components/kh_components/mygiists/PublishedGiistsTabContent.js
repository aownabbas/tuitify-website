import UserGiists from '../../combine/user_profile/publishedgiists/UserGiists';
import WebPagination from '../../pagination/WebPagination';
import classes from './PublishedGiists.module.css';
import usePagination from '../../pagination/Pagination';
import { Typography } from '@mui/material';
import Image from 'next/image';
import PublishedGiistsSkeleton from '../../combine/giists_skeleton/PublishedGiistsSkeleton';
import GenericTooltip from '../../ch/GenericTooltip';
import SkeletonLoader from '../kh_home/SkeletonLoader';
import FilterComponent from '../../combine/filterComponent/FilterComponent';

const PublishedGiistsTabContent = ({
  tabTitle,
  fetchedGiistsData,
  setPage,
  PER_PAGE,
  setDotProgressLoading,
  DotProgressLoading,
  page,
  setGiistData,
  skeletonLoading,
  searchitem,
  searchGiist,
  status,
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
  clearingFilter,
  selectCategories,
  setSelectCategories,
}) => {
  const giistsItems = fetchedGiistsData?.items;
  const numberItems = fetchedGiistsData?.totalItems;

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  //   pagination code
  const count = Math.ceil(numberItems / PER_PAGE);
  const cardData = usePagination(giistsItems, numberItems, PER_PAGE);

  console.log('skkskddkdkk', fetchedGiistsData);

  const publishedPaginationHandler = (e, p) => {
    // setPage(p);
    setPage(p);
    cardData.jump(p);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {skeletonLoading ? (
          <div className="mb-4 mt-3">
            <SkeletonLoader height={30} width={220} borderRadius="20px" />
          </div>
        ) : (
          <div>
            <p className={`${classes.detailCardTitle} card-title mb-2 mt-3`}>
              {tabTitle} ({numberItems == 0 || fetchedGiistsData == undefined ? 0 : numberItems})
            </p>
            <p
              style={{
                fontWeight: '300',
                fontSize: '14px',
                lineHeight: '18px',
                color: 'rgba(53, 52, 82, 0.78)',
              }}
              className="mb-2"
            >
              {tabTitle == 'Sent for Publishing'
                ? 'Those Giists are still pending the approval of the publisher'
                : tabTitle == 'Awaiting My Review'
                ? 'Giists awaiting your review'
                : tabTitle == 'Unpublished Giists'
                ? 'These are your Giists that you unpublished'
                : tabTitle == 'Draft Giists'
                ? 'You can publish these giists with your publisher'
                : tabTitle == 'Rejected Giists'
                ? 'These are rejected giists from your publisher'
                : 'These are your Giists that you Published'}
            </p>
          </div>
        )}

        <div className="d-flex align-items-center justify-content-between">
          {searchGiist || clearingFilter ? (
            <p
              className={`${classes.resetDefault} text-primary `}
              style={{
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '18px',
                marginRight: '1rem',
                textDecoration: 'underline',
              }}
              onClick={handleResetToDefault}
            >
              Clear filter
            </p>
          ) : null}
          <div class={`${classes.emailNow} `}>
            <input
              type="text"
              name="text"
              className={`${classes.emailInput}`}
              placeholder="Search Giists by title"
              onChange={searchitem}
              value={searchGiist}
            />
            <div className={`${classes.emlButton}`} type="submit">
              <GenericTooltip
                placement="top"
                title="Search"
                component={<Image src="/assets/img/dropdownSearch.svg" height={24} width={24} alt="dropdownSearch" />}
              />
            </div>
          </div>
          <FilterComponent
            setFromDate={setFromDate}
            fromDate={fromDate}
            setToDate={setToDate}
            toDate={toDate}
            setFilterCategories={setFilterCategories}
            filterCategories={filterCategories}
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
      <div className={classes.contentScroll} style={{ borderRadius: '10px' }}>
        <div className={`row p-2 `}>
          {skeletonLoading ? (
            <>
              <PublishedGiistsSkeleton />
              <PublishedGiistsSkeleton />
              <PublishedGiistsSkeleton />
              <PublishedGiistsSkeleton />
              <PublishedGiistsSkeleton />
              <PublishedGiistsSkeleton />
            </>
          ) : giistsItems?.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center flex-column mt-5 h-100">
              <Image src="/assets/images/no-result-found.svg" height={117} width={102} alt="no result found" />
              <Typography
                sx={{
                  pt: 2,
                  fontFamily: 'Gilroy-Medium',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '25px',
                }}
              >
                No Results Found
              </Typography>
            </div>
          ) : (
            <>
              {giistsItems?.map((dum) => (
                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3" key={dum.id}>
                  <UserGiists
                    id={dum.id}
                    title={dum.title}
                    avg_rating={dum.avg_rating}
                    first_name={dum.first_name}
                    last_name={dum.last_name}
                    thumbnail={awsLink + 'giists/images/' + dum.thumbnail}
                    image={dum.image}
                    created={dum.created}
                    progress={dum.progress}
                    cardModal="publishedGiist"
                    tabTitle={tabTitle}
                    publisherFirstName={dum.publisher_firstName}
                    publisherLastName={dum.publisher_lastName}
                    publisherImage={dum.publisher_image}
                    publisherId={dum.publisher_id}
                    userId={dum.user_id}
                    DotProgressLoading={DotProgressLoading}
                    setDotProgressLoading={setDotProgressLoading}
                    currentStatus={dum.currentStatus}
                    favorite={dum.favorite}
                    rejectionMessage={dum.rejectionMessage}
                    viewsCount={dum.viewsCount}
                    setGiistData={setGiistData}
                    fetchedGiistsData={fetchedGiistsData}
                    page={page}
                    PER_PAGE={PER_PAGE}
                    status={status}
                  />
                </div>
              ))}
            </>
          )}
          {numberItems > 6 && (
            <div className="row mb-2">
              <div className="d-flex justify-content-center">
                <WebPagination
                  handleChange={publishedPaginationHandler}
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
  );
};

export default PublishedGiistsTabContent;
