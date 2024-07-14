import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import TotalBriifsAction from '../../../redux/actions/ds_TotalBriifs';
import Delete from '../../../components/ch/ch_dashboard/Delete';
import CircularProgress from '@mui/material/CircularProgress';
// import dateFormat from "dateformat";
import classes from '../../../components/kh_components/giistcreation/chapters/addchapter/AddChapter.module.css';

import moment from 'moment';
// material ui lib.
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import COLORS from '../../../public/assets/colors/colors';
import Kh_TotalGiistsAction from '../../../redux/actions/Kh_TotalGiistsAction';
import { useRouter } from 'next/router';
import usePagination from '../../../components/pagination/Pagination';
import Link from 'next/link';
import WestIcon from '@mui/icons-material/West';
import GenericTable from '../../../components/combine/GenericTable.js/GenericTable';
import DummyDeleteModal from '../../../components/modals/deletemodal/DummyDeleteModal';
import DotProgress from '../../../components/DotProgress';
import { deleteBriifAction, deleteGiistsAction } from '../../../redux/actions/DeleteDashBoardDataAction';
import { Skeleton } from '@mui/material';
import SuccessModal from '../../../components/modals/simplemodal/SuccessModal';
import Image from 'next/image';

const TotalBriifs = (props) => {
  // all states and variables
  const [mydata, setmydata] = useState({ status: '', message: '' });
  const [params, setParams] = useState();
  const [title, setTitle] = useState('Total Giists Created');
  const [title2, setTitle2] = useState('Total Briif Created');

  const dispatch = useDispatch();
  const router = useRouter();

  const interval = router.query.interval;

  // table header array

  const khTableData = [
    {
      title: 'First Name',
      width: 160,
      id: 'first_name',
    },
    { title: 'Last Name', width: 160, id: 'last_name' },
    { title: 'Email', width: 160, id: 'email' },
    { title: 'Giist Title', width: 160, id: 'title' },
    { title: 'Total Interaction', width: 160, id: 'status' },
    { title: 'Created On', width: 160, id: 'created' },
    {
      title: 'Action',
      width: 160,
      id: 'action',
      edit: false,
      seen: true,
      // editPath: "/setting/CreatePlatform",
    },
  ];

  const chTableData = [
    {
      title: 'First Name',
      width: 160,
      id: 'first_name',
      checkBox: true,
    },
    { title: 'Last Name', width: 160, id: 'last_name' },
    { title: 'Email', width: 160, id: 'email' },
    { title: 'Briif Created Title', width: 160, id: 'Briff_created_titile' },
    {
      title: 'Total Interaction',
      width: 160,
      id: 'total_number_of_interations',
    },
    { title: 'Created On', width: 160, id: 'Date_of_creation' },
    {
      title: 'Action',
      width: 160,
      id: 'action',
      edit: false,
      // editPath: "/setting/CreatePlatform",
    },
  ];
  const { kh_totalgiist, loading1 } = useSelector((state) => state.kh_totalgiist);

  console.log(kh_totalgiist, 'updateArray');
  let [pages, setPages] = useState(1);
  const [chGiist, setChGiist] = useState([]);
  const [KhGiists, setKhGiists] = useState([]);
  console.log(chGiist, 'chGiist');
  const [totalChGiist, settotalChGiist] = useState();
  const [token, setToken] = useState();
  const [limit, setLimit] = useState(5);
  const [giistDeleteModal, setGiistsDeleteModal] = useState(false);
  const [briifDeleteModal, setBriifDeleteModal] = useState(false);
  const [dotLoading, setDotLoading] = useState(false);
  const [giistId, setGiistId] = useState('');
  const [briifId, setBriifId] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [showModalsError, setShowModalsError] = useState(false);
  const [name, setName] = useState('');
  const [descrip, setDescrip] = useState('');
  const [UnPublishGiistOnEditModal, setUnPublishGiistOnEditModal] = useState(false);
  const [giiistId, setGiiistId] = useState('');

  console.log(briifId, 'briifId');

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);
  const [downloadCVSData, setDownloadCVSData] = useState([]);

  const [getPlatData, setGetPlatData] = useState('');

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetPlatData(GetPlatData);
    return () => {};
  }, []);

  const handleApiCall = () => {
    const loginData = JSON.parse(localStorage.getItem('@LoginData'));
    const params = `limit=${limit}&page=${pages}&search=${search}&keyword=${`all_briffs_created`}&interval=${interval}`;
    const khParams = `limit=${limit}&page=${pages}&search=${search}&interval=${interval}`;

    if (selectedPlatform?.platform_id) {
      params += `&platform_id=${selectedPlatform.platform_id}`;
      khParams += `&platform_id=${selectedPlatform.platform_id}`;
      setParams(params);
      setToken(loginData.access_token);

      const actionDispatch =
        router.query.dashboard == 'ch'
          ? TotalBriifsAction(params, loginData.access_token, onTotBriifSuccess, onTotBriifError)
          : Kh_TotalGiistsAction(khParams, loginData.access_token, onTotGiistSuccess, onTotGiistError);

      dispatch(actionDispatch);
    }
  };

  useEffect(() => {
    // Fetch data based on dependencies
    handleApiCall();

    // Cleanup function (if needed)
    return () => {
      // Perform any necessary cleanup here
    };
  }, [pages, selectedPlatform?.platform_id, limit, search, router.query.dashboard]);

  const handleDownloadData = () => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (router.query.dashboard == 'ch') {
      const params = `keyword=all_briffs_created&platform_id=${selectedPlatform?.platform_id}&noPaginate=1&interval=${interval}`;
      dispatch(
        TotalBriifsAction(params, LoginData.access_token, onTotBriifGiistSuccessDownload, onTotBriifGiistErrorDownload),
      );
    } else {
      const kh_params = `platform_id=${selectedPlatform?.platform_id}&noPaginate=1&interval=${interval}`;
      dispatch(
        Kh_TotalGiistsAction(
          kh_params,
          LoginData.access_token,
          onTotBriifGiistSuccessDownload,
          onTotBriifGiistErrorDownload,
        ),
      );
    }
  };

  const onTotBriifGiistSuccessDownload = (res) => {
    console.log('this download res', res);

    setDownloadCVSData(res);
  };
  const onTotBriifGiistErrorDownload = (error) => {
    console.log('erroo Dashboard Downlaod', error);
  };

  // const myfun = () => {
  //   console.log('hlw');
  //   const params = `limit=10&page=${pages}&keyword=all_briffs_created&platform_id=${selectedPlatform?.platform_id}`;
  //   dispatch(TotalBriifsAction(params, token, onTotBriifSuccess, onTotBriifError));
  //   const kh_params = `limit=10&page=${pages}&platform_id=${selectedPlatform?.platform_id}`;
  //   dispatch(Kh_TotalGiistsAction(kh_params, token));
  // };
  // const onsuccess = (response) => {
  //   setmydata(response.data);
  // };

  const onTotGiistSuccess = (res) => {
    setLoading(false);
    let modifiedDataForTable = res.data;
    let updateArrays = modifiedDataForTable?.items.map((item) => {
      return {
        ...item,
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        title: item.title,
        status: item.status,
        created: moment(item.created).format('DD MMMM, YYYY'),
      };
    });
    modifiedDataForTable.items = updateArrays;
    setKhGiists(modifiedDataForTable);
  };
  const onTotGiistError = (error) => {
    console.log('error Giist', error);
    setLoading(false);
  };
  const onTotBriifSuccess = (res) => {
    setLoading(false);
    let modifiedDataForTable = res;
    let updateArrays = modifiedDataForTable?.items.map((item) => {
      return {
        ...item,
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        Briff_created_titile: item.Briff_created_titile,
        total_number_of_interations: item.total_number_of_interations,
        Date_of_creation: moment(item.Date_of_creation).format('DD MMMM, YYYY'),
      };
    });
    console.log(modifiedDataForTable, 'updateArrays');

    modifiedDataForTable.items = updateArrays;

    setChGiist(modifiedDataForTable);
    // setChGiist(res.items);
    // settotalChGiist(res.totalItems);
  };
  const onTotBriifError = (res) => {
    console.log(res);
    setLoading(false);
  };

  const [selected, setSelected] = useState([]);
  console.log(selected, 'ids');
  // hover select and array of selected users code
  const handleClick = (event, name) => {
    console.log('name', name);
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

  let isItemSelected = '';
  let labelId = '';

  const first_name = '';
  const last_name = '';
  const email = '';
  const briff_created_title = '';
  // const

  const unPublishEditModalOpen = (item) => {
    setUnPublishGiistOnEditModal(true);
    setGiiistId(item.id);
    // handleCLick2(item)
  };

  const unPublishEditModalClose = () => setUnPublishGiistOnEditModal(false);

  const handleCLick2 = async (giiistId) => {
    setDotLoading(true);

    await router.push({
      pathname: '/kh/GiistCreation',
      query: {
        mode: 'edit',
        id: giiistId,
      },
    });
  };

  const UnPublishOpenModal = (item) => {
    setGiistId(item.id);
    setGiistsDeleteModal(true);
  };

  const briifOpenModal = (item) => {
    setBriifId(item.id);
    setBriifDeleteModal(true);
  };

  const UnPublishColseModal = () => setGiistsDeleteModal(false);

  const briifColseModal = () => setBriifDeleteModal(false);

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
      setName(res.message);
      setShowModals(true);
      setDescrip('Your Giist has been successfully deleted.');
      const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
      const kh_params = `limit=${limit}&page=${pages}&platform_id=${selectedPlatform?.platform_id}&search=${search}`;
      dispatch(Kh_TotalGiistsAction(kh_params, LoginData.access_token));
      setDotLoading(false);
    } else if (res.status == false) {
      setName(res.message);
      setShowModalsError(true);
      setDotLoading(false);
    }
  };

  const onDeleteGiistError = (err) => {};

  const briifDelete = (briifId) => {
    setDotLoading(true);

    let params = {
      briff_ids: [briifId],
      platform_id: selectedPlatform?.platform_id,
    };
    dispatch(deleteBriifAction(params, onDeleteBriifSuccess, onDeleteBriifError));
  };

  const onDeleteBriifSuccess = (res) => {
    setDotLoading(false);
    if (res.status == true) {
      setName(res.message);
      setShowModals(true);
      setDotLoading(false);
      setDescrip('Your Briif has been successfully deleted.');

      const newData = chGiist.items.filter((row) => row.id !== briifId);
      setChGiist((s) => ({ ...s, items: newData }));
    } else if (res.status == false) {
      setName(res.message);
      setShowModalsError(true);
      setDotLoading(false);
    }
  };

  const onDeleteBriifError = (err) => {
    console.log(err, 'giist not deleted');
  };

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

  const PER_PAGE = limit;
  if (router.query.dashboard == 'ch') {
    var count = Math.ceil(chGiist.totalItems / PER_PAGE);
  } else if (router.query.dashboard == 'kh') {
    var count = Math.ceil(KhGiists?.totalItems / PER_PAGE);
  }

  const briifData = usePagination(chGiist.items, totalChGiist, PER_PAGE);
  const GiistData = usePagination(KhGiists?.items, KhGiists?.totalItems, PER_PAGE);

  const handlePagination = (e, p) => {
    setPages(p);
    briifData.jump(p);
    GiistData.jump(p);
  };

  const pathOfSlug = router.query.dashboard == 'ch' ? 'dashboard=ch' : 'dashboard=kh';

  console.log(pathOfSlug, 'router.query.dashboard');

  const giistView = (item) => {
    setDotLoading(true);
    router.push({
      pathname: '/kh/published_giists/PlayGiistsVideo',
      query: { id: item.id },
    });
  };

  return (
    <Layout
      image="/assets/icons/new/back.png"
      dashboard={router.query.dashboard == 'ch' ? 'dashboard=ch' : 'dashboard=kh'}
      heading={router.query.dashboard == 'ch' ? 'Total Briifs Created' : 'Total Giists Created'}
      showBriffIcon={router.query.dashboard == 'ch' ? true : false}
      showGiistIcon={router.query.dashboard == 'kh' ? true : false}
      setGetPlatData={setGetPlatData}
      getPlatData={getPlatData}
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
      <DummyDeleteModal
        openModal={UnPublishGiistOnEditModal}
        handleCloseModal={unPublishEditModalClose}
        image="/assets/images/edit-3.svg"
        heading="Editing Giist"
        text="Are you sure you want to edit this giist? By editing, this giist will get unpublished"
        buttonText1="No"
        buttonText2="Edit"
        handleClick={() => handleCLick2(giiistId)}
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
        heading="Deleting Giist"
        text="Are you sure you want to delete this giist?"
        buttonText1="No"
        buttonText2="Yes"
        handleClick={() => giistDelete(giistId)}
      />
      <DummyDeleteModal
        openModal={briifDeleteModal}
        handleCloseModal={briifColseModal}
        image="/assets/images/trash.svg"
        heading="Deleting Briif"
        text="Are you sure you want to delete this briif?"
        buttonText1="No"
        buttonText2="Yes"
        handleClick={() => briifDelete(briifId)}
      />
      <div className={`col-12 `}>
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
            {router.query.dashboard == 'ch' ? 'Total Briifs Created' : 'Total Giists Created'}
          </div>
        </div>
        {loading ? (
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
            <TableContainer
              component={Paper}
              // className={`${classes.contentScroll}`}
              checkboxSelection
              style={{ borderRadius: '15px' }}
            >
              <Table
                style={{
                  borderCollapse: 'separate',
                  borderSpacing: '0px 12px',
                  borderRadius: '0px',
                }}
                aria-label="custom pagination table"
              >
                {/* table heading */}

                {router.query.dashboard == 'ch'
                  ? chGiist && (
                      <GenericTable
                        columns={chTableData}
                        data={chGiist}
                        handlePagination={handlePagination}
                        setLimit={setLimit}
                        limit={limit}
                        page={pages}
                        count={count}
                        deleteModal={briifOpenModal}
                        setSearchData={setSearch}
                        searchData={search}
                        title={`Total Briif Created`}
                        value={downloadCVSData}
                        setValue={setDownloadCVSData}
                        handleClick={handleDownloadData}
                      />
                    )
                  : router.query.dashboard == 'kh'
                  ? KhGiists && (
                      <GenericTable
                        columns={khTableData}
                        data={KhGiists}
                        handlePagination={handlePagination}
                        setLimit={setLimit}
                        limit={limit}
                        page={pages}
                        count={count}
                        deleteModal={UnPublishOpenModal}
                        handleCLick2={unPublishEditModalOpen}
                        view={giistView}
                        setSearchData={setSearch}
                        searchData={search}
                        title={`Total Giists Created`}
                        value={downloadCVSData}
                        handleClick={handleDownloadData}
                        setValue={setDownloadCVSData}
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
export default TotalBriifs;
