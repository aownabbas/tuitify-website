import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionLiveSessions from '../../../redux/actions/ds_LiveSessions';
// material ui lib..
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Layout from '../../../components/layout/Layout';
import usePagination from '../../../components/pagination/Pagination';
import GenericTable from '../../../components/combine/GenericTable.js/GenericTable';
import { Skeleton } from '@mui/material';
import DummyDeleteModal from '../../../components/modals/deletemodal/DummyDeleteModal';
import { deleteMeetingAction } from '../../../redux/actions/DeleteDashBoardDataAction';
import DotProgress from '../../../components/DotProgress';
import Link from 'next/link';
import { useRouter } from 'next/router';
import WestIcon from '@mui/icons-material/West';

const LiveSessions = (props) => {
  const router = useRouter();

  const interval = router.query.interval;

  const khTableData = [
    {
      title: 'Host',
      width: 160,
      id: 'user_name',
      img: true,
    },
    { title: 'Title', width: 160, id: 'title' },
    { title: 'Time Duration', width: 160, id: 'duration' },
    { title: 'No. of Attendies', width: 160, id: 'views' },
    {
      title: 'Action',
      width: 160,
      id: 'action',
      edit: false,
      // editPath: "/setting/CreatePlatform",
    },
  ];
  // all states and variables
  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);
  const { liveusers, loading } = useSelector((state) => state.liveusers);
  const [LiveSeations, setLiveSeations] = useState(null);
  console.log(liveusers, 'livessss');
  const dispatch = useDispatch();
  const [getPlatData, setGetPlatData] = useState({});
  let [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(5);

  const [title2, setTitle2] = useState('Live Sessions');

  const params = `limit=10&page=${pages}&platform_id=${getPlatData.platform_id}`;

  const [token, setToken] = useState();
  const [search, setSearch] = useState('');
  const [loadings, setLoadings] = useState(true);

  useEffect(() => {
    // platform data
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    setToken(LoginData.access_token);
    setGetPlatData(GetPlatData);

    const params = `limit=${limit}&page=${pages}&platform_id=${selectedPlatform?.platform_id}&search=${search}&interval=${interval}`;

    dispatch(ActionLiveSessions(params, LoginData.access_token, onLiveSeactionSuccess, onLiveSeactionError));

    //eslint-disable-next-line
  }, [pages, limit, search, selectedPlatform?.platform_id]);

  const [DownloadDataCSV, setDownloadDataCSV] = useState([]);
  const onLiveSeactionSuccess = (res) => {
    console.log('this Response', res);
    let modifiedDataForTable = res.meetings;
    let updateArray = modifiedDataForTable?.items.map((item) => {
      return {
        ...item,
        user_name: item.user_name,
        image: item.avatar ? `users/profileImages/${item.avatar}` : '',
        title: item.title,
        duration: item.duration == null ? '0 minute' : item.duration,
        views: item.views,
      };
    });
    modifiedDataForTable.items = updateArray;
    console.log(modifiedDataForTable, 'modifiedDataForTable');

    setLiveSeations(modifiedDataForTable);
  };
  const onLiveSeactionError = (error) => {
    console.log('error', error);
  };
  const myfun = () => {
    dispatch(ActionLiveSessions(params, token));
  };

  const handleDownloadCSV = () => {
    const params = `&noPaginate=1&limit=${limit}&page=${pages}&platform_id=${selectedPlatform?.platform_id}&search=${search}&interval=${interval}`;
    dispatch(ActionLiveSessions(params, '', onLiveSeactionDownloadCSVSuccess, onLiveSeactionDownloadCSVError));
  };
  const onLiveSeactionDownloadCSVSuccess = (res) => {
    console.log('this Response Downlaod', res);
    setDownloadDataCSV(res);
  };
  const onLiveSeactionDownloadCSVError = (error) => {
    console.log('this Error Downlaod', error);
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

  let isItemSelected = '';
  let labelId = '';

  const PER_PAGE = limit;
  var count = Math.ceil(LiveSeations?.totalItems / PER_PAGE);

  const liveSessions = usePagination(LiveSeations?.items, LiveSeations?.totalItems, PER_PAGE);
  // console.log(liveSessions.currentData(), 'hle');

  const handlePagination = (e, p) => {
    setPages(p);
    liveSessions.jump(p);
  };

  const [liveSeassionModal, setLiveSessionModal] = useState(false);
  const [liveSeassionId, setLiveSessionId] = useState('');
  const [dotLoading, setDotLoading] = useState(false);

  const UnPublishOpenModal = (item) => {
    console.log(item.id, 'ddddd');
    setLiveSessionId(item.id);
    setLiveSessionModal(true);
  };

  const UnPublishColseModal = () => setLiveSessionModal(false);

  const deleteMeeting = (liveSeassionId) => {
    setDotLoading(true);

    const params = `platform_id=${selectedPlatform?.platform_id}&go_live_id=${[liveSeassionId]}&interval=${interval}`;

    dispatch(deleteMeetingAction(params, onDeleteMeetingSuccess, onDeleteMeetingError));
  };

  const onDeleteMeetingSuccess = (res) => {
    setDotLoading(false);
    if (res.status == true) {
      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
      const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
      setToken(LoginData.access_token);
      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
        const params = `limit=${limit}&page=${pages}&platform_id=${selectedPlatform?.platform_id}&interval=${interval}`;
        dispatch(ActionLiveSessions(params, LoginData.access_token));
      }
    }

    console.log(res.status, 'giist deleted');
  };

  const onDeleteMeetingError = (err) => {
    console.log(err, 'giist not deleted');
  };

  return (
    <Layout
      image="/assets/icons/new/back.png"
      heading="Total Live Sessions"
      dashboard="dashboard=ch"
      showBriffIcon={true}
    >
      {dotLoading && <DotProgress />}

      <DummyDeleteModal
        openModal={liveSeassionModal}
        handleCloseModal={UnPublishColseModal}
        image="/assets/images/trash.svg"
        heading="Deleting Live session"
        text="Are you sure you want to delete this live session?"
        buttonText1="No"
        buttonText2="Yes"
        handleClick={() => deleteMeeting(liveSeassionId)}
      />
      <div className="col-12 overflow-auto " style={{ height: '100%', overflowX: 'hidden', overflowY: 'scroll' }}>
        <div className="d-flex align-items-center mb-3">
          <Link href={`/ch/dashboard/Statistics?dashboard=ch`}>
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
            {'Total Live Seassion'}
          </div>
        </div>
        <>
          <TableContainer component={Paper} style={{ borderBottom: 'none' }}>
            {/* <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center txtbold ">
                  <div className="mrgntp4 ms-2">
                    Live Sessions <span className="txt"> .10 Total</span>
                  </div>
                </div>
              </div> */}
            <Table
              sx={{ minWidth: 500 }}
              style={{
                minWidth: 650,
                borderCollapse: 'separate',
                borderSpacing: '0px 12px',
              }}
              aria-label="custom pagination table"
            >
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
                <GenericTable
                  columns={khTableData}
                  data={LiveSeations}
                  handlePagination={handlePagination}
                  setLimit={setLimit}
                  limit={limit}
                  page={pages}
                  count={count}
                  deleteModal={UnPublishOpenModal}
                  setSearchData={setSearch}
                  searchData={search}
                  title={title2}
                  value={DownloadDataCSV}
                  setValue={setDownloadDataCSV}
                  handleClick={handleDownloadCSV}
                />
              )}
            </Table>
          </TableContainer>
        </>
      </div>
    </Layout>
  );
};
export default LiveSessions;
