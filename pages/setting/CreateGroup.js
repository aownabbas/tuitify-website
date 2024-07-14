import { useRef, useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Group from '../../components/setting/Group';
import GroupMember from '../../components/setting/GroupMembers';
import EditModal from '../../components/setting/EditModal';
import DeleteModal from '../../components/setting/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import CreateGroupAction from '../../redux/actions/CreateGroupAction';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import DotProgress from '../../components/DotProgress';
import { EditGroup } from '../../redux/actions/PlatformGroupAction';
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';
import Image from 'next/image';

const CreateGroup = () => {
  const [showSecondComponent, setShowSecondComponent] = useState(false);
  const [confirmGroup, setConfirmGroup] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [dotLoading, setDotLoading] = useState(false);

  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;

  const [upload, setUpload] = useState('');

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [imageData, setImageData] = useState('');
  const [srcFile, setSrcFile] = useState('');
  const [group, setGroup] = useState(null);

  let { selectedPlatform } = useSelector((state) => state.Selected_Reducer);

  var randomName = '';

  const handleUploadGroupImage = (e) => {
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    randomName = makeId(20);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file?.size > MAX_IMAGE_SIZE) {
        alert('Image size is too large!');
        return;
      }
      setSrcFile(file);
      setUpload(URL.createObjectURL(file));
      let fileFormat = 'png';
      let keyPrefix = 'groups_';
      let dirName = 'groups/';
      let data = {
        name: keyPrefix + randomName + '.' + fileFormat,
        type: '.' + fileFormat,
        link: dirName + keyPrefix + randomName + '.' + fileFormat,
      };
      setImageData(data);
    }
  };

  function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [error, setError] = useState('');

  const uploadThumbnail = async (file, data) => {
    const target = { Bucket: awsBucket, Key: data.link, Body: file };
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
        let params = JSON.stringify({
          name: name,
          image: data.name,
          platform_id: selectedPlatform?.platform_id,
          status: 1,
          group_id: group?.id,
        });

        group?.id
          ? dispatch(EditGroup(params, onEditGroupSuccess, onEditGroupError))
          : dispatch(CreateGroupAction(params, onCreateGroupSuccess, onCreateGroupError));
      });
      parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  };
  const onCreateGroupSuccess = (res) => {
    if (res.status == true) {
      setGroup(res.data);
      handleNextClick();
      setDotLoading(false);
    } else {
      setDotLoading(false);
      setError(res.message);
    }
  };

  const handleUpDateGroup = () => {
    let params = JSON.stringify({
      name: name,
      platform_id: selectedPlatform?.platform_id,
      status: 1,
      group_id: group?.id,
    });
    dispatch(EditGroup(params, onEditGroupSuccess, onEditGroupError));
  };

  const onEditGroupSuccess = (res) => {
    if (res.status == true) {
      handleNextClick();
      setDotLoading(false);
    } else {
      setDotLoading(false);
      setError(res.message);
    }
  };

  const onEditGroupError = (error) => {
    setDotLoading(false);
  };
  const handleMoveStep = () => {
    if (group?.id) {
      if (imageData.name != group.image) {
        setDotLoading(true);
        uploadThumbnail(srcFile, imageData);
        handleNextClick();
      } else {
        handleUpDateGroup();
      }
    } else {
      setDotLoading(true);
      uploadThumbnail(srcFile, imageData);
    }
  };

  const onCreateGroupError = (err) => {
    setDotLoading(false);
  };

  const handleNextClick = () => {
    setShowSecondComponent(true);
  };
  return (
    <Layout heading="Settings" showSettingIcon={true}>
      {dotLoading && <DotProgress />}
      <div className="col-12 d-inline-flex justify-content-center p-2">
        <SuccessModal
          modalOpen={successModal}
          handleModalClose={() => {
            setSuccessModal(false);
          }}
          image={<Image src="/assets/images/tick.svg" width="65px" height="70px" alt="alert" />}
          title={'Group Created!'}
          description={'Your group has been successfully created.'}
          button1={'Okay'}
          link={'/setting/GroupSetting'}
          setDotProgressLoading={setDotLoading}
        />
        <div className="col-12 col-md-12 col-sm-12">
          <div className="col-12 justify-content-center w-100 mx-auto px-0">
            <div className="col-md-12 col-12 col-sm-12 ">
              <div className="w-100">
                {showSecondComponent == true ? (
                  // <div>this is Group</div>
                  <GroupMember
                    setShowSecondComponent={setShowSecondComponent}
                    group={group}
                    setDotLoading={setDotLoading}
                    setSuccessModal={setSuccessModal}
                  />
                ) : (
                  <Group
                    setName={setName}
                    name={name}
                    srcFile={srcFile}
                    error={error}
                    handleMoveStep={handleMoveStep}
                    upload={upload}
                    handleUploadGroupImage={handleUploadGroupImage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateGroup;
