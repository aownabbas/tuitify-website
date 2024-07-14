import { useEffect, useState } from 'react';
import VideoModal from '../../../modals/giistcreation/VideoModal';
import Image from 'next/image';
import UploadMediaModal from '../../../modals/giistcreation/UploadMediaModal';
import GiistDocumentInteractionModal from '../../giist_play_components/interaction/document/GiistDocumentInteractionModal';
import classes from './ChaptersTabs.module.css';
//uploading ki imports
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import { Box } from '@mui/material';
import PreviewQuiz from '../quiz/PreviewGiist';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import SkeletonLoader from '../../kh_home/SkeletonLoader';
import DeleteModal from '../../../modals/deletemodal/DeleteModal';
import DummyDeleteModal from '../../../modals/deletemodal/DummyDeleteModal';
import KH_ChapterQuizDelete from '../../../../redux/actions/KH_ChapterQuizDelete';
import { useDispatch } from 'react-redux';
import EditMediaModal from '../../../combine/vidoeedition/EditMediaModal';
import PrimaryDragdrop from '../../drag&drop/PrimaryDragdrop';
import { makeIdAWS } from '../../../../utils/constants/makeIdAWS';

const ChaptersTab = ({
  index,
  setIsWebcamActive,
  setIsScreenRecordingModalOpen,
  giistChapMediaCreate,
  indexForMedia,
  subindexForMedia,
  S3_BUCKET,
  REGION,
  AccessKeyId,
  SecretAccessKey,
  chaptersCreateRes,
  handleSelectQuiz,
  setTutorialMediaType,
  tutorialMediaType,
  setIsAudioRecActive,
  giistSubChapMediaCreate,
  subChapterResObj,
  loginData,
  setChaptersCreateRes,
  setMediaType,
  setDotProgressLoading,
  DotProgressLoading,
  platformData,
  awsLink,
  setDimensions,
}) => {
  const [quizPreview, setQuizPreview] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [queryEditId, setQueryEditId] = useState('');
  const router = useRouter();

  const dispatch = useDispatch();

  const isSafari =
    typeof window != 'undefined' &&
    (/constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === '[object SafariRemoteNotification]';
      })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)));
  let chapterObject = chaptersCreateRes?.data?.chapters[indexForMedia];
  let subChapterObject = chapterObject?.subChapters[subindexForMedia];

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [openWebcamModal, setOpenWebcamModal] = useState(false);
  const handleOpenWebcamModal = () => setOpenWebcamModal(true);
  const handleCloseWebcamModal = () => setOpenWebcamModal(false);

  const [openUseLink, setOpenUseLink] = useState(false);
  const handleOpenUseLink = () => setOpenUseLink(true);
  const handleCloseUseLink = () => setOpenUseLink(false);

  // for link input
  const [inputLink, setInputLink] = useState('');

  const [mediaplayModal, setMediaplayModal] = useState(false);
  const handleOpenMediaplay = () => setMediaplayModal(true);
  const handleCloseMediaplay = () => setMediaplayModal(false);

  // document modal code
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [interactionsLoading, setInteractionsLoading] = useState(false);
  // const [lastVideoFile, setLastVideoFile] = useState('');

  const [DeleteQuizModal, setDeleteQuizModal] = useState(false);

  const handleOpenQuizDeleteModal = () => setDeleteQuizModal(true);
  const handleCloseQuizDeleteModal = () => setDeleteQuizModal(false);

  const uploadDocInput = (file, seconds, type, doc_type) => {
    const data = filenameChanger(file[0].preview, type, doc_type);
    uploadFile(file[0], seconds, data, type);
    setDocumentModalOpen(false);
  };

  const filenameChanger = (file, type, doc_type) => {
    setInteractionsLoading(true);
    let randomName = makeIdAWS(20);
    setInteractionsLoading(true);
    let fileFormat = '';
    let keyPrefix = '';
    let dirName = '';
    let api_extension = '';
    if (type == '2') {
      keyPrefix = 'document';
      if (doc_type == 'application/pdf') {
        fileFormat = '.pdf';
        dirName = 'giists/documents/';
        api_extension = '.pdf';
      } else if (doc_type == 'text/plain') {
        fileFormat = '.txt';
        dirName = 'giists/documents/';
        api_extension = '.txt';
      } else if (doc_type == 'text/csv') {
        fileFormat = '.pdf';
        dirName = 'giists/documents/';
        api_extension = '.csv';
      } else if (doc_type == 'application/msword') {
        fileFormat = '.doc';
        dirName = 'giists/documents/';
        api_extension = '.doc';
      } else if (doc_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        fileFormat = '.docx';
        dirName = 'giists/documents/';
        api_extension = '.docx';
      } else if (doc_type == 'application/vnd.ms-powerpoint') {
        fileFormat = '.ppt';
        dirName = 'giists/documents/';
        api_extension = '.ppt';
      } else if (doc_type == 'application/vnd.ms-excel') {
        fileFormat = '.xls';
        dirName = 'giists/documents/';
        api_extension = '.xls';
      } else if (doc_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        fileFormat = '.xlsx';
        dirName = 'giists/documents/';
        api_extension = '.xlsx';
      } else {
        console.log('file not supported');
      }
    }

    let data = {
      url: file,
      name: keyPrefix + randomName + fileFormat,
      recording: keyPrefix,
      // type: fileFormat,
      type: doc_type,
      link: dirName + keyPrefix + randomName + api_extension,
    };
    return data;
  };

  const uploadFile = (file, seconds, data, type) => {
    console.log(file, seconds, data, type, 'file, seconds, data, type');
    setInteractionsLoading(true);
    setDotProgressLoading(true);
    let target = {};
    console.log(file);
    console.log(data.type, 'data type during');
    target = { Bucket: S3_BUCKET, Key: data.link, Body: file, ContentType: data.type };
    try {
      setInteractionsLoading(true);
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: REGION,
          credentials: {
            accessKeyId: AccessKeyId,
            secretAccessKey: SecretAccessKey,
          },
        }),
        partSize: 1024 * 1024 * 5000,
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on('httpUploadProgress', (progress) => {
        console.log('progress =>', progress);
        if (!chaptersCreateRes?.data?.chapters[indexForMedia].subChapters.length) {
          giistChapMediaCreate(indexForMedia, data?.name, null, null, 2, 1);
        } else {
          giistSubChapMediaCreate(indexForMedia, subindexForMedia, data?.name, null, null, 2, 1);
        }
      });
      setInteractionsLoading(true);
      parallelUploads3.done();
      setInteractionsLoading(true);
    } catch (e) {
      setInteractionsLoading(false);
      console.log(e);
    }
  };

  const [files, setFiles] = useState([]);

  const acceptDocs = {
    // 'application/t': [],
    'application/pdf': [],
    'application/powerpoint': [],
    'application/msword': [],
    'application/docx': [],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    'application/msexcel': [],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
    'application/vnd.ms-powerpoint': [],
    'applicatiapplication/vnd.openxmlformats-officedocument.presentationml.presentation': [],
    'application/vnd.ms-excel': [],
  };

  return (
    <div className="row ">
      {index == 0 && (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Box className="p-1">
            <div className="row mb-2">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-3">
                <div
                  className={`${classes.webcamColoredBox} d-flex flex-column justify-content-center align-items-center`}
                  onClick={() => {
                    handleOpenWebcamModal();
                    // setTutorialMediaType(0);
                    // setMediaType(1);
                  }}
                >
                  <div className="pt-3">
                    <Image src="/assets/images/webcam-icon.svg" height={32} width={32} alt="web cam" />
                  </div>
                  <div className="text-center">
                    <p>Use your webcam</p>
                  </div>
                </div>
                <VideoModal
                  openModal={openWebcamModal}
                  handleClosemodal={handleCloseWebcamModal}
                  setIsWebcamActive={setIsWebcamActive}
                  modalName="webcam"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-3">
                <div
                  className={`${classes.screencastColoredBox} d-flex flex-column justify-content-center align-items-center`}
                  onClick={() => {
                    setIsScreenRecordingModalOpen(true);
                    // setTutorialMediaType(0);
                    // setMediaType(1);
                  }}
                >
                  <div className="pt-3">
                    <Image src="/assets/images/mirroring-screen.svg" height={32} width={32} alt="screen cast" />
                  </div>
                  <div className="text-center">
                    <p>Use your Screencast</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-3">
                <div
                  className={`${classes.useLinkColoredBox} d-flex flex-column justify-content-center align-items-center`}
                  onClick={() => {
                    handleOpenUseLink();
                    // setTutorialMediaType(0);
                    // setMediaType(1);
                  }}
                >
                  <div className="pt-3">
                    <Image src="/assets/images/link3-chain-icon.svg" height={32} width={32} alt="use link" />
                  </div>
                  <div className="text-center">
                    <p>Use Link</p>
                  </div>
                </div>
                <VideoModal
                  openModal={openUseLink}
                  handleClosemodal={handleCloseUseLink}
                  setInputLink={setInputLink}
                  inputLink={inputLink}
                  handleOpenMediaplay={handleOpenMediaplay}
                  modalName="uselink"
                  giistChapMediaCreate={giistChapMediaCreate}
                  indexForMedia={indexForMedia}
                  subindexForMedia={subindexForMedia}
                  giistSubChapMediaCreate={giistSubChapMediaCreate}
                  chaptersCreateRes={chaptersCreateRes}
                />
              </div>
            </div>
            <div className="row pt-2 mb-3">
              <p className="text-center">Or</p>
            </div>
            <div
              className="row mb-2 p-3 "
              style={{
                borderRadius: '12px',
                background: 'rgba(53, 52, 82, 0.04)',
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center flex-column cursor-pointer "
                onClick={() => {
                  handleOpen();
                  // setTutorialMediaType(0);
                  // setMediaType(1);
                }}
              >
                <div className="mb-3">
                  <Image src="/assets/images/video-play-icon.svg" height={32} width={32} alt="Video play icon" />
                </div>
                <div className="w-50 text-center pb-2">
                  <p className="">Upload videos from your desktop by drag & drop</p>
                </div>
              </div>
              <UploadMediaModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                chapterTabIndex={index}
                S3_BUCKET={S3_BUCKET}
                REGION={REGION}
                AccessKeyId={AccessKeyId}
                SecretAccessKey={SecretAccessKey}
                giistChapMediaCreate={giistChapMediaCreate}
                giistSubChapMediaCreate={giistSubChapMediaCreate}
                indexForMedia={indexForMedia}
                subindexForMedia={subindexForMedia}
                setDotProgressLoading={setDotProgressLoading}
                DotProgressLoading={DotProgressLoading}
                accessToken={loginData?.access_token}
                platformData={platformData}
                awsLink={awsLink}
                chaptersCreateRes={chaptersCreateRes}
                setDimensions={setDimensions}
              />
            </div>
          </Box>
        </div>
      )}
      {index == 1 && (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <Box>
            <div
              className="row mb-3 mt-2 pt-3"
              style={{
                height: '104px',
                borderRadius: '12px',
                background: 'linear-gradient(131.85deg, #D51AFF -19.16%, #4E6AFE 58.53%, #8BF3FE 135.61%)',
              }}
              onClick={() => {
                setIsAudioRecActive(true);
                // setTutorialMediaType(2);
                // setMediaType(5);
              }}
            >
              <div className="d-flex align-items-center justify-content-center flex-column ">
                <div className="mb-3">
                  <Image src="/assets/images/microphone-2.svg" height={32} width={32} alt="mic icon" />
                </div>
                <div className="w-50 text-center">
                  <p className="text-white">Record Audio</p>
                </div>
              </div>
            </div>
            <div className="row pt-3 mb-3">
              <p className="text-center">Or</p>
            </div>
            <div
              className="row mb-2 p-3"
              style={{
                borderRadius: '12px',
                background: 'rgba(53, 52, 82, 0.04)',
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center flex-column cursor-pointer"
                onClick={() => {
                  handleOpen();
                  // setTutorialMediaType(2);
                  // setMediaType(5);
                }}
              >
                <div className="mb-3">
                  <Image src="/assets/images/video-play-icon.svg" height={32} width={32} alt="Video play icon" />
                </div>
                <div className="w-50 text-center pb-2">
                  <p className="">Upload Audios from your desktop by drag & drop</p>
                </div>
              </div>
              <UploadMediaModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                chapterTabIndex={index}
                S3_BUCKET={S3_BUCKET}
                REGION={REGION}
                AccessKeyId={AccessKeyId}
                SecretAccessKey={SecretAccessKey}
                giistChapMediaCreate={giistChapMediaCreate}
                giistSubChapMediaCreate={giistSubChapMediaCreate}
                indexForMedia={indexForMedia}
                subindexForMedia={subindexForMedia}
                setDotProgressLoading={setDotProgressLoading}
                DotProgressLoading={DotProgressLoading}
                accessToken={loginData?.access_token}
                platformData={platformData}
                awsLink={awsLink}
                chaptersCreateRes={chaptersCreateRes}
              />
            </div>
          </Box>
        </div>
      )}
      {index == 2 && (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Box sx={{ pt: 4.3 }}>
            {/* <div
              className="row mb-3 mt-2 pt-3"
              style={{
                // height: '104px',
                height: '40vh',
                borderRadius: '12px',
                background: 'linear-gradient(131.85deg, #D51AFF -19.16%, #4E6AFE 58.53%, #8BF3FE 135.61%)',
              }}
              onClick={() => {
                setDocumentModalOpen(true);
                setTutorialMediaType(1);
                setMediaType(2);
              }}
            >
              <div className="d-flex align-items-center justify-content-center flex-column">
                <div className="mb-3">
                  <Image src="/assets/images/white-document_icon.svg" height={32} width={32} alt="Video play icon" />
                </div>
                <div className="w-50 text-center">
                  <p className="text-white">Upload Document</p>
                </div>
              </div>
            </div> */}

            {/* direct drag & drop */}
            <div
              className="row mb-3"
              style={{
                height: '40vh',
                borderRadius: '12px',
                // background: 'linear-gradient(131.85deg, #D51AFF -19.16%, #4E6AFE 58.53%, #8BF3FE 135.61%)',
              }}
              // onClick={() => {
              //   setTutorialMediaType(1);
              //   setMediaType(2);
              // }}
            >
              <PrimaryDragdrop
                files={files}
                setFiles={setFiles}
                chapterTabIndex={index}
                acceptDocs={acceptDocs}
                uploadDocInput={uploadDocInput}
              />
              <p>{files[0]?.name}</p>
            </div>
            {/* end direct drag & drop */}

            {documentModalOpen == true && (
              <GiistDocumentInteractionModal
                giistCreationDocument={'giist document'}
                modalOpen={documentModalOpen}
                handleModalClose={() => {
                  setDocumentModalOpen(false);
                }}
                setInteractionsLoading={setInteractionsLoading}
                interactionsLoading={interactionsLoading}
                uploadDocInput={uploadDocInput}
              />
            )}
            {/* <div className="row pt-3 mb-3">
              <p className="text-center">Or</p>
            </div>
            <div
              className="row mb-3 p-3 "
              style={{
                borderRadius: '12px',
                background: 'rgba(53, 52, 82, 0.04)',
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center flex-column cursor-pointer"
                onClick={() => {
                  handleOpen();
                  setTutorialMediaType(1);
                }}
              >
                <div className="mb-3">
                  <Image src="/assets/images/video-play-icon.svg" height={32} width={32} alt="Video play icon" />
                </div>
                <div className="w-50 text-center pb-2">
                  <p className="">Upload documents from your desktop by drag & drop</p>
                </div>
              </div>
              <UploadMediaModal
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                chapterTabIndex={index}
                S3_BUCKET={S3_BUCKET}
                REGION={REGION}
                AccessKeyId={AccessKeyId}
                SecretAccessKey={SecretAccessKey}
                giistChapMediaCreate={giistChapMediaCreate}
                giistSubChapMediaCreate={giistSubChapMediaCreate}
                indexForMedia={indexForMedia}
                subindexForMedia={subindexForMedia}
                setDotProgressLoading={setDotProgressLoading}
                DotProgressLoading={DotProgressLoading}
                accessToken={loginData?.access_token}
                platformData={platformData}
                chaptersCreateRes={chaptersCreateRes}
              />
            </div> */}
          </Box>
        </div>
      )}
      {index == 3 && (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          {isloading == true ? (
            <Stack sx={{ height: '70vh' }}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={400}
                height={312}
                sx={{ margin: 'auto', borderRadius: '5px' }}
              />
            </Stack>
          ) : (
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pb-3">
                <div
                  className="w-100 py-5 rounded-4 text-center "
                  style={{ backgroundColor: '#E5FCFF', cursor: 'pointer' }}
                  onClick={() => {
                    handleSelectQuiz({
                      quiz_type: 1,
                      name: 'Simple Quiz',
                      quizId: quizId,
                    });
                  }}
                >
                  <div>
                    <Image src="/assets/icons/simpleQuiz.png" height={32} width={32} alt="simple quiz" />
                  </div>
                  <div className="mt-2">Simple Quiz</div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pb-3">
                <div
                  className="w-100 py-5 rounded-4 text-center"
                  style={{ backgroundColor: '#FEE6E6', cursor: 'pointer' }}
                  onClick={() => {
                    handleSelectQuiz({
                      quiz_type: 2,
                      name: 'Final Quiz',
                      quizId: quizId,
                    });
                  }}
                >
                  <div>
                    <Image src="/assets/icons/finalQuiz.png" height={32} width={32} alt="simple quiz" />
                  </div>
                  <div className="mt-2">Final Quiz</div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pb-3">
                <div
                  onClick={() => {
                    handleSelectQuiz({
                      quiz_type: 4,
                      name: 'Open Question',
                      quizId: quizId,
                    });
                  }}
                  className="w-100 py-5 rounded-4 text-center"
                  style={{ backgroundColor: '#FBE9FF', cursor: 'pointer' }}
                >
                  <div>
                    <Image src="/assets/icons/question.png" height={32} width={32} alt="simple quiz" />
                  </div>
                  <div className="mt-2">Open Question</div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pb-3">
                <div
                  style={{ backgroundColor: '#E9FFE5', cursor: 'pointer' }}
                  onClick={() => {
                    handleSelectQuiz({
                      quiz_type: 5,
                      name: 'Survey',
                      quizId: quizId,
                    });
                  }}
                  className="w-100 py-5 rounded-4 bg-gradient-primary text-center"
                >
                  <div>
                    <Image src="/assets/icons/survey.png" height={32} width={32} alt="simple quiz" />
                  </div>
                  <div className="mt-2">Survey</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChaptersTab;
