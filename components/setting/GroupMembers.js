import classes from './Setting.module.css';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import GroupDataTable from './table/GroupDataTable';
import forwardBriif from '../../redux/actions/Forward';
import { useDispatch, useSelector } from 'react-redux';
import EditModal from './EditModal';
import { Skeleton } from '@mui/material';

const GroupMember = ({ setShowSecondComponent, group, setDotLoading, setSuccessModal }) => {
  const [confirmGroup, setConfirmGroup] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);
  const [selected, setSelected] = useState([]);
  const [limit, setLimit] = useState(5);

  console.log('users', users);

  const items = [
    { label: 'Name', value: 'name/email' },
    { label: 'Department', value: 'department' },
    { label: 'Company Name', value: 'company' },
  ];

  var PER_PAGE = limit;
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [keywords, setKeywords] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const getLoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const params = `limit=${limit}&platform_id=${selectedPlatform?.platform_id}&search=${search}&keyword=${keywords}&page=${page}`;
    dispatch(forwardBriif(params, getLoginData?.token, onForwardBriifSuccess, onForwardBriifError));
    // when platfom_id change and search and page then api call
  }, [selectedPlatform?.platform_id, search, page, limit]);

  const onForwardBriifSuccess = (res) => {
    setUsers(res.data.users);
    setLoading(false);
  };

  const onForwardBriifError = (err) => {
    console.log('rror =>', err);
  };

  return (
    <div className="col-md-12 col-12 col-sm-12  d-flex flex-wrap w-100">
      <div className={classes.group_box}>
        <div className="col-md-12 d-flex p-2 pb-3 ">
          <div className="px-2 mr-2 mt-2 d-flex align-items-center">
            <Image
              src="/assets/images/Group 1171279364.svg"
              alt="add"
              width={24}
              height={24}
              onClick={() => {
                setShowSecondComponent(false);
              }}
            />
          </div>
          <div className="col-md-5 px-2 mt-2 d-flex align-items-center">
            <h2 className={classes.group_heading}>Group Members</h2>
          </div>
          <div className="col-md-6 px-2 mt-2 d-flex justify-content-end">
            <div className={classes.searchBar}>
              <div className=" px-2 d-flex align-items-center">
                <Image src="/assets/icons/search1.png" alt="add" width={21} height={21} />
              </div>
              <div className="col-10 col-md-10 px-2">
                <div className={classes.searchInput}>
                  <input
                    type="text"
                    placeholder="Search"
                    className="inputfont mainborder  ps-1 mt-1 w-100"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ opacity: '0.1', border: '1px solid #000000' }}></div>
        <div className="col-12 col-md-12 col-sm-12">
          {loading ? (
            <div className="px-3 mt-2">
              {[0, 1, 2, 3, 4, 5].map((item) => {
                return (
                  <Skeleton variant="rounded" height={'65px'} style={{ marginBottom: '10px', borderRadius: '5px' }} />
                );
              })}
            </div>
          ) : (
            <GroupDataTable
              users={users}
              selected={selected}
              setSelected={setSelected}
              setPage={setPage}
              PER_PAGE={PER_PAGE}
              page={page}
              setSuccessModal={setSuccessModal}
              limit={limit}
              setLimit={setLimit}
            />
          )}
        </div>
        <div className="col-12 col-md-12 col-sm-12 p-3">
          <div className="col-md-12">
            <div className={`${classes.title} col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2 mt-5 row`}>
              <div className="col-md-12 d-flex p-0 align-items-end position-absolute" style={{ bottom: '20px' }}>
                <div className={classes.btn}>
                  <button
                    className={classes.btn1}
                    onClick={() => {
                      setShowSecondComponent(false);
                    }}
                  >
                    Previous
                  </button>
                  <button
                    className={classes.btn2}
                    onClick={() => {
                      setConfirmGroup(true);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditModal
        confirmGroup={confirmGroup}
        selected={selected}
        setSelected={setSelected}
        setConfirmGroup={setConfirmGroup}
        group={group}
        setDotLoading={setDotLoading}
        setSuccessModal={setSuccessModal}
      />
    </div>
  );
};

export default GroupMember;
