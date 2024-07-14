import React, { useState, useEffect } from 'react';
import GiistDetails from '../../components/kh_components/giistcreation/giistdetails/GiistDetails';
import AssignPublisher from '../../components/kh_components/giistcreation/assignpublisher/AssignPublisher';
import Chapters from '../../components/kh_components/giistcreation/chapters/Chapters';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Layout from '../../components/layout/Layout';
import COLORS from '../../public/assets/colors/colors';
import { useDispatch } from 'react-redux';
import FilterCategories from '../../redux/actions/FilterCategories';
import CreateGiistDetail from '../../redux/actions/CreateGiistDetail';
import VideoGBCreation from '../../components/combine/videocreation/VideoGBCreation';
import CreateChaps from '../../redux/actions/CreateChaps';
import GiistShowToEdit from '../../redux/actions/GiistShowToEdit';
import QuizCreation from '../../components/kh_components/giistcreation/quiz/QuizCreation';
import CreateChapsMedia from '../../redux/actions/CreateChapsMedia';
import KH_CreateQuiz from '../../redux/actions/Kh_Quiz';
import dynamic from 'next/dynamic';
// aws uplaoding thumbnail/file
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import { useRouter } from 'next/router';
import giistEdit from '../../redux/actions/GiistEdit';
import updateGiist from '../../redux/actions/UpdateGiist';
import KH_ChapterQuizDelete from '../../redux/actions/KH_ChapterQuizDelete';
import DotProgress from '../../components/DotProgress';
import DummyDeleteModal from '../../components/modals/deletemodal/DummyDeleteModal';
import Image from 'next/image';
import Kh_PublishGiist from '../../redux/actions/Kh_PublishGiist';
import SuccessModal from '../../components/modals/simplemodal/SuccessModal';

const AudioGBCreation = dynamic(() => import('../../components/combine/createAudio/AudioGBCreation'), {
  ssr: false,
});

function getSteps() {
  return ['Giist Details', 'Assign Publisher', 'Chapters', 'Publish'];
}

const GiistCreation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [platformData, setPlatformData] = useState(null);
  const [loginData, setLoginData] = useState(null);
  // AWS Data
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  var awsBucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
  var awsBucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
  var awsBucketKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESSKEY;
  var awsBucketSeKey = process.env.NEXT_PUBLIC_AWS_BUCKET_SECRETKEY;
  var awsTranscodePipelineId = process.env.NEXT_PUBLIC_AWS_BUCKET_TRANSCODE_PIPLINE_ID;
  var awsTranscodePresetId = process.env.NEXT_PUBLIC_AWS_BUCKET_PRESET_ID;
  const [activeSubChap, setActiveSubChap] = useState(false);

  // first step states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState({ id: null, title: '' });
  const [checked, setChecked] = useState(false);
  const [selectCMEPoint, setSelectCMEPoint] = useState({
    id: null,
    point: null,
  });
  const [inputLink, setInputLink] = useState('');
  const [activeLink, setActiveLink] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState('');
  const [thumbnailData, setThumbnailData] = useState('');
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isAudioRecActive, setIsAudioRecActive] = useState(false);
  const [giistType, setGiistType] = useState(2);
  // second step states
  const [publisher, setPublisher] = useState(null);

  const [audienceUser, setAudienceUser] = useState(null);
  // Quiz Create First Show
  const [quizShow, setquizShow] = useState(false);
  // third step states
  const [chapters, setChapters] = useState([]);
  const [chapterInput, setChapterInput] = useState('');
  const [giistChapterId, setGiistChapterId] = useState(null);
  const [indexForMedia, setIndexForMedia] = useState(null);
  const [subindexForMedia, setSubindexForMedia] = useState(null);
  const [quizCreateResFirst, setquizCreateResFirst] = useState(null);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  // Get the Giist Id
  const [detailCreationRes, setDetailCreationRes] = useState(null);
  // Gobal State use all Response
  const [chaptersCreateRes, setChaptersCreateRes] = useState(null);
  // to be Change as soon .....
  const [showtoEditDetail, setShowtoEditDetail] = useState(null);

  const [mesgPublisher, setMesgPublisher] = useState('');
  const [languagesList, setLanguagesList] = useState([
    { title: 'English', id: 0, image: '/assets/images/english.png' },
    { id: 1, title: 'Arabic', image: '/assets/images/arabic.png' },
    { id: 2, title: 'French', image: '/assets/images/french.png' },
  ]);

  const [selectedlanguage, setselectedlanguage] = useState(null);
  const [successErrorMessage, setSuccessErrorMessage] = useState('');
  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);

  const handleOpendModalPublish = ({ heading, message, buttonText, image, move, link }) => {
    setSuccessErrorMessage({ heading, message, buttonText, image, move, link });
    setModalShowErrorSuccess(true);
  };

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };
  // Colse the Modal After 2 seconds
  // useEffect(() => {
  //   const modaleColse = setTimeout(() => {
  //     setModalShowErrorSuccess(false);
  //   }, 2000);
  //   return () => clearTimeout(modaleColse);
  // }, [modalShowErrorSuccess]);

  const [tags, setTags] = useState([]);

  const [giistCategories, setGiistCategories] = useState(null);
  const allGiistCats = giistCategories?.categories;

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [completed, setCompleted] = useState({});
  const [DotProgressLoading, setDotProgressLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [chapterAddloading, setChapterAddloading] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const uploadThumbnail = (file, data) => {
    setDotProgressLoading(true);
    if (file != '' && data != {}) {
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
          router.query.mode == 'edit' ? '' : detailCreationRes?.id ? editGiistDetails() : createGiistDetails();
        });
        parallelUploads3.done();
      } catch (e) {
        console.log(e, 'error hai uploading main');
      }
    } else {
      if (detailCreationRes?.id) {
        editGiistDetails();
      } else {
        createGiistDetails();
      }
    }
  };

  // form import function code start

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if (activeStep == 2) {
      handleOpenGiistModal();
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    } else {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const [allUsers, setAllUsers] = useState([]);
  const [allGroups, setAllGroups] = useState(null);

  const handleBack = () => {
    setTitle(title);
    setDescription(description);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    handleStep();
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // connector code
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 12,
      left: '-100%',
      right: '100%',
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 2,
      border: 0,
      backgroundColor: COLORS.mainColor,
      borderRadius: 1,
      opacity: '0.2',
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: '#C2C1CE',
    zIndex: 1,
    color: '#fff',
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(!ownerState.completed && !ownerState.active && {}),
    ...(ownerState.active && {
      backgroundImage: `url(${'/assets/icons/new/activestep.svg'})`,
      fontWeight: 'bold',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage: `url(${'/assets/icons/new/checkedtick.svg'})`,
    }),
  }));

  // chapter single Id Select Chapter
  let chapterIdSingle = chaptersCreateRes?.data?.chapters[indexForMedia];
  let subChapterResObj = chapterIdSingle?.subChapters[subindexForMedia];

  // question_display state
  const [questionDisplay, setQuestionDisplay] = useState(0);
  // displayAnswer state
  const [displayAnswer, setDisplayAnswer] = useState(0);
  const [quizTypeDefine, setQuizTypeDefine] = useState(null);

  // Quiz handleSelect =>
  const handleSelectQuiz = (value) => {
    setMediaType(4);
    setLoading(true);
    setQuizTypeDefine(value);
    setquizShow(true);
    if (chapterIdSingle?.subChapters.length > 0) {
      return handleSubChapQuizCreate(value);
    } else {
      return handleCreateChapQuiz(value);
    }
  };

  const handleCreateChapQuiz = (value) => {
    let quiz_type = value?.quiz_type;
    let paramsQuiz = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: chapterIdSingle?.chapter_id,
        media_type: mediaType,
        quiz: {
          quiz_id: value?.quizId ? value?.quizId : null,
          quiz_type: quiz_type,
          question_display: 0,
          display_answer: 0,
          timer: 0,
          seconds: 0,
        },
      },
    };
    dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
  };

  const handleSubChapQuizCreate = (value) => {
    let quiz_type = value?.quiz_type;
    let paramsQuiz = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: subChapterResObj?.chapter_id,
        parent_id: subChapterResObj?.parent_id,
        media_type: mediaType,
        quiz: {
          quiz_id: value?.quizId ? value?.quizId : null,
          quiz_type: quiz_type,
          question_display: 0,
          display_answer: 0,
          timer: 0,
          seconds: 0,
        },
      },
    };
    dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
  };

  const onQuizSubmitSuccess = (res) => {
    setChaptersCreateRes(res);
    setLoading(false);
  };
  const onQuizSubmitError = (erorr) => {
    console.log(erorr);
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: `There is something wrong. Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    setLoading(false);
  };

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {};

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const [soloInput, setSoloInput] = useState('');
  const [channgeInputToTxt, setChanngeInputToTxt] = useState(false);

  // to get form data
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <GiistDetails
            platformData={platformData}
            loginData={loginData}
            awsLink={awsLink}
            tags={tags}
            setTags={setTags}
            setThumbnail={setThumbnail}
            thumbnail={thumbnail}
            setThumbnailData={setThumbnailData}
            thumbnailData={thumbnailData}
            setThumbnailFile={setThumbnailFile}
            setCategory={setCategory}
            category={category}
            description={description}
            setDescription={setDescription}
            title={title}
            setTitle={setTitle}
            allGiistCats={allGiistCats}
            showtoEditDetail={showtoEditDetail}
            // errorForm={errorForm}
            languagesList={languagesList}
            setLanguagesList={setLanguagesList}
            selectedlanguage={selectedlanguage}
            setselectedlanguage={setselectedlanguage}
            detailCreationRes={detailCreationRes}
            selectCMEPoint={selectCMEPoint}
            setSelectCMEPoint={setSelectCMEPoint}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            inputLink={inputLink}
            setInputLink={setInputLink}
            setGiistType={setGiistType}
            checked={checked}
            setChecked={setChecked}
          />
        );
      case 1:
        return (
          <AssignPublisher
            chaptersCreateRes={chaptersCreateRes}
            platformData={platformData}
            awsLink={awsLink}
            loginData={loginData}
            setThumbnail={setThumbnail}
            thumbnail={thumbnail}
            setThumbnailData={setThumbnailData}
            setThumbnailFile={setThumbnailFile}
            description={description}
            setDescription={setDescription}
            title={title}
            setTitle={setTitle}
            publisher={publisher}
            setPublisher={setPublisher}
            setDotProgressLoading={setDotProgressLoading}
            checkedUsers={checkedUsers}
            checkedGroups={checkedGroups}
            setCheckedGroups={setCheckedGroups}
            setCheckedUsers={setCheckedUsers}
            selectedCheckbox={selectedCheckbox}
            setSelectedCheckbox={setSelectedCheckbox}
            allUsers={allUsers}
            allGroups={allGroups}
            setAllGroups={setAllGroups}
            setAllUsers={setAllUsers}
            selectedUsers={selectedUsers}
            selectedGroup={selectedGroup}
            setSelectedUsers={setSelectedUsers}
            setSelectedGroup={setSelectedGroup}
            audienceUser={audienceUser}
            setAudienceUser={setAudienceUser}
          />
        );
      default:
        return (
          <Chapters
            editChaptersData={editChaptersData}
            awsLink={awsLink}
            channgeInputToTxt={channgeInputToTxt}
            setChanngeInputToTxt={setChanngeInputToTxt}
            soloInput={soloInput}
            setSoloInput={setSoloInput}
            setChapters={setChapters}
            chapters={chapters}
            chapterInput={chapterInput}
            chaptersCreateRes={chaptersCreateRes}
            setChapterInput={setChapterInput}
            setIsWebcamActive={setIsWebcamActive}
            setIsAudioRecActive={setIsAudioRecActive}
            S3_BUCKET={awsBucket}
            REGION={awsBucketRegion}
            AccessKeyId={awsBucketKey}
            SecretAccessKey={awsBucketSeKey}
            platformData={platformData}
            giistChapCreate={giistChapCreate}
            giistChapEdit={giistChapEdit}
            giistSubChapCreate={giistSubChapCreate}
            giistSubchapEdit={giistSubchapEdit}
            setGiistChapterId={setGiistChapterId}
            setquizShow={setquizShow}
            giistChapterId={giistChapterId}
            openSuccessmediaupload={openSuccessmediaupload}
            handleMediaUploadModalClose={handleMediaUploadModalClose}
            giistChapMediaCreate={giistChapMediaCreate}
            setCastedBlobData={setUploadedBlobData}
            activeSubChap={activeSubChap}
            setActiveSubChap={setActiveSubChap}
            setIndexForMedia={setIndexForMedia}
            indexForMedia={indexForMedia}
            subindexForMedia={subindexForMedia}
            setSubindexForMedia={setSubindexForMedia}
            setTutorialMediaType={setTutorialMediaType}
            tutorialMediaType={tutorialMediaType}
            detailCreationRes={detailCreationRes}
            quizShow={quizShow}
            loginData={loginData}
            handleSelectQuiz={handleSelectQuiz}
            openNotificationModal={openNotificationModal}
            handleNotificationModalClose={handleNotificationModalClose}
            giistSubChapMediaCreate={giistSubChapMediaCreate}
            chapterIdSingle={chapterIdSingle}
            setChaptersCreateRes={setChaptersCreateRes}
            subChapterResObj={subChapterResObj}
            handleEditQuiz={handleEditQuiz}
            setDotProgressLoading={setDotProgressLoading}
            DotProgressLoading={DotProgressLoading}
            chapterAddloading={chapterAddloading}
            setChapterAddloading={setChapterAddloading}
            setMediaType={setMediaType}
            chapterSingleData={chapterSingleData}
            setChapterSingleData={setChapterSingleData}
            publisher={publisher}
            setQuizTypeDefine={setQuizTypeDefine}
            handleDeleteQuiz={handleDeleteQuiz}
            setDimensions={setDimensions}
          />
        );
    }
  };

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  const [getThumbnail, setGetThumbnail] = useState('');
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [checkedGroups, setCheckedGroups] = useState([]);

  const [selectedCheckbox, setSelectedCheckbox] = useState('1');

  const checkedUserIds = checkedUsers?.map((user) => user.id);
  const checkedGroupsIds = checkedGroups?.map((group) => group.id);

  useEffect(() => {
    const getPlatformData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const getLoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (getPlatformData) {
      setPlatformData(getPlatformData);
      if (getLoginData) {
        setLoginData(getLoginData);
        const catsParam = `platform_id=${getPlatformData?.platform_id}`;
        dispatch(FilterCategories(catsParam, onCategoriesSuccess, onCategoriesError));
        const params = `id=${router.query.id}`;

        router.query.mode == 'edit'
          ? (setDotProgressLoading(true),
            dispatch(giistEdit(params, getLoginData?.access_token, onGiistEditSuccess, onGiistEditError)))
          : '';
        router.query.mode == 'edit' && setIndexForMedia(0);
        setSubindexForMedia(0);
      }
    }
    router.query.mode == 'edit'
      ? setDetailCreationRes({
          id: router.query.id,
          status: true,
          message: 'Added Draft Giist.',
        })
      : '';
    return () => {};
  }, [router.query.mode, getThumbnail]);

  const onGiistEditSuccess = (res) => {
    setDotProgressLoading(false);
    setChaptersCreateRes(res);
    let tagsResponse = '';
    setTitle(res.data.title);
    setPublisher(res.data.publisher);
    setCategory({ id: res.data.category_id, title: res.data.catagorie.title });
    setChecked(res.data.cme_points == 'null' ? false : true);
    setSelectCMEPoint({
      point: res.data.cme_points == 'null' ? null : res.data.cme_points,
    });
    setInputLink(res.data.cme_link);
    setDescription(res.data.description);
    setGetThumbnail(res.data.thumbnail);
    const users = res.data.tutorialAudiences.map((audience) => audience.user);
    // Map over tutorialGroup array and return just group objects
    const groups = res.data.tutorialGroup.map((group) => group.group);
    // Set state variables to arrays of user and group objects
    setCheckedUsers(users);
    setCheckedGroups(groups);
    setSelectedCheckbox(res.data.audience_id);
    setselectedlanguage({
      id: res.data.language,
      title: res.data.language == 0 ? 'English' : res.data.language == 1 ? 'Arabic' : 'French',
    });

    console.log('checkuser', checkedUsers);

    const inputChapter = [...res.data.chapters];
    setChapters(inputChapter);
    for (let i = 0; i < res.data.chapters.length; i++) {
      inputChapter[i].toText = true;
    }
    typeof window != 'undefined' ? setThumbnail(`${awsLink}giists/images/${res.data.thumbnail}`) : '';
    setThumbnailData({
      name: res.data.thumbnail,
    });

    tagsResponse = res.data.tags.split(',');
    setTags(tagsResponse);
    setShowtoEditDetail(res);
    setChaptersCreateRes(res);
  };

  const onGiistEditError = (err) => {
    if (err) {
      console.log(err);
      setDotProgressLoading(false);
      handleOpendModalPublish({
        heading: 'Something Wrong',
        message: `There is something wrong. Let's give it another try`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: false,
      });
    }
  };

  const onCategoriesSuccess = (res) => {
    setGiistCategories(res);
  };
  const onCategoriesError = (err) => {
    setGiistCategories(err);
  };
  const editGiistDetails = () => {
    setDotProgressLoading(true);
    if (router.query.mode == 'edit') {
      const paramsGiistBody = JSON.stringify({
        id: router.query.id,
        title: title,
        description: description,
        category_id: String(category.id),
        catagorie: { title: category.title },
        cme_link: inputLink,
        cme_points: String(selectCMEPoint.point),
        tags: String(tags),
        thumbnail: thumbnailData.name ? String(thumbnailData.name) : null,
        publisher_id: publisher?.id ? publisher?.id : null,
        language: selectedlanguage?.id,
        type: giistType,
        audience_id: parseInt(selectedCheckbox), // 1=> public 2=> private
        audience: checkedUserIds,
        groups: checkedGroupsIds,
      });
      dispatch(updateGiist(paramsGiistBody, loginData?.access_token, onUpdateGiistSuccess, onUpdateGiistError));
    } else {
      const paramsGiistBody = JSON.stringify({
        id: detailCreationRes?.id,
        title: title,
        description: description,
        category_id: String(category.id),
        catagorie: { title: category.title },
        cme_link: inputLink,
        cme_points: String(selectCMEPoint.point),
        tags: String(tags),
        thumbnail: thumbnailData.name ? String(thumbnailData.name) : null,
        publisher_id: publisher?.id ? publisher?.id : null,
        language: selectedlanguage?.id,
        type: giistType,
        audience_id: parseInt(selectedCheckbox), // 1=> public 2=> private
        audience: checkedUserIds,
        groups: checkedGroupsIds,
      });

      dispatch(updateGiist(paramsGiistBody, loginData?.access_token, onUpdateGiistSuccess, onUpdateGiistError));
    }
  };

  const [editChaptersData, setEditChaptersData] = useState([]);

  const onUpdateGiistSuccess = (res) => {
    if (res.status == true) {
      setChaptersCreateRes(res);
      setDotProgressLoading(false);
    }
  };
  const onUpdateGiistError = (err) => {
    setDotProgressLoading(false);
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: `There is something wrong. Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
  };
  const createGiistDetails = () => {
    const paramsGiistBody = {
      title: title,
      description: description ? description : null,
      category_id: String(category.id),
      cme_link: inputLink,
      cme_points: String(selectCMEPoint.point),
      tags: String(tags) ? String(tags) : null,
      thumbnail: thumbnailData?.name ? String(thumbnailData?.name) : null,
      publisher_id: publisher?.id ? String(publisher?.id) : null,
      language: selectedlanguage?.id,
      audience_id: parseInt(selectedCheckbox), // 1=> public 2=> private
      audience: checkedUserIds,
      groups: checkedGroupsIds,
      type: giistType,
    };
    dispatch(
      CreateGiistDetail(paramsGiistBody, loginData?.access_token, onCreateGiistDetailSuccess, onCreateGiistDetailError),
    );
  };

  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const handleNotificationModalOpen = () => setOpenNotificationModal(true);
  const handleNotificationModalClose = () => setOpenNotificationModal(false);

  const onCreateGiistDetailSuccess = (res) => {
    setDetailCreationRes(res);
    setChaptersCreateRes(res);
    setDotProgressLoading(false);
    handleNotificationModalOpen();
  };
  const onCreateGiistDetailError = (err) => {
    if (err) {
      const message = err.message;
      // setDetailCreationRes(err);
      handleOpendModalPublish({
        heading: 'Something Wrong',
        message: `There is something wrong. Let's give it another try`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: false,
      });
      handleNotificationModalOpen();
      setDotProgressLoading(false);
    }
  };

  // to create chapter (put api is called without id)
  let [tutorialMediaType, setTutorialMediaType] = useState(0);
  let [mediaType, setMediaType] = useState(0);

  console.log(mediaType, 'mediaType mediaType');

  const [uploadedBlobData, setUploadedBlobData] = useState(null);

  // giistSubChapMediaCreate is not being used
  const giistSubChapMediaCreate = (
    indexNum,
    subindexNum,
    castBlobData,
    duration,
    mediaLibraryId,
    static_media_type,
    static_tutorial_media_type,
  ) => {
    const paramsChapterMedia = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: chaptersCreateRes?.data?.chapters[indexNum]?.subChapters[subindexNum]?.chapter_id,
        parent_id: chaptersCreateRes?.data?.chapters[indexNum]?.subChapters[subindexNum]?.parent_id,
        // media_type: mediaType,
        media_type: static_media_type,
        tutorialMedia: {
          libraries_media_id: mediaLibraryId ? mediaLibraryId : null,
          title: castBlobData,
          thumbnail: thumbnailData?.name,
          // type: tutorialMediaType,
          type: static_tutorial_media_type,
          orientation: dimensions.height > dimensions.width ? 'portrait' : 'landscape',
          duration: duration ? duration : null,
        },
      },
    };
    console.log(paramsChapterMedia, 'paramsChapterMedia paramsChapterMedia');
    dispatch(
      CreateChapsMedia(
        paramsChapterMedia,
        loginData?.access_token,
        onCreateChapterMediaSuccess,
        onCreateChapterMediaError,
      ),
    );
  };

  const giistChapMediaCreate = (
    indexNum,
    castBlobData,
    duration,
    mediaLibraryId,
    static_media_type,
    static_tutorial_media_type,
  ) => {
    setDotProgressLoading(true);
    let chaptWithMedia = [...chapters];
    chaptWithMedia[indexNum].uploadedMedia = castBlobData;
    setChapters(chaptWithMedia);
    let chapIdResponse = chaptersCreateRes?.data?.chapters[indexNum]?.chapter_id;

    const paramsChapterMedia = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: chapIdResponse, // from response
        // title: chapters[indexNum].title,
        // media_type: mediaType,
        media_type: static_media_type,
        tutorialMedia: {
          libraries_media_id: mediaLibraryId ? mediaLibraryId : null,
          // title: chapters[indexNum].uploadedMedia,
          title: castBlobData,
          thumbnail: thumbnailData?.name,
          // type: tutorialMediaType,
          type: static_tutorial_media_type,
          orientation: dimensions.height > dimensions.width ? 'portrait' : 'landscape',
          duration: duration ? duration : null,
        },
      },
    };
    dispatch(
      CreateChapsMedia(
        paramsChapterMedia,
        loginData?.access_token,
        onCreateChapterMediaSuccess,
        onCreateChapterMediaError,
      ),
    );
    // }
  };

  const onCreateChapterMediaSuccess = (res) => {
    if (res.status == true) {
      setChaptersCreateRes(res);
      setDotProgressLoading(false);
      handleOpendModalPublish({
        heading: 'Success!',
        message: `Media has been uploaded Successfully`,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: false,
      });
    }
  };
  const onCreateChapterMediaError = (err) => {
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: `There is something wrong while uploading the file. Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    setDotProgressLoading(false);
  };

  const giistChapCreate = (chapId, chapIndex) => {
    const paramsChapter = {
      id: detailCreationRes?.id,
      chapter: {
        title: chapters[chapIndex].title,
        media_type: chapterIdSingle?.title ? chapterIdSingle?.media_type : 0,
      },
    };
    dispatch(CreateChaps(paramsChapter, loginData?.access_token, onCreateChapterSuccess, onCreateChapterError));
  };
  const giistChapEdit = (chapId, chapIndex) => {
    const editParamsChapter = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: chapId,
        title: chapters[chapIndex].title,
        media_type: chapterIdSingle?.title ? chapterIdSingle?.media_type : 0,
      },
    };

    dispatch(CreateChaps(editParamsChapter, loginData?.access_token, onCreateChapterSuccess, onCreateChapterError));
  };

  const onCreateChapterSuccess = (res) => {
    if (res.status == true) {
      setChaptersCreateRes(res);
      setChapterAddloading(false);
    }
  };
  const onCreateChapterError = (err) => {
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: `There is something wrong. Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    setChapterAddloading(false);
  };

  const giistSubChapCreate = (chapId, chapIndex, subChapIndex) => {
    let chapMedia = chapterIdSingle?.media_type;
    const paramsChapter = {
      id: detailCreationRes?.id,
      chapter: {
        parent_id: chapId,
        title: chapters[chapIndex].subChapters[subChapIndex].title,
        media_type: subChapterResObj?.title ? subChapterResObj?.media_type : chapMedia,
      },
    };
    dispatch(CreateChaps(paramsChapter, loginData?.access_token, onCreateSubChapterSuccess, onCreateSubChapterError));
  };

  const giistSubchapEdit = (subChapId, parentId, subChapIndex) => {
    const paramsChapter = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: subChapId,
        parent_id: parentId,
        title: chapters[indexForMedia].subChapters[subChapIndex].title,
        media_type: subChapterResObj?.title ? subChapterResObj?.media_type : 0,
      },
    };
    dispatch(CreateChaps(paramsChapter, loginData?.access_token, onCreateSubChapterSuccess, onCreateSubChapterError));
  };

  const onCreateSubChapterSuccess = (res) => {
    if (res.status == true) {
      setChaptersCreateRes(res);
      setChapterAddloading(false);
    }
  };
  const onCreateSubChapterError = (err) => {
    setChapterAddloading(false);
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: `There is something wrong. Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
  };

  const showingToEditGiist = () => {
    const paramsToEdit = `id=${detailCreationRes?.id}`;
    dispatch(GiistShowToEdit(paramsToEdit, loginData?.access_token, onGiistshowToEditSuccess, onGiistShowToEditError));
  };

  const onGiistshowToEditSuccess = (res) => {
    setShowtoEditDetail(res.data);
    // setChaptersCreateRes(res);
  };
  const onGiistShowToEditError = (err) => {
    if (err) {
      // setShowtoEditDetail(err);
      handleOpendModalPublish({
        heading: 'Something Wrong',
        message: `There is something wrong. Let's give it another try`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: false,
      });
    }
  };

  const onUpdateGiistDetailSuccess = (res) => {
    if (res.status == true) {
      setChaptersCreateRes(res);
    }
  };
  const onUpdateGiistDetailError = (err) => {
    console.log(err);
  };

  const [openSuccessmediaupload, setOpenSuccessmediaupload] = useState(false);
  const handleMediaUploadModalOpen = () => setOpenSuccessmediaupload(true);
  const handleMediaUploadModalClose = () => setOpenSuccessmediaupload(false);

  const [openPublishGisstModal, setOpenPublishGisstModal] = useState(false);
  const [chapterSingleData, setChapterSingleData] = useState(null);

  const handleOpenGiistModal = () => setOpenPublishGisstModal(true);
  const handleColseGisstModal = () => {
    setOpenPublishGisstModal(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleEditQuiz = () => {
    setquizShow(true);
  };

  const handleDeleteQuiz = (quiz_id) => {
    setDotProgressLoading(true);
    const paramsQuiz = {
      giist_id: detailCreationRes?.id,
      quiz_id: quiz_id,
    };
    dispatch(
      KH_ChapterQuizDelete(paramsQuiz, loginData?.access_token, onQuizDeleteSubmitSuccess, onQuizDeleteSubmitError),
    );
  };

  const onQuizDeleteSubmitSuccess = (res) => {
    if (res.status == true) {
      // Delete the quiz from the state
      setChaptersCreateRes(res);
      setquizShow(false); // Hide the quiz display
      setDotProgressLoading(false); // Reset the loading state
    }
  };

  const onQuizDeleteSubmitError = (error) => {
    console.log('errorklmkldsklnasdkbn', error);
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: `There is ksenjkse wrong. Let's give it another try`,
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    setDotProgressLoading(false);
  };
  var allHaveNullMediaAndQuiz = chaptersCreateRes?.data?.chapters.some((chapter) => {
    if (chapter.subChapters.length == 0) {
      return !chapter.tutorialMedia && !chapter.quiz;
    }
    return chapter.subChapters.some((subChapter) => !subChapter.tutorialMedia && !subChapter.quiz);
  });
  // console.log('djkdj', allHaveNullMediaAndQuiz, !chaptersCreateRes?.data?.chapters.length);
  const handleNextStep = (activeStep) => {
    if (
      (activeStep == 2 || activeStep == 3) &&
      (allHaveNullMediaAndQuiz || !chaptersCreateRes?.data?.chapters.length)
    ) {
      return handleOpendModalPublish({
        heading: 'Incomplete Giist',
        message: `Oops,  chapter should not be empty`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: false,
      });
    }
    handleComplete();
    if (detailCreationRes?.id !== null) {
      if (activeStep == 1) {
        if (router.query.mode == 'edit') {
          if (thumbnailData.name != chaptersCreateRes.data.thumbnail) {
            uploadThumbnail(thumbnailFile, thumbnailData);
          }
          editGiistDetails();
          if (detailCreationRes?.status == true) {
            handleNext();
          }
        } else {
          uploadThumbnail(thumbnailFile, thumbnailData);
          if (detailCreationRes?.status == true) {
            handleNext();
          }
        }
      }
    }
  };

  const handleMoveGiistReview = (giistId) => {
    if (publisher?.id && !mesgPublisher) {
      return handleOpendModalPublish({
        heading: 'Something Wrong',
        message: `Oops, Message should not be empty`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: false,
      });
    }
    setDotProgressLoading(true);
    let paramsQuiz = {
      id: giistId,
      publisher_id: publisher?.id ? publisher?.id : null,
      message: mesgPublisher,
    };
    setMesgPublisher('');
    dispatch(Kh_PublishGiist(paramsQuiz, loginData?.access_token, onPublishGiistSuccess, onPublishGiistError));
  };

  const onPublishGiistSuccess = async (res) => {
    if (res.status == true) {
      handleOpendModalPublish({
        heading: `${publisher?.id ? 'Giist sent for publishing' : 'Giist Published'}`,
        message: `Congratulations, ${publisher?.id ? 'Giist Successfully Sent to Publisher.' : res.message} `,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
        move: true,
        link: '/kh/KnowledgeHome',
      });
    } else {
      handleOpendModalPublish({
        heading: 'Something Wrong',
        message: `Oops, something went wrong`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: false,
      });
    }
    setDotProgressLoading(false);
  };

  const onPublishGiistError = (err) => {
    handleOpendModalPublish({
      heading: 'Something Wrong',
      message: err.response?.data?.message[0],
      buttonText: 'Try Again',
      image: '/assets/icons/danger.svg',
      move: false,
    });
    handleColseGisstModal();
    setDotProgressLoading(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Chrome requires a return value to show the confirmation dialog
    };

    const handleRefresh = () => {
      const shouldRefresh = confirm('Are you sure you want to refresh the page?');
      if (!shouldRefresh) {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleRefresh);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleRefresh);
    };
  }, []);

  return (
    <>
      <Layout heading="Knowledge Hub" bgColor="#FFFFFF" showGiistIcon={false}>
        {/* <DummyDeleteModal
          openModal={showModal}
          handleCloseModal={handleCancel}
          image="/assets/images/trash.svg"
          heading="Reload Confirmation"
          text="Are you sure you want to reload the page?"
          buttonText1="No"
          buttonText2="Yes"
          handleClick={handleReload}
        /> */}
        {isWebcamActive == true ? (
          <div className="justify-content-center w-100 mx-auto px-0 mb-5">
            <div className="w-100 ">
              <VideoGBCreation
                indexForMedia={indexForMedia}
                subindexForMedia={subindexForMedia}
                setChapters={setChapters}
                chapters={chapters}
                setIsWebcamActive={setIsWebcamActive}
                isWebcamActive={isWebcamActive}
                platformData={platformData}
                S3_BUCKET={awsBucket}
                REGION={awsBucketRegion}
                AccessKeyId={awsBucketKey}
                SecretAccessKey={awsBucketSeKey}
                TranscodePipelineId={awsTranscodePipelineId}
                transcodePresetId={awsTranscodePresetId}
                giistChapMediaCreate={giistChapMediaCreate}
                giistSubChapMediaCreate={giistSubChapMediaCreate}
                giistChapterId={giistChapterId}
                setUploadedBlobData={setUploadedBlobData}
                DotProgressLoading={DotProgressLoading}
                setDotProgressLoading={setDotProgressLoading}
                chaptersCreateRes={chaptersCreateRes}
                setDimensions={setDimensions}
              />
            </div>
          </div>
        ) : isAudioRecActive == true ? (
          <AudioGBCreation
            isAudioRecActive={isAudioRecActive}
            setIsAudioRecActive={setIsAudioRecActive}
            S3_BUCKET={awsBucket}
            REGION={awsBucketRegion}
            AccessKeyId={awsBucketKey}
            SecretAccessKey={awsBucketSeKey}
            TranscodePipelineId={awsTranscodePipelineId}
            transcodePresetId={awsTranscodePresetId}
            chaptIndex={indexForMedia}
            subindexForMedia={subindexForMedia}
            giistChapMediaCreate={giistChapMediaCreate}
            giistSubChapMediaCreate={giistSubChapMediaCreate}
            setDotProgressLoading={setDotProgressLoading}
            DotProgressLoading={DotProgressLoading}
            chaptersCreateRes={chaptersCreateRes}
          />
        ) : quizShow == true ? (
          <QuizCreation
            loginData={loginData}
            platformData={platformData}
            detailCreationRes={detailCreationRes}
            chapters={chapters}
            setquizShow={setquizShow}
            chaptersCreateRes={chaptersCreateRes}
            quizCreateResFirst={quizCreateResFirst}
            setLoading={setLoading}
            loading={loading}
            chapterIdSingle={chapterIdSingle}
            questionDisplay={questionDisplay}
            displayAnswer={displayAnswer}
            setQuestionDisplay={setQuestionDisplay}
            setDisplayAnswer={setDisplayAnswer}
            quizTypeDefine={quizTypeDefine}
            setChaptersCreateRes={setChaptersCreateRes}
            subChapterResObj={subChapterResObj}
            handleDeleteQuiz={handleDeleteQuiz}
            subindexForMedia={subindexForMedia}
            indexForMedia={indexForMedia}
          />
        ) : (
          <>
            {DotProgressLoading == true && <DotProgress />}
            <div className="justify-content-center w-100 mx-auto px-0 mb-5">
              <div className="w-100 p-0">
                <div
                  style={{
                    height: '100vh',
                    // overflowY: 'auto',
                    // overflowX: 'hidden',
                  }}
                >
                  <div className="row pe-3 ps-1">
                    <div className="col-12 mb-2">
                      <p className="semibold-large">Create Giist</p>
                    </div>
                    <div className="col-12 row">
                      <div className="col-10 pe-0">
                        <Stepper nonLinear activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
                          {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]} style={{ padding: '0px' }}>
                              <StepLabel StepIconComponent={ColorlibStepIcon} style={{ alignItems: 'start' }}>
                                {label}
                              </StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </div>
                    </div>
                    {getStepContent(activeStep)}

                    <React.Fragment>
                      <Box
                        className="mb-4 mt-3"
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <button
                          style={{
                            border: '1px solid #353452',
                            borderRadius: '10px',
                            width: '132px',
                            height: '48px',
                            fontWeight: '500',
                            fontStyle: 'normal',
                            fontSize: '16px',
                            lineHeight: '20px',
                            background: '#FFF',
                          }}
                          onClick={() => {
                            if (activeStep == 0) {
                              return router.push('/kh/published_giists/PublishedGiists');
                            }
                            handleBack();
                            if (detailCreationRes?.id) {
                              showingToEditGiist();
                            }
                          }}
                          sx={{ mr: 1 }}
                        >
                          {activeStep === 0 ? 'Cancel' : 'Previous'}
                        </button>
                        <Box className="ms-3" />
                        <button
                          disabled={
                            !title?.trim() ||
                            category.id == null ||
                            (checked && (selectCMEPoint.point == null || !inputLink?.trim()))
                          }
                          style={{
                            fontWeight: '500',
                            width: '132px',
                            height: '48px',
                            border: '1px solid #353452',
                            borderRadius: '10px',
                            fontStyle: 'normal',
                            fontSize: '16px',
                            lineHeight: '20px',
                            backgroundColor: '#353452',
                            padding: '0px 5px',
                            color: '#FFFFFF',
                            cursor:
                              !title?.trim() ||
                              category.id == null ||
                              (checked && (selectCMEPoint.point == null || !inputLink?.trim()))
                                ? 'not-allowed'
                                : 'pointer',
                            opacity:
                              !title?.trim() ||
                              category.id == null ||
                              (checked && (selectCMEPoint.point == null || !inputLink?.trim()))
                                ? 0.4
                                : 1,
                          }}
                          onClick={() => handleNextStep(activeStep)}
                          sx={{ marginRight: 1 }}
                        >
                          {activeStep === 2 || activeStep === 3
                            ? publisher?.id
                              ? 'Send to Publisher'
                              : 'Publish'
                            : 'Next'}
                        </button>
                      </Box>
                    </React.Fragment>
                  </div>
                </div>
              </div>
              <DummyDeleteModal
                openModal={openPublishGisstModal}
                handleCloseModal={handleColseGisstModal}
                image={
                  publisher?.image == null || `undefinedusers/profileImages/${publisher?.image}`
                    ? '/assets/icons/new/user.svg'
                    : `${awsLink}users/profileImages/${publisher?.image}`
                }
                heading={publisher?.id ? `Send this Giist to Publisher` : `Publish this Giist?`}
                text={
                  publisher?.id
                    ? 'This action will send this Giist to publisher for publishing'
                    : `This action will make this Giist available to its recipients`
                }
                publisher={publisher}
                mesgPublisher={mesgPublisher}
                setMesgPublisher={setMesgPublisher}
                fullName={`${publisher?.first_name}  ${publisher?.last_name}`}
                buttonText1="No"
                buttonText2="Yes"
                handleClick={() => handleMoveGiistReview(detailCreationRes?.id)}
              />
              <SuccessModal
                modalOpen={modalShowErrorSuccess}
                handleModalClose={handleCloseModalPublish}
                image={<Image src={successErrorMessage.image} width="65px" height="70px" alt="alert" />}
                title={successErrorMessage.heading}
                description={successErrorMessage.message}
                button1={successErrorMessage.buttonText}
                setDotProgressLoading={setDotProgressLoading}
                giistPublishMove={successErrorMessage.move}
                link={successErrorMessage.link}
              />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default GiistCreation;
