import { useEffect, useState } from 'react';
import React from 'react';
import InteractionsDetail from '../../../redux/actions/ds_InteractionsDetail';
import { useDispatch, useSelector } from 'react-redux';
// import Link from "next/link";
import NavigateInteractions from '../../../components/ch/ch_dashboard/NavigateInteractions';
import moment from 'moment';
import Layout from '../../../components/layout/Layout';

import PropTypes from 'prop-types';
// mui libraries
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
// import TableRowsIcon from "@mui/icons-material/TableRows";
import Image from 'next/image';
import Kh_GiistInteractionsAction from '../../../redux/actions/Kh_GiistInteractionsAction';
import usePagination from '../../../components/pagination/Pagination';
import SkeletonLoader from '../../../components/kh_components/kh_home/SkeletonLoader';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WestIcon from '@mui/icons-material/West';
import GenericTable from '../../../components/combine/GenericTable.js/GenericTable';
import DummyDeleteModal from '../../../components/modals/deletemodal/DummyDeleteModal';
import DotProgress from '../../../components/DotProgress';
import {
  deleteBriifComments,
  deleteGiistsCommentAction,
  deleteInteractionsDetail,
  deleteUserCommentsAction,
} from '../../../redux/actions/DeleteDashBoardDataAction';
import { Skeleton } from '@mui/material';
import SuccessModal from '../../../components/modals/simplemodal/SuccessModal';
function TablePaginationActions(props) {
  // pagination
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const BriifsInteractions = (props) => {
  const khTableData = [
    {
      title: 'Giist Title',
      width: 160,
      id: 'tutorial_title',
      id: 'tutorial_title',
    },
    { title: 'Created On', width: 160, id: 'tutorial_created' },
    { title: 'First Name', width: 160, id: 'first_name' },
    { title: 'Last Name', width: 160, id: 'last_name' },
    { title: 'Email', width: 160, id: 'email' },
    { title: 'Interaction Type', width: 160, id: 'type' },
    { title: 'Interaction Text', width: 160, id: 'comment' },
    { title: 'Interacted On', width: 160, id: 'created' },
    {
      title: 'Action',
      width: 160,
      id: 'action',
      edit: false,
    },
  ];
  // Define a reusable function to create table data objects
  function createTableData(title, width, id, options = {}) {
    return { title, width, id, ...options };
  }

  // Define common options for the 'Action' column
  const actionColumnOptions = {
    width: 160,
    id: 'action',
    edit: false,
    // editPath: "/setting/CreatePlatform",
  };

  const router = useRouter();

  const interval = router.query.interval;

  // Define the table data arrays using the reusable function
  const ChTableData = [
    createTableData('Briifs Title', 160, 'Briff_titile'),
    createTableData('Email', 160, 'email'),
    createTableData('Created On', 160, 'creation_date'),
    createTableData('First Name', 160, 'interaction_user_first_name'),
    createTableData('Last Name', 160, 'interaction_user_last_name'),
    createTableData('Email Interactor', 160, 'interaction_user_email'),
    createTableData('Interaction Type', 160, 'type'),
    createTableData('Interacted Text', 160, 'text'),
    createTableData('Interacted On', 160, 'Date_of_interaction'),
    createTableData('Action', 160, 'action', actionColumnOptions),
  ];

  const chTableDataState = [
    createTableData('First Name', 160, 'first_name', { checkBox: true }),
    createTableData('Last Name', 160, 'last_name'),
    createTableData('Email', 160, 'email'),
    createTableData('Briif Title', 160, 'title'),
    createTableData('Video Interactions', 160, 'total_number_of_video'),
    createTableData('Text Interactions', 160, 'total_number_of_text'),
    createTableData('Audio Interactions', 160, 'total_number_of_audio'),
  ];

  const chTableDataDetails = [
    createTableData('First Name', 160, 'first_name', { checkBox: true }),
    createTableData('Last Name', 160, 'last_name'),
    createTableData('Email', 160, 'email'),
    createTableData('Briif Title', 160, 'title'),
    createTableData('Interaction Type', 160, 'type'),
    createTableData('Interacted On', 160, 'created'),
    createTableData('Interaction Text', 160, 'message'),
  ];

  // component stats
  const [over5, setOver5] = useState({
    backgroundColor: '#4E6AFE',
    opactiy: '1',
  });
  const [khGiist, setKhGiist] = useState(null);
  const [CHBriifComment, setCHBriifComment] = useState(null);

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  const dispatch = useDispatch();
  let [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [dotLoading, setDotLoading] = useState(false);
  const [giistDeleteModal, setGiistsDeleteModal] = useState(false);
  const [briifDeleteModal, setBriifDeleteModal] = useState(false);
  const [giistId, setGiistId] = useState('');
  const [briifId, setBriifId] = useState('');
  const [search, setSearch] = useState('');
  const [loadings, setLoadings] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [showModalsError, setShowModalsError] = useState(false);
  const [descrip, setDescrip] = useState('');
  const [name, setName] = useState('');

  const [keyWords, setKeyWords] = useState({ id: 1, value: 'Briifs_interactions_details' });

  const handleCallapi = () => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));

    const params = `limit=${limit}&page=${pages}&keyword=${keyWords.value}&search=${search}&interval=${interval}`;
    const kh_params = `limit=${limit}&page=${pages}&search=${search}&interval=${interval}`;

    if (selectedPlatform?.platform_id) {
      params += `&platform_id=${selectedPlatform.platform_id}`;
      kh_params += `&platform_id=${selectedPlatform.platform_id}`;
      const actionDispatch =
        router.query.dashboard == 'ch'
          ? InteractionsDetail(params, LoginData.access_token, onBriifCommentSuccess, onBriifCommentError)
          : Kh_GiistInteractionsAction(kh_params, LoginData.access_token, onGiistCommentSuccess, onGiistCommentError);
      dispatch(actionDispatch);
    }
  };

  const [DownloadDataCSV, setDownloadDataCSV] = useState([]);

  useEffect(() => {
    // logindata
    handleCallapi();
    return () => {};
    //eslint-disable-next-line
  }, [pages, selectedPlatform?.platform_id, limit, search, keyWords, router.query.dashboard]);

  const handleDownloadCSVData = () => {
    var LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (router.query.dashboard == 'ch') {
      const params = `platform_id=${selectedPlatform?.platform_id}&keyword=${keyWords.value}&noPaginate=1&interval=${interval}`;
      dispatch(InteractionsDetail(params, LoginData.access_token, onDownloadDataSuccess, onDownloadDataError));
    } else {
      const kh_params = `platform_id=${selectedPlatform?.platform_id}&noPaginate=1&interval=${interval}`;
      dispatch(
        Kh_GiistInteractionsAction(kh_params, LoginData.access_token, onDownloadDataSuccess, onDownloadDataError),
      );
    }
  };

  const onDownloadDataSuccess = (res) => {
    console.log('res.data', res);
    setDownloadDataCSV(res.data);
  };

  const onDownloadDataError = (error) => {
    console.log(error);
  };

  const onBriifCommentSuccess = (response) => {
    let modifiedDataForTable = response.data;
    if (keyWords.id == 1) {
      let updateArray = modifiedDataForTable?.items.map((item) => {
        return {
          ...item,
          Briff_titile: item.Briff_titile,
          email: item.email,
          Date_of_interaction: item.Date_of_interaction,
          interaction_user_first_name: item.interaction_user_first_name,
          interaction_user_last_name: item.interaction_user_last_name,
          interaction_user_email: item.interaction_user_email,
          type: item.type,
          text: item.text,
          Date_of_interaction: moment(item.Date_of_interaction).format('DD MMMM, YYYY'),
          creation_date: moment(item.creation_date).format('DD MMMM, YYYY'),
        };
      });
      modifiedDataForTable.items = updateArray;
      setCHBriifComment(modifiedDataForTable);
    } else if (keyWords.id == 2) {
      let updateArray = modifiedDataForTable?.items.map((item) => {
        return {
          ...item,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          total_number_of_video: item.total_number_of_video,
          total_number_of_text: item.total_number_of_text,
          total_number_of_audio: item.total_number_of_audio,
        };
      });
      modifiedDataForTable.items = updateArray;
      setCHBriifComment(modifiedDataForTable);
    } else {
      let updateArray = modifiedDataForTable?.items.map((item) => {
        return {
          ...item,
          Briff_titile: item.Briff_titile,
          email: item.email,
          Date_of_interaction: item.Date_of_interaction,
          interaction_user_first_name: item.interaction_user_first_name,
          interaction_user_last_name: item.interaction_user_last_name,
          interaction_user_email: item.interaction_user_email,
          type: item.type,
          text: item.text,
          created: moment(item.created).format('DD MMMM, YYYY'),
        };
      });
      modifiedDataForTable.items = updateArray;
      setCHBriifComment(modifiedDataForTable);
    }
  };

  const onBriifCommentError = (error) => {
    console.log('error', error);
  };

  const onGiistCommentSuccess = (response) => {
    let modifiedDataForTable = response.data;
    let updateArray = modifiedDataForTable?.items.map((item) => {
      let type =
        item.type === 0 ? 'Video' : item.type === 1 ? 'Audio' : item.type === 2 ? 'Pdf' : item.type === 3 ? 'Text' : '';
      return {
        ...item,
        title: item.tutorial_title,
        created: moment(item.created).format('DD MMMM, YYYY'),
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        type: type,
        comment: item.comment,
      };
    });
    modifiedDataForTable.items = updateArray;

    setKhGiist(modifiedDataForTable);
  };
  const onGiistCommentError = (response) => {
    console.log(response, 'err');
  };

  const PER_PAGE = limit;
  if (router.query.dashboard == 'ch') {
    var count = Math.ceil(CHBriifComment?.totalItems / PER_PAGE);
  } else if (router.query.dashboard == 'kh') {
    var count = Math.ceil(khGiist?.totalItems / PER_PAGE);
  }
  const briifData = usePagination(CHBriifComment?.items, CHBriifComment?.totalItems, PER_PAGE);
  const GiistData = usePagination(khGiist?.items, khGiist?.totalItems, PER_PAGE);

  const handlePagination = (e, p) => {
    setPages(p);
    briifData.jump(p);
    GiistData.jump(p);
  };
  const UnPublishOpenModal = (item) => {
    setGiistId(item.id);
    setGiistsDeleteModal(true);
  };
  const UnPublishColseModal = () => setGiistsDeleteModal(false);

  const giistCommentDelete = (giistId) => {
    setDotLoading(true);

    let params = {
      comment_ids: [giistId],
    };
    dispatch(deleteInteractionsDetail(params, onDeleteInteractionSuccess, onDeleteInteractionError));
  };

  const onDeleteInteractionSuccess = (res) => {
    setDotLoading(false);
    if (res.status == true) {
      setShowModals(true);
      setName(res.message);
      setDotLoading(false);
      setDescrip('Your Comment has been successfully deleted.');
      const newData = khGiist.items.filter((row) => row.id !== giistId);
      setKhGiist((s) => ({ ...s, items: newData }));
    } else if (res.status == false) {
      setName(res.message);
      setShowModalsError(true);
      setDotLoading(false);
    }
  };

  const onDeleteInteractionError = (err) => {
    console.log(err, 'giist not deleted');
  };

  const UnPublishOpenBriifModal = (item) => {
    setBriifId(item);
    setBriifDeleteModal(true);
  };
  const UnPublishColseBriifModal = () => setBriifDeleteModal(false);

  const briifCommentDelete = (briifId) => {
    setDotLoading(true);
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    let params = {
      comment_ids: [briifId.comment_id],
      platform_id: selectedPlatform?.platform_id,
    };
    dispatch(deleteBriifComments(params, onDeleteBriifsSuccess, onDeleteBriifsError));
  };

  const onDeleteBriifsSuccess = (res) => {
    // console.log(res.status, "status");
    setDotLoading(false);
    setShowModals(true);
    setName(res.message);
    setDotLoading(false);
    setDescrip('Your Comment has been successfully deleted.');
  };

  const onDeleteBriifsError = (err) => {
    console.log(err, 'briif not deleted');
    setShowModalsError(true);
    setDotLoading(false);
  };
  return (
    <Layout
      image="/assets/icons/new/back.png"
      heading={router.query.dashboard == 'ch' ? 'Total Briif Interactions' : 'Total Giist Interactions'}
      dashboard={router.query.dashboard == 'ch' ? 'dashboard=ch' : 'dashboard=kh'}
      showBriffIcon={router.query.dashboard == 'ch' ? true : false}
      showGiistIcon={router.query.dashboard == 'kh' ? true : false}
    >
      {dotLoading && <DotProgress />}
      <SuccessModal
        modalOpen={showModals}
        handleModalClose={() => {
          setShowModals(false);
        }}
        image={
          <Image
            src="/assets/images/tick.svg"
            width="65px"
            height="70px"
            alt="alert"
            style={{ borderRadius: '10px' }}
          />
        }
        title={name}
        description={descrip}
        button1={'Okay'}
        // link={'/setting/PlatformSetting'}
        setDotProgressLoading={setDotLoading}
      />
      <SuccessModal
        modalOpen={showModalsError}
        handleModalClose={() => {
          setShowModalsError(false);
        }}
        image={
          <Image
            src="/assets/icons/new/red_alert.svg"
            width="65px"
            height="70px"
            alt="alert"
            style={{ borderRadius: '10px' }}
          />
        }
        title={name}
        description={'Something Went Wrong.'}
        button1={'Okay'}
        // link={'/setting/PlatformSetting'}
        setDotProgressLoading={setDotLoading}
      />
      <DummyDeleteModal
        openModal={giistDeleteModal}
        handleCloseModal={UnPublishColseModal}
        image="/assets/images/trash.svg"
        heading="Deleting Interaction"
        text="Are you sure you want to delete this interaction?"
        buttonText1="No"
        buttonText2="Yes"
        handleClick={() => giistCommentDelete(giistId)}
      />
      <DummyDeleteModal
        openModal={briifDeleteModal}
        handleCloseModal={UnPublishColseBriifModal}
        image="/assets/images/trash.svg"
        heading="Deleting Briif"
        text="Are you sure you want to delete this briif?"
        buttonText1="No"
        buttonText2="Yes"
        handleClick={() => briifCommentDelete(briifId)}
      />
      <div className="col-12 mt-1" style={{ height: '88vh', overflowX: 'hidden', overflowY: 'scroll' }}>
        <div className="d-flex align-items-center mb-3">
          <Link
            href={
              router.query.dashboard == 'ch'
                ? `/ch/dashboard/Statistics?dashboard=ch`
                : '/ch/dashboard/Statistics?dashboard=kh'
            }
          >
            <WestIcon sx={{ height: 24, width: 24, cursor: 'pointer' }} />
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
            {router.query.dashboard == 'ch' ? 'Total Briif Interactions' : 'Total Giist Interactions'}
          </div>
        </div>
        {false ? (
          <>
            <div className="row mb-3" style={{ height: '6%' }}>
              <div className="col-2">
                <SkeletonLoader height="100%" borderRadius="8px" width="99%" />
              </div>
              <div className="col-2">
                <SkeletonLoader height="100%" borderRadius="8px" width="99%" />
              </div>
              <div className="col-2">
                <SkeletonLoader height="100%" borderRadius="8px" width="99%" />
              </div>
            </div>
            <div className="px-1 mt-2">
              {[0, 1, 2, 3, 4, 5, 6].map(() => {
                return (
                  <Skeleton
                    variant="rounded"
                    height={'65px'}
                    style={{
                      marginBottom: '10px',
                      borderRadius: '5px',
                    }}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            {router.query.dashboard == 'ch' && (
              <NavigateInteractions styles={over5} setKeyWords={setKeyWords} keyWords={keyWords} />
            )}
            <TableContainer component={Paper} checkboxSelection>
              <Table
                sx={{ minWidth: 500 }}
                style={{
                  minWidth: 650,
                  borderCollapse: 'separate',
                  borderSpacing: '0px 12px',
                }}
                aria-label="custom pagination table"
              >
                {router.query.dashboard == 'ch'
                  ? CHBriifComment && (
                      <GenericTable
                        columns={
                          keyWords.id == 1 ? ChTableData : keyWords.id == 2 ? chTableDataState : chTableDataDetails
                        }
                        data={CHBriifComment}
                        handlePagination={handlePagination}
                        setLimit={setLimit}
                        limit={limit}
                        page={pages}
                        count={count}
                        deleteModal={UnPublishOpenBriifModal}
                        setSearchData={setSearch}
                        searchData={search}
                        title={`Total Briif Interactions`}
                        value={DownloadDataCSV}
                        actionShow={keyWords.id == 1 ? false : true}
                        handleClick={handleDownloadCSVData}
                        setValue={setDownloadDataCSV}
                      />
                    )
                  : router.query.dashboard == 'kh'
                  ? khGiist && (
                      <GenericTable
                        columns={khTableData}
                        data={khGiist}
                        handlePagination={handlePagination}
                        setLimit={setLimit}
                        limit={limit}
                        page={pages}
                        count={count}
                        deleteModal={UnPublishOpenModal}
                        setSearchData={setSearch}
                        searchData={search}
                        title={`Total Giist Interactions`}
                        value={DownloadDataCSV}
                        handleClick={handleDownloadCSVData}
                        setValue={setDownloadDataCSV}
                      />
                    )
                  : ''}
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </Layout>
  );
};
export default BriifsInteractions;
