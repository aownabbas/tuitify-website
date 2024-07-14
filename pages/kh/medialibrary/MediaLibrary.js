import Link from 'next/link';
import WestIcon from '@mui/icons-material/West';
import Layout from '../../../components/layout/Layout';
import { Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MediaCollection from '../../../redux/actions/MediaCollection';
import MediaTabContent from '../../../components/kh_components/medialibrary/MediaTabContent';
import MediaRecCount from '../../../redux/actions/MediaRecCount';

const tabsStyles = {
  activeTabsStyles: {
    alignItems: 'self-start !important',
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
    pt: 3,
    pb: 3,
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '25px',
    fontSize: 18,
    textShadow: 'none',
    display: 'flex',
    color: 'blue !important',
    justifyContent: 'center',
    '&:hover': {
      textShadow: 'none',
    },
  },
  inactiveTabsStyles: {
    alignItems: 'self-start !important',
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
    pt: 3,
    pb: 3,
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '25px',
    fontSize: 18,
    textShadow: 'none',
    display: 'flex',
    color: '#000000 !important',
    justifyContent: 'center',
    '&:hover': {
      textShadow: 'none',
    },
  },
  emptyStyleBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    pt: 15,
  },
  emptyBoxTypo: { fontWeight: '600', fontSize: '20px', lineHeight: '25px', textAlign: 'center' },
  emptyBoxSubTypo: {
    pt: 2,
    fontWeight: '300',
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'center',
    width: '30%',
  },
  tabHeading: {
    fontFamily: 'Gilroy-Regular !important',
    fontStyle: 'normal',
    fontWeight: '550',
    fontSize: '24px',
    lineHeight: '30px',
  },
  tabSubheading: {
    fontFamily: 'Gilroy-Regular !important',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '14px',
    lineHeight: '18px',
    opacity: 0.6,
  },
  modalButton: {
    background: '#353452',
    color: '#FFFFFF !important',
    textTransform: 'capitalize',
    height: '48px',
    borderRadius: '10px',
    '&:hover': {
      background: '#353452',
    },
  },
  tabsBadge: {
    background: '#424a5c',
    borderRadius: '20px 20px 20px 0px',
    height: '22px',
    width: '22px',
    transform: 'translateY(-60%)',
    fontSize: '12px',
    // marginLeft: '5px',
    color: '#FFFFFF !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    mt: 0.5,
  },
  activeTabsBadge: {
    background: 'linear-gradient(241.72deg, #88edfe -43.84%, #625efe 59.56%, #c224fe 167.61%)',
    borderRadius: '20px 20px 20px 0px',
    height: '22px',
    width: '22px',
    transform: 'translateY(-60%)',
    fontSize: '12px',
    // marginLeft: '5px',
    color: '#FFFFFF !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    mt: 0.5,
  },
};

function MediaTabPanel(props) {
  const { children, mediatabValue, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={mediatabValue !== index}
      id={`vertical-mediaLibrary-${index}`}
      aria-labelledby={`vertical-mediaLibrary-tab-${index}`}
      {...other}
    >
      {mediatabValue === index && <Box sx={{ p: 1, height: '80vh' }}>{children}</Box>}
    </div>
  );
}

function mediaTabsProps(index) {
  return {
    id: `vertical-mediaLibrary-tab-${index}`,
    'aria-controls': `vertical-mediaLibrary-${index}`,
  };
}

const MediaLibrary = () => {
  const {
    activeTabsStyles,
    inactiveTabsStyles,
    emptyStyleBox,
    emptyBoxTypo,
    emptyBoxSubTypo,
    tabHeading,
    tabSubheading,
    modalButton,
    tabsBadge,
    activeTabsBadge,
  } = tabsStyles;
  // platform and login data
  const [platformData, setplatformData] = useState();
  const [loginData, setLoginData] = useState();

  const [mediatabValue, setMediatabValue] = useState(0);

  // modal open for media
  const [openModal, setOpenModal] = useState(false);
  const [audioOpenModal, setAudioOpenModal] = useState(false);
  const [documentOpenModal, setDocumentOpenModal] = useState(false);
  const [successErrorOpenModal, setsuccessErrorOpenModal] = useState(false);
  const [errorinModal, setErrorinModal] = useState(null);

  console.log(errorinModal, 'errorinModal errorinModal errorinModal');

  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenSuccessErrorModal = (error) => setsuccessErrorOpenModal(true);
  const handleCloseSuccessErrorModal = () => setsuccessErrorOpenModal(false);

  const handleOpenAudioModal = () => setAudioOpenModal(true);
  const handleCloseAudioModal = () => setAudioOpenModal(false);

  const handleOpenDocumentModal = () => setDocumentOpenModal(true);
  const handleCloseDocumentModal = () => setDocumentOpenModal(false);

  const mediaLibraryTabHandler = (event, newValue) => {
    setMediatabValue(newValue);
  };

  const dispatch = useDispatch();
  const docThumbnail = '/assets/images/doc-thumbnail.svg';
  const PER_PAGE = 6;
  const [videopage, setVideopage] = useState(1);
  const [audiopage, setAudiopage] = useState(1);
  const [documentpage, setDocumentpage] = useState(1);
  // const page = 1;

  const [videoMedia, setVideoMedia] = useState(null);
  const [audioItems, setAudioItems] = useState(null);
  const [documentItems, setDocumentItems] = useState(null);
  const [countMedia, setCountMedia] = useState(null);

  const responseItems = videoMedia?.items;
  const audioResponseItems = audioItems?.items;
  const documentResponseItems = documentItems?.items;

  const [S3_BUCKET, setS3_BUCKET] = useState('');
  const [REGION, setREGION] = useState('');
  const [AccessKeyId, setAccessKeyId] = useState('');
  const [SecretAccessKey, setSecretAccessKey] = useState('');

  useEffect(() => {
    const getPlatformData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (getPlatformData) {
      // get full web url.
      var full = window.location.host;
      // separating full url by dot(.).
      var parts = full.split('.');
      // getting first part before first dot of the url.
      var sub = parts[0];
      // console.log('full=>', full, 'parts=>', parts, 'sub=>', sub);
      if (sub == 'inspire') {
        // console.log('inspire');
        setS3_BUCKET(process.env.NEXT_PUBLIC_INSPIRE_AWS_BUCKET);
        setREGION(process.env.NEXT_PUBLIC_INSPIRE_AWS_BUCKET_REGION);
        setAccessKeyId(process.env.NEXT_PUBLIC_INSPIRE_AWS_BUCKET_ACCESSKEY);
        setSecretAccessKey(process.env.NEXT_PUBLIC_INSPIRE_AWS_BUCKET_SECRETKEY);
      } else {
        setS3_BUCKET(process.env.NEXT_PUBLIC_TEST_AWS_BUCKET);
        setREGION(process.env.NEXT_PUBLIC_TEST_AWS_BUCKET_REGION);
        setAccessKeyId(process.env.NEXT_PUBLIC_TEST_AWS_BUCKET_ACCESSKEY);
        setSecretAccessKey(process.env.NEXT_PUBLIC_TEST_AWS_BUCKET_SECRETKEY);
      }
      const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
      setplatformData(getPlatformData);
      setLoginData(LoginData);

      dispatch(MediaRecCount(LoginData?.access_token, onMediaCountActionSuccess, onMediaCountActionError));

      const params = `limit=${PER_PAGE}&page=${videopage}&type=0`;
      dispatch(MediaCollection(params, LoginData?.access_token, onMediaActionSuccess, onMediaActionError));
    }
  }, [videopage]);

  useEffect(() => {
    const audioParams = `limit=${PER_PAGE}&page=${audiopage}&type=1`;
    dispatch(MediaCollection(audioParams, loginData?.access_token, onAudioActionSuccess, onAudioActionError));

    const documentParams = `limit=${PER_PAGE}&page=${documentpage}&type=2`;
    dispatch(MediaCollection(documentParams, loginData?.access_token, onDocumentActionSuccess, onDocumentActionError));
  }, [audiopage, documentpage]);

  const showingAllHandler = () => {
    const params = `limit=${PER_PAGE}&page=${videopage}&type=0`;
    dispatch(MediaCollection(params, loginData?.access_token, onMediaActionSuccess, onMediaActionError));
  };
  const onMediaActionSuccess = (res) => {
    setVideoMedia(res);
  };
  const onMediaActionError = (err) => {
    setVideoMedia(err);
  };
  const mediaCounter = () => {
    dispatch(MediaRecCount(loginData?.access_token, onMediaCountActionSuccess, onMediaCountActionError));
  };

  const onMediaCountActionSuccess = (res) => {
    setCountMedia(res);
  };
  const onMediaCountActionError = (err) => {
    setCountMedia(err);
  };

  const dipatchAudioHandler = () => {
    const audioParams = `limit=${PER_PAGE}&page=${audiopage}&type=1`;
    dispatch(MediaCollection(audioParams, loginData?.access_token, onAudioActionSuccess, onAudioActionError));
  };

  const onAudioActionSuccess = (res) => {
    setAudioItems(res);
  };
  const onAudioActionError = (err) => {
    setAudioItems(err);
  };

  const dipatchDocumentHandler = () => {
    const documentParams = `limit=${PER_PAGE}&page=${videopage}&type=2`;
    dispatch(MediaCollection(documentParams, loginData?.access_token, onDocumentActionSuccess, onDocumentActionError));
  };

  const onDocumentActionSuccess = (res) => {
    setDocumentItems(res);
  };
  const onDocumentActionError = (err) => {
    setDocumentItems(err);
  };

  const refreshMedias = () => {
    mediaCounter();
    showingAllHandler();
    dipatchAudioHandler();
    dipatchDocumentHandler();
  };

  return (
    <Layout heading="Knowledge Hub">
      <div className="col-12">
        <div className="row mb-1 pt-2">
          <div className="d-flex justify-content-start">
            <div>
              <Link href="#" passHref>
                <a>
                  <WestIcon sx={{ height: 24, width: 24 }} />
                </a>
              </Link>
            </div>
            <div className="px-2 pt-1">
              <p
                style={{
                  fontFamily: 'Gilroy-Medium !important',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: '14px',
                  lineHeight: '18px',
                }}
              >
                My Media Library
              </p>
            </div>
          </div>
        </div>
        <Box sx={{ flexGrow: 1, display: 'flex', height: '80vh', overflow: 'hidden', overflowY: 'scroll' }}>
          <Grid container spacing={1} sx={{ height: 'inherit' }}>
            <Grid item md={2} sm={3} xs={12} mb={2} sx={{ height: 'inherit' }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={mediatabValue}
                onChange={mediaLibraryTabHandler}
                aria-label="Vertical mediaLibrary tabs"
                sx={{
                  background: '#F4FAFF',
                  borderRadius: '12px',
                  height: 'inherit',
                  pt: 2,
                  pb: 2,
                }}
                TabIndicatorProps={{ style: { background: 'transparent' } }}
              >
                <Tab
                  label="Videos"
                  {...mediaTabsProps(0)}
                  sx={mediatabValue == 0 ? activeTabsStyles : inactiveTabsStyles}
                  icon={
                    <Typography sx={mediatabValue == 0 ? activeTabsBadge : tabsBadge}>{countMedia?.video}</Typography>
                  }
                  onClick={refreshMedias}
                />
                <Tab
                  label="Audios"
                  {...mediaTabsProps(1)}
                  sx={mediatabValue == 1 ? activeTabsStyles : inactiveTabsStyles}
                  icon={
                    <Typography sx={mediatabValue == 1 ? activeTabsBadge : tabsBadge}>{countMedia?.audio}</Typography>
                  }
                  onClick={refreshMedias}
                />
                <Tab
                  label="Documents"
                  {...mediaTabsProps(2)}
                  sx={mediatabValue == 2 ? activeTabsStyles : inactiveTabsStyles}
                  icon={
                    <Typography sx={mediatabValue == 2 ? activeTabsBadge : tabsBadge}>{countMedia?.docs}</Typography>
                  }
                  onClick={refreshMedias}
                />
              </Tabs>
            </Grid>
            <Grid item md={10} sm={9} xs={12} mb={2} sx={{ height: 'inherit' }}>
              <MediaTabPanel mediatabValue={mediatabValue} index={0}>
                <MediaTabContent
                  // environment variables
                  S3_BUCKET={S3_BUCKET}
                  REGION={REGION}
                  AccessKeyId={AccessKeyId}
                  SecretAccessKey={SecretAccessKey}
                  // content props
                  serverResponse={videoMedia}
                  pageStates={setVideopage}
                  pageNum={videopage}
                  PER_PAGE={PER_PAGE}
                  // responseItems={responseItems}
                  handleOpenModal={handleOpen}
                  openModal={openModal}
                  handleCloseModal={handleCloseModal}
                  mediatabValue={mediatabValue}
                  successErrorOpenModal={successErrorOpenModal}
                  handleOpenSuccessErrorModal={handleOpenSuccessErrorModal}
                  handleCloseSuccessErrorModal={handleCloseSuccessErrorModal}
                  setErrorinModal={setErrorinModal}
                  errorinModal={errorinModal}
                  // styling
                  tabHeading={tabHeading}
                  tabSubheading={tabSubheading}
                  emptyStyleBox={emptyStyleBox}
                  emptyBoxTypo={emptyBoxTypo}
                  emptyBoxSubTypo={emptyBoxSubTypo}
                  modalButton={modalButton}
                  accessToken={loginData?.access_token}
                  platformData={platformData}
                  refreshMedias={refreshMedias}
                />
              </MediaTabPanel>
              <MediaTabPanel mediatabValue={mediatabValue} index={1}>
                <MediaTabContent
                  // environment variables
                  S3_BUCKET={S3_BUCKET}
                  REGION={REGION}
                  AccessKeyId={AccessKeyId}
                  SecretAccessKey={SecretAccessKey}
                  // content props
                  serverResponse={audioItems}
                  pageStates={setAudiopage}
                  pageNum={audiopage}
                  PER_PAGE={PER_PAGE}
                  // audioResponseItems={audioResponseItems}
                  handleOpenModal={handleOpenAudioModal}
                  openModal={audioOpenModal}
                  handleCloseModal={handleCloseAudioModal}
                  mediatabValue={mediatabValue}
                  successErrorOpenModal={successErrorOpenModal}
                  handleOpenSuccessErrorModal={handleOpenSuccessErrorModal}
                  handleCloseSuccessErrorModal={handleCloseSuccessErrorModal}
                  setErrorinModal={setErrorinModal}
                  errorinModal={errorinModal}
                  // styling
                  tabHeading={tabHeading}
                  tabSubheading={tabSubheading}
                  emptyStyleBox={emptyStyleBox}
                  emptyBoxTypo={emptyBoxTypo}
                  emptyBoxSubTypo={emptyBoxSubTypo}
                  modalButton={modalButton}
                  accessToken={loginData?.access_token}
                  platformData={platformData}
                  refreshMedias={refreshMedias}
                />
              </MediaTabPanel>
              <MediaTabPanel mediatabValue={mediatabValue} index={2}>
                <MediaTabContent
                  // environment variables
                  S3_BUCKET={S3_BUCKET}
                  REGION={REGION}
                  AccessKeyId={AccessKeyId}
                  SecretAccessKey={SecretAccessKey}
                  // content props
                  serverResponse={documentItems}
                  pageStates={setDocumentpage}
                  pageNum={documentpage}
                  PER_PAGE={PER_PAGE}
                  docThumbnail={docThumbnail}
                  // documentResponseItems={documentResponseItems}
                  handleOpenModal={handleOpenDocumentModal}
                  openModal={documentOpenModal}
                  handleCloseModal={handleCloseDocumentModal}
                  mediatabValue={mediatabValue}
                  successErrorOpenModal={successErrorOpenModal}
                  handleOpenSuccessErrorModal={handleOpenSuccessErrorModal}
                  handleCloseSuccessErrorModal={handleCloseSuccessErrorModal}
                  setErrorinModal={setErrorinModal}
                  errorinModal={errorinModal}
                  // styling
                  tabHeading={tabHeading}
                  tabSubheading={tabSubheading}
                  emptyStyleBox={emptyStyleBox}
                  emptyBoxTypo={emptyBoxTypo}
                  emptyBoxSubTypo={emptyBoxSubTypo}
                  modalButton={modalButton}
                  accessToken={loginData?.access_token}
                  platformData={platformData}
                  refreshMedias={refreshMedias}
                />
              </MediaTabPanel>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Layout>
  );
};

export default MediaLibrary;
