import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Image from 'next/image';
import classes from '../../components/setting/Setting.module.css';
import Platform from '../../components/setting/Platform';
import SocialMedia from '../../components/setting/SocialMedia';
import PlatformAddedModal from '../../components/setting/PlatformAddedModal';
import { S3Client } from '@aws-sdk/client-s3';
import CreatePlatformAction from '../../redux/actions/CreatePlatformAction';
import { useDispatch } from 'react-redux';
import { Upload } from '@aws-sdk/lib-storage';
import DotProgress from '../../components/DotProgress';
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';
import { useRouter } from 'next/router';
import ViewPlatformAction from '../../redux/actions/ViewPlatformAction';
import UpdatePlatformAction from '../../redux/actions/UpdatePlatformAction';

let getPlatData = '';

const CreatePlatform = () => {
  const [showModals, setShowModals] = useState(false);
  const [showSecondComponent, setShowSecondComponent] = useState(false);
  const [name, setName] = useState('');
  const [buttonColor, setButtonColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);
  console.log(name, 'status');

  const [faceb, setFaceb] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const [srcFile, setSrcFile] = useState('');
  const [srcFileBg, setSrcFileBg] = useState('');
  const [srcFilePdf, setSrcFilePdf] = useState('');
  const [srcFilePdf2, setSrcFilePdf2] = useState('');
  const [upload, setUpload] = useState('');
  const [uploadBg, setUploadBg] = useState('');
  const [uploadPdf, setUploadPdf] = useState('');
  const [uploadPdf2, setUploadPdf2] = useState('');
  const [bgimageData, bgsetImageData] = useState('');
  const [pdfData, setPdfData] = useState('');
  const [pdf2Data, setPdf2Data] = useState('');
  const [imageData, setImageData] = useState('');
  const [dotLoading, setDotLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [errModal, setErrModal] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;

  let dispatch = useDispatch();

  var randomName = '';

  const handleUploadPlatformImage = (e) => {
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    randomName = makeId(20);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file?.size > MAX_IMAGE_SIZE) {
        alert('Image size is too large!');
      }
      setSrcFile(file);
      setUpload(URL.createObjectURL(file));
      let fileFormat = 'png';
      let keyPrefix = 'logo_';
      let dirName = 'platforms/logos/';
      let data = {
        name: keyPrefix + randomName + '.' + fileFormat,
        type: '.' + fileFormat,
        link: dirName + keyPrefix + randomName + '.' + fileFormat,
      };
      setImageData(data);
    }
  };
  const handleUploadPlatformBg = (e) => {
    console.log(e, 'usame not working');
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    randomName = makeId(20);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file?.size > MAX_IMAGE_SIZE) {
        alert('Image size is too large!');
        return;
      }
      setSrcFileBg(file);
      setUploadBg(URL.createObjectURL(file));
      let fileFormat = 'png';
      let keyPrefix = 'banners_';
      let dirName = 'platforms/banners/';
      let data = {
        name: keyPrefix + randomName + '.' + fileFormat,
        type: '.' + fileFormat,
        link: dirName + keyPrefix + randomName + '.' + fileFormat,
      };
      bgsetImageData(data);
    }
  };

  const handleUploadPlatformPdf = (e) => {
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    randomName = makeId(20);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file?.size > MAX_IMAGE_SIZE) {
        alert('pdf size is too large!');
        return;
      }
      setSrcFilePdf(file);
      setUploadPdf(URL.createObjectURL(file));
      let fileFormat = 'pdf';
      let keyPrefix = 'team1_';
      let dirName = 'platforms/tc/';
      let data = {
        name: keyPrefix + randomName + '.' + fileFormat,
        type: '.' + fileFormat,
        link: dirName + keyPrefix + randomName + '.' + fileFormat,
      };
      console.log('data this ', data);
      setPdfData(data);
    }
  };

  const uploadToS3 = async (file, data) => {
    const target = { Bucket: awsBucket, Key: `${data.link}`, Body: file, ContentType: data.type };
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
        console.log('progress', progress);
      });
      return parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUploadPlatformPdf2 = (e) => {
    console.log(e, 'pdf');
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    randomName = makeId(20);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file?.size > MAX_IMAGE_SIZE) {
        alert('pdf size is too large!');
        return;
      }
      setSrcFilePdf2(file);
      setUploadPdf2(URL.createObjectURL(file));
      let fileFormat = 'pdf';
      let keyPrefix = 'team2_';
      let dirName = 'platforms/tc/';
      let data = {
        name: keyPrefix + randomName + '.' + fileFormat,
        type: '.' + fileFormat,
        link: dirName + keyPrefix + randomName + '.' + fileFormat,
      };
      console.log('data this ', data);
      setPdf2Data(data);
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

  const handleCreatePlatform = async () => {
    let uploadLogo = await uploadToS3(srcFile, imageData);
    let uploadBg = await uploadToS3(srcFileBg, bgimageData);
    let uploadpdf = await uploadToS3(srcFilePdf, pdfData);
    let uploadpdfGiisty = await uploadToS3(srcFilePdf2, pdf2Data);

    if (
      uploadLogo.$metadata.httpStatusCode == 200 &&
      uploadBg.$metadata.httpStatusCode == 200 &&
      uploadpdf.$metadata.httpStatusCode == 200 &&
      uploadpdfGiisty.$metadata.httpStatusCode == 200
    ) {
      let params = JSON.stringify({
        background_image: bgimageData.name,
        logo: imageData.name,
        name: name,
        button_color: buttonColor,
        text_color: textColor,
        status: status,
        private_platform: type,
        facebook: faceb,
        twitter: twitter,
        linkedin: linkedin,
        term1: pdfData.name,
        term2: pdf2Data.name,
      });
      dispatch(CreatePlatformAction(params, onCreatePlatformSuccess, onCreatePlatformError));
    }
  };

  const onCreatePlatformSuccess = (res) => {
    if (res.status == true) {
      setShowModals(true);
      setDotLoading(false);
    }

    console.log(res, 'created');
  };

  const onCreatePlatformError = (err) => {
    if (err.response.data.message[0] == 'name Already Exists') {
      setErrModal(true);
    }
    console.log(err.response.data.message[0], 'not created');
  };

  const handleNextClick = () => {
    setShowSecondComponent(true);
  };

  // const [getPlatData, setGetPlatData] = useState("");
  useEffect(() => {
    const platform = JSON.parse(localStorage.getItem('@GetPlatData'));
    getPlatData = platform;
    if (id) {
      handleSHowPlatformData();
    }
  }, [id]);

  const handleSHowPlatformData = () => {
    let params = `platform_id=${id}`;
    dispatch(ViewPlatformAction(params, onViewPlatformSuccess, onViewPlatformError));
  };
  const onViewPlatformSuccess = (res) => {
    setName(res.data.name);
    setStatus(res.data.status);
    setType(res.data.private_platform);
    setButtonColor(res.data.button_color);
    setUpload(`${awsLink}platforms/logos/` + res.data.logo);
    setUploadBg(`${awsLink}platforms/banners/` + res.data.background_image);
    setUploadPdf(`${awsLink}platforms/tc/` + res.data.term1);
    setUploadPdf2(`${awsLink}platforms/tc/` + res.data.term2);
    setTextColor(res.data.text_color);
    setFaceb(res.data.facebook);
    setTwitter(res.data.twitter);
    setLinkedin(res.data.linkedin);
  };
  const onViewPlatformError = (err) => {
    console.log(err, 'not succeesss');
  };

  const updatePlatform = async () => {
    let params = {
      platform_id: id,
      name: name,
      button_color: buttonColor,
      text_color: textColor,
      status: status,
      private_platform: type,
      facebook: faceb,
      twitter: twitter,
      linkedin: linkedin,
      background_image: bgimageData.name,
      logo: imageData.name,
      term1: pdfData.name,
      term2: pdf2Data.name,
    };
    let shouldUpdate = false;
    if (srcFile) {
      let uploadLogo = await uploadToS3(srcFile, imageData);
      if (uploadLogo.$metadata.httpStatusCode == 200) {
        shouldUpdate = true;
        params.logo = imageData.name;
      }
    }
    if (srcFileBg) {
      let uploadBg = await uploadToS3(srcFileBg, bgimageData);
      if (uploadBg.$metadata.httpStatusCode == 200) {
        shouldUpdate = true;
        params.background_image = bgimageData.name;
      }
    }
    if (srcFilePdf) {
      let uploadpdf = await uploadToS3(srcFilePdf, pdfData);
      if (uploadpdf.$metadata.httpStatusCode == 200) {
        shouldUpdate = true;
        params.term1 = pdfData.name;
      }
    }
    if (srcFilePdf2) {
      let uploadpdfGiisty = await uploadToS3(srcFilePdf2, pdf2Data);
      if (uploadpdfGiisty.$metadata.httpStatusCode == 200) {
        shouldUpdate = true;
        params.term2 = pdf2Data.name;
      }
    }
    if (shouldUpdate) {
      let updateParams = JSON.stringify(params);
      dispatch(UpdatePlatformAction(updateParams, onUpdatePlatformSuccess, onUpdatePlatformError));
    } else {
      let updateParams = JSON.stringify(params);
      dispatch(UpdatePlatformAction(updateParams, onUpdatePlatformSuccess, onUpdatePlatformError));
    }
  };

  const onUpdatePlatformSuccess = (res) => {
    if (res.data.status == true) {
      setUpdateModal(true);
      setDotLoading(false);
    }
    console.log(res.data.status, 'update platform');
  };
  const onUpdatePlatformError = (err) => {
    console.log(err, 'not update platform');
    setDotLoading(false);
  };
  return (
    <Layout heading="Setting">
      {dotLoading && <DotProgress />}
      <div className="col-12 d-inline-flex justify-content-center p-2">
        <SuccessModal
          modalOpen={showModals}
          handleModalClose={() => {
            setShowModals(false);
          }}
          image={<Image src={upload} width="65px" height="70px" alt="alert" style={{ borderRadius: '10px' }} />}
          title={name}
          description={'Your platform has been successfully created.'}
          button1={'Okay'}
          link={'/setting/PlatformSetting'}
          setDotProgressLoading={setDotLoading}
        />
        <SuccessModal
          modalOpen={updateModal}
          handleModalClose={() => {
            setUpdateModal(false);
          }}
          image={<Image src={upload} width="65px" height="70px" alt="alert" style={{ borderRadius: '10px' }} />}
          title={name}
          description={'Platform Updated Successfully.'}
          button1={'Okay'}
          link={'/setting/PlatformSetting'}
          setDotProgressLoading={setDotLoading}
        />
        <SuccessModal
          modalOpen={errModal}
          handleModalClose={() => {
            setErrModal(false);
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
          title={'Something Went wrong!'}
          description={'Name Already Exists.'}
          button1={'Okay'}
        />
        <div className="col-12 col-md-12 col-sm-12">
          <div className="col-12 justify-content-center w-100 mx-auto px-0">
            <div className="mb-2 w-100 ">
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  lineHeight: '30px',
                  color: '#303548',
                  maxWidth: '258px',
                }}
              >
                Create a new Platform
              </h3>
            </div>
            <div className="col-md-12 col-12 col-sm-12 " style={{ marginTop: '20px' }}>
              <div className="w-100">
                {showSecondComponent ? (
                  <SocialMedia
                    setShowModals={setShowModals}
                    faceb={faceb}
                    linkedin={linkedin}
                    twitter={twitter}
                    setFaceb={setFaceb}
                    setTwitter={setTwitter}
                    setLinkedin={setLinkedin}
                    platformData={handleCreatePlatform}
                    handleUploadPlatformPdf={handleUploadPlatformPdf}
                    handleUploadPlatformPdf2={handleUploadPlatformPdf2}
                    uploadPdfFile={uploadPdf}
                    srcFilePdf={srcFilePdf}
                    srcFilePdf2={srcFilePdf2}
                    uploadPdfs={uploadPdf2}
                    updatePlatform={updatePlatform}
                    setDotLoading={setDotLoading}
                  />
                ) : (
                  <Platform
                    onNext={handleNextClick}
                    setName={setName}
                    name={name}
                    status={status}
                    setStatus={setStatus}
                    type={type}
                    setType={setType}
                    buttonColor={buttonColor}
                    setButtonColor={setButtonColor}
                    textColor={textColor}
                    setTextColor={setTextColor}
                    handleUploadPlatformImage={handleUploadPlatformImage}
                    upload={upload}
                    handleUploadPlatformBg={handleUploadPlatformBg}
                    uploadBg={uploadBg}
                    srcFile={srcFile}
                    srcFileBg={srcFileBg}
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

export default CreatePlatform;
