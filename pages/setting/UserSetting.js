import { useRef, useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Image from 'next/image';
import classes from '../../components/setting/Setting.module.css';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesAction from '../../redux/actions/CategoriesAction';
import usePagination from '../../components/pagination/Pagination';
import { useRouter } from 'next/router';
import CreateCategories from './Categories';
import DummyDeleteModal from '../../components/modals/deletemodal/DummyDeleteModal';
import deleteCategoryAction from '../../redux/actions/DeleteCategoryAction';
import { Skeleton } from '@mui/material';
import GenericTable from '../../components/combine/GenericTable.js/GenericTable';
import moment from 'moment';
import DotProgress from '../../components/DotProgress';
import platformUserAction from '../../redux/actions/PlatformUsersAction';
import platformUpdateUserAction from '../../redux/actions/PlatformUpdateUserAction';
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';

const UserSetting = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState(null);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [UnPublishGiistOnEditModal, setUnPublishGiistOnEditModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('Total Users');
  const [createPlat, setCreatePlat] = useState('Add User');
  const [dotLoading, setDotLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [showModals, setShowModals] = useState(false);
  const [showSuccessModals, setShowSuccessModals] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showModalsError, setShowModalsError] = useState(false);


  console.log(search, 'search');

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  const UnPublishOpenModal = (items) => {
    console.log(items, 'idndnjd');
    if (items.status == 'Deleted') {
      setShowModals(true);
    } else {
      setUserId(items.id);
      setUnPublishGiistOnEditModal(true);
    }
  };

  const UnPublishColseModal = () => setUnPublishGiistOnEditModal(false);

  const PER_PAGE = limit;

  useEffect(() => {
    setLoading(false);
    let params = `limit=${limit}&platform_id=${selectedPlatform?.platform_id}&page=${page}&search=${search}`;
    dispatch(platformUserAction(params, onPlatformUsersSuccess, onPlatformUsersError));
    // dispatch(CategoriesAction(params, onCategoriesSuccess, onCategoriesError));
  }, [selectedPlatform?.platform_id, page, search, limit]);

  const onPlatformUsersSuccess = (res) => {
    console.log(res, 'rrvrv');

    let modifiedDataForTable = res;
    let updateArray = modifiedDataForTable?.items.map((item) => {
      return {
        ...item,
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        role_id:
          item.role_id == 1 ? 'Admin' : item.role_id == 6 ? 'Super Admin' : 'User',
        status: item.status == 1 ? "Active" : "Deleted",
        creation_date:
          item.creation_date == null
            ? ""
            : moment(item.creation_date).format("DD MMMM, YYYY"),
      };
    });

    modifiedDataForTable.items = updateArray;

    setCategoryData(modifiedDataForTable);
    setLoading(false);
  };
  const onPlatformUsersError = (err) => {
    console.log(err, 'errror');

    setLoading(false);
  };
  var count = Math.ceil(categoryData?.totalItems / PER_PAGE);
  const cardData = usePagination(categoryData?.items, categoryData?.totalItems, PER_PAGE);
  const handlePagination = (e, p) => {
    setPage(p);
    cardData.jump(p);
  };
  const router = useRouter();
  const handleCLick = () => {
    router.push('./CreateUser');
  };

  const deleteUser = (userId) => {
    setDotLoading(true);

    let params = JSON.stringify({
      user_id: userId,
      status: '0',
    });

    dispatch(platformUpdateUserAction(params, onPlatformUpdateUserSuccess, onPlatformUpdateUserError));
  };
  const onPlatformUpdateUserSuccess = (res) => {
    setDotLoading(false);

    if (res.status == true) {
      setShowSuccessModals(true);
      const newData = categoryData.items.filter((row) => row.id !== userId);
      setCategoryData((s) => ({ ...s, items: newData }));
    } else {
      setShowModalsError(true)
    }
    setDotLoading(false);

    console.log(res, 'update');
  };
  const onPlatformUpdateUserError = (err) => {
    console.log(err, 'not update');
  };

  const tableTitles = [
    {
      title: 'First Name',
      width: 160,
      id: 'first_name',
    },
    { title: 'Last Name', width: 160, id: 'last_name' },
    { title: 'Email', width: 160, id: 'email' },
    { title: 'Role', width: 160, id: 'role_id', date: true },
    { title: 'Status', width: 160, id: 'status' },
    { title: 'Creation Date', width: 160, id: 'creation_date' },
    { title: 'Action', width: 160, id: 'action', edit: true },
  ];
  const handleCLick2 = (items) => {
    if (items.status == 'Deleted') {
      setShowDeleted(true);
    } else {
      router.push({
        pathname: '/setting/CreateUser',
        query: { id: items.id },
      });
    }
  };
  return (
    <Layout heading="Setting" showSettingIcon={true} showdropdown={true}>
      {dotLoading && <DotProgress />}

      <div className="col-12 d-inline-flex justify-content-center p-2">
        <DummyDeleteModal
          openModal={UnPublishGiistOnEditModal}
          handleCloseModal={UnPublishColseModal}
          image="/assets/images/trash.svg"
          heading="Deleting User"
          text="Are you sure you want to delete this user?"
          // setDotProgressLoading={setDotLoading}
          buttonText1="No"
          buttonText2="Yes"
          handleClick={() => deleteUser(userId)}
        />
        <SuccessModal
          modalOpen={showModals}
          handleModalClose={() => {
            setShowModals(false);
          }}
      image={<Image src="/assets/images/trash.svg" width="65px" height="70px" alt="alert" />}
          title={'User Deleted'}
          description={'This user has been deleted and is no longer available.'}
          button1={'Okay'}
        />
        <SuccessModal
          modalOpen={showSuccessModals}
          handleModalClose={() => {
            setShowSuccessModals(false);
          }}
          image={
            <Image
              src="/assets/images/tick.svg"
              width="65px"
              height="70px"
              alt="alert"
            />
          }
          title={"User Deleted Successfully"}
          description={"This user has been successfully deleted "}
          button1={"Okay"}
        />
        <SuccessModal
          modalOpen={showSuccessModals}
          handleModalClose={() => {
            setShowSuccessModals(false);
          }}
          image={
            <Image
              src="/assets/images/tick.svg"
              width="65px"
              height="70px"
              alt="alert"
            />
          }
          title={"User Deleted Successfully"}
          description={"This user has been successfully deleted "}
          button1={"Okay"}
        />
        <SuccessModal
          modalOpen={showSuccessModals}
          handleModalClose={() => {
            setShowSuccessModals(false);
          }}
          image={
            <Image
              src="/assets/images/tick.svg"
              width="65px"
              height="70px"
              alt="alert"
            />
          }
          title={"User Deleted Successfully"}
          description={"This user has been successfully deleted "}
          button1={"Okay"}
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
              style={{ borderRadius: "10px" }}
            />
          }
          title={'Error'}
          description={"Something Went Wrong."}
          button1={"Okay"}
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
              style={{ borderRadius: "10px" }}
            />
          }
          title={'Error'}
          description={"Something Went Wrong."}
          button1={"Okay"}
          // link={'/setting/PlatformSetting'}
          setDotProgressLoading={setDotLoading}
        />
        <SuccessModal
          modalOpen={showSuccessModals}
          handleModalClose={() => {
            setShowSuccessModals(false);
          }}
          image={
            <Image
              src="/assets/images/tick.svg"
              width="65px"
              height="70px"
              alt="alert"
            />
          }
          title={"User Deleted Successfully"}
          description={"This user has been successfully deleted "}
          button1={"Okay"}
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
              style={{ borderRadius: "10px" }}
            />
          }
          title={'Error'}
          description={"Something Went Wrong."}
          button1={"Okay"}
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
              style={{ borderRadius: "10px" }}
            />

          }
          title={'Error'}
          description={"Something Went Wrong."}
          button1={"Okay"}
          // link={'/setting/PlatformSetting'}
          setDotProgressLoading={setDotLoading}
        />
        <SuccessModal
          modalOpen={showDeleted}
          handleModalClose={() => {
            setShowDeleted(false);
          }}
          image={<Image src="/assets/images/trash.svg" width="65px" height="70px" alt="alert" />}
          title={'User Deleted'}
          description={'User is no longer editable.'}
          button1={'Okay'}
        />
        <div className="col-12 col-md-12 col-sm-12">
          <div className="col-12 justify-content-center w-100 mx-auto px-0">
            <div className="col-md-12 col-12 col-sm-12 w-100">
              <div className={classes.whiteBox3}>
                <div className="d-flex " style={{ minHeight: '90%' }}>
                  <div className="col-md-12 col-sm-12 col-12">
                    {loading || !categoryData?.items ? (
                      <div className="px-3 mt-2">
                        {[0, 1, 2, 3, 4, 5].map(() => {
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
                        columns={tableTitles}
                        data={categoryData}
                        handlePagination={handlePagination}
                        setLimit={setLimit}
                        limit={limit}
                        page={page}
                        count={count}
                        deleteModal={UnPublishOpenModal}
                        handleCLick2={handleCLick2}
                        create={handleCLick}
                        setSearchData={setSearch}
                        searchData={search}
                        title={title}
                        createData={createPlat}
                        DeletedData={setShowModals}
                        notEditableData={setShowDeleted}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserSetting;
