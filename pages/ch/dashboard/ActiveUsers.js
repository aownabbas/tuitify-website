import React, { useEffect, useMemo, useState } from 'react';
import { fontSize, margin } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import actionActiveUsers from '../../../redux/actions/ds_ActiveUsers';
import Image from 'next/image';
import Layout from '../../../components/layout/Layout';
import ActiveUserLoader from '../../../components/ch/ch_dashboard/ActiveUserLoader';
import WebPagination from '../../../components/pagination/WebPagination';
import usePagination from '../../../components/pagination/Pagination';
import { useRouter } from 'next/router';
import Link from 'next/link';
import WestIcon from '@mui/icons-material/West';

const ActiveUsers = () => {
  // all states and variables

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [getPlatData, setGetPlatData] = useState({});
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [users, setUsers] = useState(null);

  const [loading, setLoading] = useState(false);

  console.log('loading', loading);

  const dispatch = useDispatch();
  // const { users, loading } = useSelector((state) => state.users);

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const allData = users?.items;
  let [page, setPage] = useState(1);

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetPlatData(GetPlatData);
    const name = GetPlatData.name;
    setName(name);
    return () => {};
  }, []);

  const fetchUsers = (searchItem) => {
    try {
      setLoading(true);
      if (getPlatData) {
        let params = `limit=8&page=${page}&search=${searchItem}&platform_id=${selectedPlatform?.platform_id}&interval=${interval}`;
        dispatch(actionActiveUsers(params, onActiveSuccess, onActiveError));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onActiveSuccess = (res) => {
    setUsers(res);
    setLoading(false);
    console.log(res);
  };
  const onActiveError = (err) => {
    console.log(err);
    setLoading(false);
  };

  useEffect(() => {
    // login and platform data getting
    setLoading(true);

    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const id = LoginData.id;
    setId(id);
    fetchUsers(searchInput);
    // get data redux
    return () => {};

    //eslint-disable-next-line
  }, [page, selectedPlatform?.platform_id]);

  const router = useRouter();

  const interval = router.query.interval;

  console.log(interval, 'the query router');

  const searchItems = () => {
    let timerId;
    return (e) => {
      const searchItem = e.target.value;
      setSearchInput(searchItem);
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fetchUsers(searchItem);
      }, 1000);
    };
  };

  const searchitem = useMemo(() => searchItems(), []);

  const PER_PAGE = 8;
  var count = Math.ceil(users?.totalItems / PER_PAGE);

  const cardData = usePagination(users?.items, users?.totalItems, PER_PAGE);
  const handlePagination = (e, p) => {
    setPage(p);
    cardData.jump(p);
  };

  const pathOfSlug = router.query.dashboard == 'ch' ? 'dashboard=ch' : 'dashboard=kh';

  return (
    <Layout
      image="/assets/icons/new/back.png"
      dashboard={router.query.dashboard == 'ch' ? 'dashboard=ch' : 'dashboard=kh'}
      heading="Active Users"
      showBriffIcon={router.query.dashboard == 'ch' ? true : false}
      showGiistIcon={router.query.dashboard == 'kh' ? true : false}
      setGetPlatData={setGetPlatData}
    >
      <div className="col-12">
        <div className="d-flex align-items-center mb-2">
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
            Total Active Users
          </div>
        </div>
        <div className="col-12 shadow" style={{ height: '84vh', overflowX: 'hidden', overflowY: 'scroll' }}>
          {loading ? (
            <ActiveUserLoader />
          ) : (
            <div className="px-3">
              <div className="row py-2 d-flex align-items-center">
                <div className="col-lg-4 col-md-7 col-sm-7 txtbold">
                  <div className="mrgntp4 ms-2 text-start">
                    Active Users <span className="txt">Total</span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-5 col-12 ms-auto">
                  <div
                    className="border mt-3 me-0 d-flex align-items-center ps-2 searchDashboardUser"
                    style={{ backgroundColor: '#FFF' }}
                  >
                    <Image
                      src="/assets/img/ic_search.svg"
                      alt="search"
                      width="18px"
                      height="18px"
                      style={{ opacity: '0.4' }}
                    />
                    <input
                      style={{
                        border: 'none',
                        fontSize: 'small',
                        marginLeft: '10px',
                        backgroundColor: '#FFF',
                        width: '276px',
                        height: '38px',
                      }}
                      type="text"
                      placeholder="Search user"
                      value={searchInput}
                      onChange={searchitem}
                    />
                  </div>
                </div>
              </div>
              {/* mapping data of active users */}
              <div
                className="col-12 px-0  "
                style={{
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  maxWidth: '100%',
                  height: '90%',
                  padding: '10px',
                }}
              >
                <div className="row px-3">
                  {users?.items.map((items, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-0 text-center" key={index}>
                      <div className="mrgnlft4 ">
                        <div className="box">
                          {/* {getPlatData.link !== undefined && items.image  !== null && */}
                          <Image
                            className="rounded-circle"
                            src={
                              awsLink !== undefined && items.image !== null
                                ? awsLink + 'users/profileImages/' + items.image
                                : '/assets/icons/new/user.svg'
                            }
                            alt="userImage"
                            width="90px"
                            height="90px"
                          />
                          <div className="w-100 text-center mx-auto">
                            <div className="medium-mid-large mrgntp1 text-truncate mx-auto" style={{ width: '200px' }}>
                              {items.first_name} <span className="medium-mid-large">{items.last_name}</span>
                            </div>
                          </div>
                          <div className="text-secondary medium-mid-large">{items.followers} Followers</div>
                          <Link href={`/combine/UserProfile?user=${items.id}`} className="text-white regular-small">
                            <div
                              style={{
                                backgroundColor: '#303548',
                                padding: '8px',
                                margin: '20px',
                                borderRadius: '8px',
                                color: '#FFF',
                                cursor: 'pointer',
                              }}
                            >
                              {' '}
                              View Profile
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex mb-3 justify-content-center">
                <WebPagination
                  handleChange={handlePagination}
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
    </Layout>
  );
};
export default ActiveUsers;
