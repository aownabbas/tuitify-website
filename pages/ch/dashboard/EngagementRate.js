import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import Delete from '../../../components/ch/ch_dashboard/Delete';
import CircularProgress from '@mui/material/CircularProgress';
// import dateFormat from "dateformat";
import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Tooltip from '@mui/material/Tooltip';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

//
import Checkbox from '@mui/material/Checkbox';
import COLORS from '../../../public/assets/colors/colors';
import { Kh_EngagementRate } from '../../../redux/actions/Kh_TotalGiistsAction';
import TableLoaders from '../../../components/ch/ch_dashboard/TableLoaders';
import WebPagination from '../../../components/pagination/WebPagination';
import { useRouter } from 'next/router';
import usePagination from '../../../components/pagination/Pagination';
import Link from 'next/link';
import WestIcon from '@mui/icons-material/West';
import GenericTable from '../../../components/combine/GenericTable.js/GenericTable';
import DummyDeleteModal from '../../../components/modals/deletemodal/DummyDeleteModal';
import DotProgress from '../../../components/DotProgress';
import { deleteGiistsAction } from '../../../redux/actions/DeleteDashBoardDataAction';
import { Skeleton } from '@mui/material';
import SuccessModal from '../../../components/modals/simplemodal/SuccessModal';
import Image from 'next/image';

const EngagementRate = () => {
  const khTableData = [
    {
      title: 'Giist Title',
      width: 160,
      id: 'title',
    },
    { title: 'Created On', width: 160, id: 'created' },
    { title: 'Last Engagement', width: 160, id: 'last_engagement' },
    { title: 'Total Interaction', width: 160, id: 'commentsCount' },
    { title: 'Engagement Rate', width: 160, id: 'engagementRate' },
    {
      title: 'Action',
      width: 160,
      id: 'action',
      edit: false,
      // editPath: "/setting/CreatePlatform",
    },
  ];
  const dispatch = useDispatch();

  let [pages, setPages] = useState(1);
  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  const [loading, setLoading] = useState(true);

  const [chGiist, setChGiist] = useState(null);
  const [totalChGiist, settotalChGiist] = useState();
  const [limit, setLimit] = useState(5);
  const [title2, setTitle2] = useState('Engagement Rate');
  const [dotLoading, setDotLoading] = useState(false);
  const [giistId, setGiistId] = useState('');
  const [giistDeleteModal, setGiistsDeleteModal] = useState(false);
  const [search, setSearch] = useState('');
  const [loadings, setLoadings] = useState(true);
  const [showModals, setShowModals] = useState(false);
  const [showModalsError, setShowModalsError] = useState(false);
  const [name, setName] = useState('');
  const [descrip, setDescrip] = useState('');

  console.log('sfnksnjkg', chGiist);

  const [getPlatData, setGetPlatData] = useState('');

  useEffect(() => {
    setLoadings(false);
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetPlatData(GetPlatData);
    return () => {};
  }, []);

  const [downloadCSVData, setDownloadCSVData] = useState([]);

  useEffect(() => {
    // login data
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const kh_params = `limit=${limit}&page=${pages}&platform_id=${selectedPlatform?.platform_id}&search=${search}&interval=${interval}`;
    dispatch(Kh_EngagementRate(kh_params, onGiistEngagementSuccess, onGiistEngagementError));
    //eslint-disable-next-line
  }, [pages, selectedPlatform?.platform_id, limit, search]);

  const handleDownloadCSV = () => {
    const kh_params = `platform_id=${selectedPlatform?.platform_id}&search=${search}&interval=${interval}&noPaginate=1`;
    dispatch(Kh_EngagementRate(kh_params, onDownloadCVSuccess, onDownloadCVSError));
  };

  const onDownloadCVSuccess = (res) => {
    console.log('this response', res);
    setDownloadCSVData(res);
  };
  const onDownloadCVSError = (error) => {
    console.log('this error', error);
  };

  const onGiistEngagementSuccess = (res) => {
    let modifiedDataForTable = res.data;
    let updateArray = modifiedDataForTable?.items.map((item) => {
      return {
        ...item,
        title: item.title,
        created: moment(item.created).format('DD MMMM, YYYY'),
        last_engagement: moment(item.last_engagement).format('DD MMMM, YYYY'),
        commentsCount: item.commentsCount,
        engagementRate: item.engagementRate + ' %',
      };
    });
    modifiedDataForTable.items = updateArray;
    console.log(modifiedDataForTable, 'modifiedDataForTable');

    setChGiist(modifiedDataForTable);
    // settotalChGiist(res?.data?.totalItems);
    setLoading(false);
  };

  const onGiistEngagementError = (err) => {
    console.log('repos', err);
    setLoading(false);
  };

  const [selected, setSelected] = useState([]);
  // hover select and array of selected users code
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const UnPublishOpenModal = (item) => {
    setGiistId(item.id);
    setGiistsDeleteModal(true);
  };
  const UnPublishColseModal = () => setGiistsDeleteModal(false);

  const giistDelete = (giistId) => {
    setDotLoading(true);

    let params = {
      giist_ids: [giistId],
    };
    dispatch(deleteGiistsAction(params, onDeleteGiistSuccess, onDeleteGiistError));
  };

  const onDeleteGiistSuccess = (res) => {
    setDotLoading(false);
    if (res.status == true) {
      setName('Engagement Rate deleted successfully');
      setShowModals(true);
      setDescrip('Your Engagement Rate has been successfully deleted.');
      const kh_params = `limit=${limit}&page=${pages}&platform_id=${selectedPlatform?.platform_id}`;
      dispatch(Kh_EngagementRate(kh_params, onGiistEngagementSuccess, onGiistEngagementError));
    }

    console.log(res.status, 'giist deleted');
  };

  const onDeleteGiistError = (err) => {
    console.log(err, 'giist not deleted');
  };

  let isItemSelected = '';
  let labelId = '';

  const first_name = '';
  const last_name = '';
  const email = '';
  const briff_created_title = '';
  // const

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: COLORS.whiteColor,
            color: 'red',
            border: '1px solid black',
          },
        },
      },
    },
  });

  const router = useRouter();
  const interval = router.query.interval;
  const PER_PAGE = limit;
  var count = Math.ceil(chGiist?.totalItems / PER_PAGE);
  const briifData = usePagination(chGiist?.items, chGiist?.totalItems, PER_PAGE);

  const handlePagination = (e, p) => {
    setPages(p);
    briifData.jump(p);
  };

  const pathOfSlug = router.query.dashboard == 'ch' ? 'dashboard=ch' : 'dashboard=kh';

  return (
    <Layout
      image="/assets/icons/new/back.png"
      dashboard={router.query.dashboard == 'ch' ? 'dashboard=ch' : 'dashboard=kh'}
      heading={router.query.dashboard == 'ch' ? 'Total Briifs Created' : 'Total Engagement Rate'}
      showBriffIcon={router.query.dashboard == 'ch' ? true : false}
      showGiistIcon={router.query.dashboard == 'kh' ? true : false}
      setGetPlatData={setGetPlatData}
    >
      {dotLoading && <DotProgress />}

      {/* <div className="col-12 overflow-auto"> */}

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
        heading="Deleting Engagement Rate"
        text="Are you sure you want to delete this Engagement Rate?"
        // setDotProgressLoading={setDotLoading}
        buttonText1="No"
        buttonText2="Yes"
        handleClick={() => giistDelete(giistId)}
      />
      <div className="col-12">
        <div className="d-flex align-items-center mb-2">
          <Link href={router.query.dashboard !== 'ch' ? `/ch/dashboard/Statistics?${pathOfSlug}` : ''}>
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
            {router.query.dashboard == 'ch' ? 'Total Briifs Created' : 'Total Engagement Rate'}
          </div>
        </div>
        <div className="col-12" style={{ height: '88vh', overflowX: 'hidden', overflowY: 'scroll' }}>
          {false ? (
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
          ) : (
            <>
              <TableContainer component={Paper} checkboxSelection style={{ borderRadius: '15px' }}>
                <Table
                  sx={{ minWidth: 500 }}
                  style={{
                    minWidth: 650,
                    borderCollapse: 'separate',
                    borderSpacing: '0px 12px',
                  }}
                  aria-label="custom pagination table"
                  className="col-12 "
                >
                  {chGiist && (
                    <GenericTable
                      columns={khTableData}
                      data={chGiist}
                      handlePagination={handlePagination}
                      setLimit={setLimit}
                      limit={limit}
                      page={pages}
                      count={count}
                      deleteModal={UnPublishOpenModal}
                      setSearchData={setSearch}
                      searchData={search}
                      title={`Engagement Rate`}
                      value={downloadCSVData}
                      setValue={setDownloadCSVData}
                      handleClick={handleDownloadCSV}
                    />
                  )}
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default EngagementRate;
