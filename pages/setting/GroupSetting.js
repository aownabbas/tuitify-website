import Layout from '../../components/layout/Layout';
import classes from '../../components/setting/Setting.module.css';
import EditModal from '../../components/setting/EditModal';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import DeleteModal from '../../components/setting/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import PlatformGroupAction, { EditGroup, deletGroup } from '../../redux/actions/PlatformGroupAction';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import DotProgress from '../../components/DotProgress';
import usePagination from '../../components/pagination/Pagination';
import { Skeleton } from '@mui/material';
import GenericTable from '../../components/combine/GenericTable.js/GenericTable';
import moment from 'moment';
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';
import ArrowTooltips from '../../components/modals/tooltip/Tooltip';

const GroupSetting = () => {
  const [deleteModals, setDeleteModals] = useState(false);
  const [editModals, setEditModals] = useState(false);

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const [dotLoading, setDotLoading] = useState(false);

  const [loading, setLoading] = useState(true);

  const [srcFile, setSrcFile] = useState('');

  const [usersEidtShow, setUsersEidtShow] = useState([]);

  const [checkedUsers, setCheckedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(5);

  const [title, setTitle] = useState('Create Groups');
  const [createPlat, setCreatePlat] = useState('Create new group');
  const [showSuccessModals, setShowSuccessModals] = useState(false);
  const [showModalsError, setShowModalsError] = useState(false);

  const makeId = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;

  const [error, setError] = useState('');
  const handleUpdateGroup = async (id) => {
    setDotLoading(true);
    let randomName = makeId(10);
    let fileFormat = 'png';
    let keyPrefix = 'groups_';
    let dirName = 'groups/';
    let data = {
      name: keyPrefix + randomName + '.' + fileFormat,
      type: '.' + fileFormat,
      link: dirName + keyPrefix + randomName + '.' + fileFormat,
    };
    const target = { Bucket: awsBucket, Key: data.link, Body: srcFile };
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: awsBucketRegion,
          credentials: {
            accessKeyId: awsBucketKey,
            secretAccessKey: awsBucketSeKey,
          },
        }),
        partSize: 1024 * 1024 * 5000,
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });
      parallelUploads3.on('httpUploadProgress', (progress) => {
        var params = '';
        if (srcFile) {
          params = JSON.stringify({
            group_id: id,
            name: name,
            image: data.name,
            platform_id: selectedPlatform?.platform_id,
            status: 1,
            user_ids: checkedUsers,
          });
        } else {
          params = JSON.stringify({
            group_id: id,
            name: name,
            platform_id: selectedPlatform?.platform_id,
            status: 1,
            user_ids: checkedUsers,
          });
        }
        dispatch(EditGroup(params, onEditGroupSuccess, onEditGroupError));
      });
      parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  };

  const router = useRouter();
  const handleCLick = () => {
    router.push('./CreateGroup');
  };
  const [page, setPage] = useState(1);

  const [getPlatData, setGetPlatData] = useState('');
  const [editData, setEditData] = useState(null);
  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);
  const [platformData, setPlatformData] = useState(null);
  const PER_PAGE = limit;

  useEffect(() => {
    setLoading(false);
    const platform = JSON.parse(localStorage.getItem('@GetPlatData'));
    setGetPlatData(platform);
    if (selectedPlatform?.platform_id) {
      let params = `limit=${limit}&page=${page}&platform_id=${selectedPlatform?.platform_id}&search=${search}`;
      dispatch(PlatformGroupAction(params, onPlatformGroupSuccess, onPlatformGroupError));
    }
  }, [selectedPlatform?.platform_id, page, search, limit]);
  const onPlatformGroupSuccess = async (res) => {
    setEditData(res);
    const modifiedDataForTable = {
      ...res,
      items: res.items.map((item) => {
        return {
          ...item,
          name: item.name,
          users: item.users.map((user) => (
            <ArrowTooltips title={user.first_name + ' ' + user.last_name} placement="top-start">
              <div className={classes.imge}>
                <span className={classes.titles}>
                  <Image
                    src={`${awsLink}users/profileImages/${user.image}`}
                    width="40px"
                    height="40px"
                    style={{ borderRadius: '50%', position: 'relative' }}
                  />
                </span>
              </div>
            </ArrowTooltips>
          )),
          image: item.image ? `groups/${item.image}` : '',
          creation_date: moment(item.creation_date).format('DD MMMM, YYYY'),
        };
      }),
    };

    setPlatformData(modifiedDataForTable);
    setLoading(false);
  };

  const onPlatformGroupError = (err) => {
    console.log(err, 'errooe');
    setLoading(false);
  };
  const dispatch = useDispatch();

  var count = Math.ceil(platformData?.totalItems / PER_PAGE);
  const cardData = usePagination(platformData?.items, platformData?.totalItems, PER_PAGE);
  const handlePagination = (e, p) => {
    setPage(p);
    cardData.jump(p);
  };

  const [groupId, setGroupId] = useState(null);

  const handleDeleteGroupModalOpen = (items) => {
    setGroupId(items.id);
    let singleGroup = platformData?.items.find((item) => item.id == items.id);
    if (singleGroup) {
      setName(singleGroup.name);
      setDeleteModals(true);
    }
  };

  const handleDeletGroup = (id) => {
    setDeleteModals(false);
    setDotLoading(true);
    let params = {
      group_ids: [id],
      platform_id: selectedPlatform?.platform_id,
    };
    dispatch(deletGroup(params, onDeleteGroupSuccess, onDeleteGroupError));
  };

  const onDeleteGroupSuccess = (res) => {
    if (res.status == true) {
      setShowSuccessModals(true);
      const updateGroup = platformData?.items.filter((item) => item.id != groupId);
      setPlatformData((s) => ({ ...s, items: updateGroup }));
      setDotLoading(false);
    } else {
      setShowModalsError(true);
    }
  };

  const onDeleteGroupError = (error) => {
    console.log('ErrorGroup', error);
    setDotLoading(false);
  };

  const handleEditGroup = (items) => {
    setGroupId(items.id);
    console.log('sfjs', editData);
    let singleGroup = editData?.items.find((item) => item.id == items.id);
    if (singleGroup) {
      setName(singleGroup.name);
      setImage(`${awsLink}groups/${singleGroup?.image}`);
      setUsersEidtShow(singleGroup.users);
      setEditModals(true);
    }
  };

  console.log('image', image);

  const onEditGroupSuccess = (res) => {
    if (res.status == true) {
      let params = `limit=${PER_PAGE}&page=${page}&platform_id=${selectedPlatform?.platform_id}`;
      dispatch(PlatformGroupAction(params, onPlatformGroupSuccess, onPlatformGroupError));
      setEditModals(false);
      setDotLoading(false);
    } else {
      setDotLoading(false);
      setError(res.message);
    }
  };

  useEffect(() => {
    // Remove the error message after 3 seconds
    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const onEditGroupError = (error) => {
    console.log(error);
    setError(error.response.data.message[0]);
    setDotLoading(false);
  };

  const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file?.size > MAX_IMAGE_SIZE) {
      alert('Image size is too large!');
      return;
    }
    setSrcFile(file);
    setImage(URL.createObjectURL(file));
  };

  const tableTitles = [
    {
      title: 'Group title',
      width: 160,
      id: 'name',
      img: true,
    },
    {
      title: 'Group participants',
      width: 160,
      id: 'users',
    },

    { title: 'Creation Date', width: 160, id: 'creation_date' },
    { title: 'Action', width: 160, id: 'action', edit: true },
  ];

  return (
    <Layout heading="Settings" setGetPlatData={setGetPlatData} showSettingIcon={true} showdropdown={true}>
      {dotLoading && <DotProgress />}
      <div className="col-12 d-inline-flex justify-content-center p-2">
        <DeleteModal
          deleteModals={deleteModals}
          setDeleteModals={setDeleteModals}
          groupId={groupId}
          handleDeletGroup={handleDeletGroup}
          name={name}
        />
        <SuccessModal
          modalOpen={showSuccessModals}
          handleModalClose={() => {
            setShowSuccessModals(false);
          }}
          image={<Image src="/assets/images/tick.svg" width="65px" height="70px" alt="alert" />}
          title={'Group Deleted Successfully'}
          description={'This Group has been successfully deleted '}
          button1={'Okay'}
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
          title={'Error'}
          description={'Something Went Wrong.'}
          button1={'Okay'}
          // link={'/setting/PlatformSetting'}
          setDotProgressLoading={setDotLoading}
        />
        {editModals && (
          <EditModal
            editModals={editModals}
            setEditModals={setEditModals}
            name={name}
            setName={setName}
            image={image}
            setImage={setImage}
            handleUpdateGroup={handleUpdateGroup}
            groupId={groupId}
            handleImageUpload={handleImageUpload}
            error={error}
            setCheckedUsers={setCheckedUsers}
            checkedUsers={checkedUsers}
            usersEidtShow={usersEidtShow}
            setUsersEidtShow={setUsersEidtShow}
          />
        )}

        <div className="col-12 col-md-12 col-sm-12">
          <div className="col-12 justify-content-center w-100 mx-auto px-0">
            <div className="mb-2 w-100">
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  lineHeight: '20.08px',
                  color: '#303548',
                  maxWidth: '127px',
                }}
              >
                Groups
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '18px',
                  color: '#303548',
                  maxWidth: '509pxpx',
                }}
              >
                You can create, edit and delete groups for the selected platform here
              </p>
            </div>
            <div className="col-md-12 col-12 col-sm-12 w-100">
              <div className={classes.whiteBox3}>
                <div className="d-flex " style={{ height: '90%' }}>
                  <div className="col-md-12 col-sm-12 col-12">
                    {loading || !platformData?.items ? (
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
                        columns={tableTitles}
                        data={platformData}
                        handlePagination={handlePagination}
                        setLimit={setLimit}
                        limit={limit}
                        page={page}
                        count={count}
                        getPlatData={getPlatData}
                        deleteModal={handleDeleteGroupModalOpen}
                        handleCLick2={handleEditGroup}
                        create={handleCLick}
                        setSearchData={setSearch}
                        searchData={search}
                        title={title}
                        createData={createPlat}
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
export default GroupSetting;
