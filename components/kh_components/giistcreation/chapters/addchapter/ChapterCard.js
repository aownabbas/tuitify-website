import React, { useState, useEffect, useCallback, useRef } from 'react';
import classes from './AddChapter.module.css';
import Image from 'next/image';
import SubChapterCard from './SubChapterCard';
import { useRouter } from 'next/router';
import DummyDeleteModal from '../../../../modals/deletemodal/DummyDeleteModal';
import { useDispatch } from 'react-redux';
import DeleteChapter from '../../../../../redux/actions/DeleteChapter';
import SkeletonLoader from '../../../kh_home/SkeletonLoader';
import { SettingsBluetoothRounded } from '@mui/icons-material';
import HelpIcon from '@mui/icons-material/Help';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuizIcon from '@mui/icons-material/Quiz';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import DeleteS3Media from '../../../../../utils/DeleteS3Media';
import SuccessModal from '../../../../modals/simplemodal/SuccessModal';

const ChapterCard = (props) => {
  const {
    chaptersCreateRes,
    setChaptersCreateRes,
    chapterId,
    chapter,
    index,
    setChapters,
    chapters,
    giistChapEdit,
    giistChapCreate,
    giistSubchapEdit,
    giistSubChapCreate,
    setGiistChapterId,
    activeSubChap,
    setActiveSubChap,
    setIndexForMedia,
    subindexForMedia,
    setSubindexForMedia,
    detailCreationRes,
    indexForMedia,
    chapterAddloading,
    setChapterAddloading,
    toEditSub,
    setDotProgressLoading,
    DotProgressLoading,
    handleModal,
  } = props;
  const dispatch = useDispatch();

  const [toEdit, setToEdit] = useState(toEditSub);

  const [accessToken, setAccessToken] = useState(null);

  const [deleteChapterModal, setDeleteChapterModal] = useState(false);
  const handleOpenDeleteChapter = () => setDeleteChapterModal(true);
  const handleCloseDeleteChapter = () => setDeleteChapterModal(false);

  const messagesEndRef = useRef(null);
  const [successErrorMessage, setSuccessErrorMessage] = useState('');
  const [modalShowErrorSuccess, setModalShowErrorSuccess] = useState(false);

  const handleOpendModalPublish = ({ heading, message, buttonText, image, move, link }) => {
    setSuccessErrorMessage({ heading, message, buttonText, image, move, link });
    setModalShowErrorSuccess(true);
  };

  const handleCloseModalPublish = () => {
    setModalShowErrorSuccess(false);
  };

  const AddNewSubChapter = (index) => {
    let myvariable = [...chapters];
    let ch = myvariable[index];
    ch.subChapters?.push({
      id: ch.subChapters.length + 1,
      parentId: ch.id,
      title: '',
      toText: false,
      uploadedMedia: '',
    });
    myvariable[index] = ch;
    setChapters(myvariable);
  };
  const [channgeInputToTxt, setChanngeInputToTxt] = useState(props.channgeInputToTxt == true ? true : false);

  const [inputToTxt, setInputToTxt] = useState(true);

  const [toEdit2, setToEdit2] = useState(true);

  const keyDownHandler = (e, index) => {
    if (!chapters[index].title.trim()) {
      handleOpendModalPublish({
        heading: 'Incomplete Chapter',
        message: `Please enter a title to this chapter`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: false,
      });
      return;
    }
    setChapterAddloading(true);
    if (channgeInputToTxt == false) {
      const inputChapter = [...chapters];
      inputChapter[index].toText = true;
      setChapters(inputChapter);
      setChanngeInputToTxt(true);
      setGiistChapterId(chapterId);
      if (toEdit == false) {
        setToEdit(true);
        giistChapEdit(chaptersCreateRes?.data?.chapters[index]?.chapter_id, index);
      } else {
        giistChapCreate(chapterId, index);
      }
      setIndexForMedia(index);
      setActiveSubChap(true);
    } else {
      setChanngeInputToTxt(false);
      setChapterAddloading(true);
    }
  };
  console.log(channgeInputToTxt, 'setChanngeInputToTxt setChanngeInputToTxt');

  useEffect(() => {
    const timer = setTimeout(() => {
      // Perform the action to close the modal here
      setModalShowErrorSuccess(false);
      // For example, you could update a state variable controlling the modal visibility
    }, 2000);
    // Cleanup function to clear the timer when the component unmounts or the effect re-runs
    return () => clearTimeout(timer);
  }, [modalShowErrorSuccess]);

  const DeleteSpecificChapter = async (indexChapid, awsPath) => {
    setDotProgressLoading(true);
    let tutorialMediaObj = await chaptersCreateRes?.data?.chapters[indexChapid]?.tutorialMedia;
    const chaptersList = [...chapters];

    let file_name = '';
    if (awsPath == 0) {
      file_name = `giists/video/${tutorialMediaObj?.title}`;
    } else if (awsPath == 2) {
      file_name = `giists/audio/${tutorialMediaObj?.title}`;
    } else if (awsPath == 1) {
      file_name = `giists/documents/${tutorialMediaObj?.title}`;
    }

    if (tutorialMediaObj) {
      await DeleteS3Media([file_name]);
    }
    if (chaptersList[indexChapid]?.title !== '') {
      const deleteParams = {
        giist_id: detailCreationRes?.id,
        chapter_id: chaptersCreateRes?.data?.chapters[indexChapid]?.chapter_id,
      };
      dispatch(DeleteChapter(accessToken, deleteParams, onDeleteChapterSuccess, onDeleteChapterError));
    }

    if (subindexForMedia == null) {
      chaptersList[indexForMedia].uploadedMedia = null;
    }

    chaptersList.splice(indexChapid, 1);
    setChapters(chaptersList);
    setDotProgressLoading(false);
  };

  const onDeleteChapterSuccess = (res) => {
    if (res?.data) {
      setChaptersCreateRes(res);
      console.log(res.data, 'response data for del chap');
      setDotProgressLoading(false);
      handleModal({
        heading: 'chapter Removed!',
        message: `The chapter has been deleted successfully`,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
      });
    }
  };
  const onDeleteChapterError = (err) => {
    if (err) {
      const message = err.message;
      console.log(err, 'response data for del chap');
      setDotProgressLoading(false);
      handleModal({
        heading: 'Something Wrong',
        message: `Oops, ${message}`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
      });
    }
  };

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('@LoginData'));
    setAccessToken(loginData?.access_token);
    setActiveSubChap(true);
    if (!chaptersCreateRes?.data?.chapters[index]?.title) {
      setChanngeInputToTxt(false);
    }
    return () => {};
  }, []);

  let chapterRes = chaptersCreateRes?.data?.chapters[index];

  const handleChange = (e, index) => {
    let inputChapter = [...chapters];
    let { name, value } = e.target;
    inputChapter[index][name] = value;
    inputChapter[index].toText = true;
    setChapters(inputChapter);
  };

  return (
    <div className={`${classes.moduleBorderWrap}`}>
      <div
        className={`${classes.module} ${indexForMedia === index ? `${classes.changeColor}` : ''}  `}
        onClick={() => {
          setIndexForMedia(index);
        }}
      >
        <div
          className={`border-bottom me-0 d-flex justify-content-between`}
          style={{ paddingTop: '10px', paddingBottom: '10px' }}
        >
          <div className="d-flex justify-content-start col-9">
            <p className=" px-2 d-flex medium-large justify-content-center align-items-center mb-0">{chapterId}.</p>
            {channgeInputToTxt == false ? (
              <div className="px-2 w-100 ">
                <input
                  id="chapter"
                  name="title"
                  type="text"
                  style={{
                    width: '100%',
                    background: 'rgba(215, 220, 223,0.9)',
                    border: '1px solid rgba(53, 52, 82, 0.3)',
                    borderRadius: '6px',
                    height: '32px',
                    flex: '1',
                  }}
                  className={`${classes.chapSubchapHeading} p-2`}
                  placeholder="Chapter Name"
                  autoFocus
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  value={chapter}
                  onKeyPress={(event) => event.key === 'Enter' && keyDownHandler(event, index)}
                />
              </div>
            ) : (
              chapter && (
                <div
                  className="px-2 "
                  onClick={() => {
                    if (!chapterRes?.subChapters.length) {
                      setIndexForMedia(index);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-btween">
                      <div className="me-1">
                        {chaptersCreateRes?.data?.chapters[index]?.tutorialMedia?.type == null &&
                        chaptersCreateRes?.data?.chapters[index]?.quiz == null &&
                        chaptersCreateRes?.data?.chapters[index]?.subChapters.length == 0 ? (
                          <HelpIcon sx={{ fontSize: '32px' }} />
                        ) : chaptersCreateRes?.data?.chapters[index]?.tutorialMedia?.type == 0 ? (
                          <VideocamIcon sx={{ fontSize: '32px' }} />
                        ) : chaptersCreateRes?.data?.chapters[index]?.tutorialMedia?.type == 1 ? (
                          <TextSnippetIcon sx={{ fontSize: '28px' }} />
                        ) : chaptersCreateRes?.data?.chapters[index]?.tutorialMedia?.type == 2 ? (
                          <AudioFileIcon sx={{ fontSize: '28px' }} />
                        ) : chaptersCreateRes?.data?.chapters[index]?.quiz ? (
                          <QuizIcon sx={{ fontSize: '28px' }} />
                        ) : (
                          <SubscriptionsRoundedIcon sx={{ fontSize: '28px' }} />
                        )}
                      </div>
                      <div className="pt-1">
                        {!chapterAddloading ? (
                          // <>{chapters[index]?.title}</>
                          <div className={`${classes.chapSubchapHeading} text-break`}>
                            {chaptersCreateRes?.data?.chapters[index]?.title}
                          </div>
                        ) : (
                          <SkeletonLoader height={20} width={100} borderRadius={10} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="d-flex align-items-center justify-content-between px-2">
            <div className="d-flex align-items-center ">
              {toEdit == true ? (
                <button
                  className="border-0 d-flex align-items-center me-2  bg-transparent"
                  onClick={() => {
                    setChanngeInputToTxt(false);
                    setToEdit(false);
                  }}
                >
                  <Image src="/assets/images/edit-pencil.svg" height={22} width={22} alt="cam icon" />
                </button>
              ) : (
                <button
                  className="border-0 bg-transparent d-flex me-2 align-items-center "
                  onClick={(event) => keyDownHandler(event, index)}
                >
                  <Image src="/assets/icons/CheckIcon.svg" height={22} width={22} alt="cam icon" />
                </button>
              )}
            </div>
            <button
              className=" border-0 bg-transparent d-flex align-items-center "
              onClick={() => {
                handleOpenDeleteChapter();
              }}
            >
              <Image src="/assets/icons/new/red_circle_cross.svg" height={22} width={22} alt="cross" />
            </button>
          </div>
          <DummyDeleteModal
            openModal={deleteChapterModal}
            handleCloseModal={handleCloseDeleteChapter}
            pathType={chaptersCreateRes?.data?.chapters[index]?.tutorialMedia?.type}
            heading={'Do you want to Delete?'}
            text={'Are you sure about to delete this Chapter permanently?'}
            image={'/assets/images/trash.svg'}
            buttonText1="No"
            buttonText2="Yes"
            handleClick={() =>
              DeleteSpecificChapter(index, chaptersCreateRes?.data?.chapters[index]?.tutorialMedia?.type)
            }
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

        {chapters[index].subChapters?.map((subItem, subIndex) => (
          <div className="mt-3" key={subIndex + 1}>
            <SubChapterCard
              setInputToTxt={setInputToTxt}
              inputToTxt={inputToTxt}
              subChapterTitle={subItem.title}
              indexForMedia={indexForMedia}
              parentIndex={index}
              subIndex={subIndex}
              subChapTitle={subItem}
              chapterId={chapterId}
              resChapterId={chaptersCreateRes?.data?.chapters[index]?.chapter_id}
              resChapterData={chaptersCreateRes?.data?.chapters[index]}
              chaptersCreateRes={chaptersCreateRes}
              setChaptersCreateRes={setChaptersCreateRes}
              giistSubChapCreate={giistSubChapCreate}
              giistSubchapEdit={giistSubchapEdit}
              subChapterIndex={subIndex + 1}
              setChapters={setChapters}
              chapters={chapters}
              subindexForMedia={subindexForMedia}
              setSubindexForMedia={setSubindexForMedia}
              setIndexForMedia={setIndexForMedia}
              chapterAddloading={chapterAddloading}
              setChapterAddloading={setChapterAddloading}
              activeSubChap={activeSubChap}
              setActiveSubChap={setActiveSubChap}
              detailCreationRes={detailCreationRes}
              accessToken={accessToken}
              setToEdit2={setToEdit2}
              setDotProgressLoading={setDotProgressLoading}
              toEdit2={toEdit2}
              handleOpendModalPublish={handleOpendModalPublish}
              handleModal={handleModal}
            />
            <div ref={messagesEndRef} className="d-flex" />
          </div>
        ))}

        {activeSubChap == true && (
          <div className="d-flex align-items-center justify-content-end py-2 pe-2">
            <button
              onClick={() => {
                AddNewSubChapter(index);
                setInputToTxt(false);
                setToEdit2(false);
                setSubindexForMedia(chapters[index].subChapters.length - 1);
              }}
              style={{ cursor: 'pointer' }}
              className="bg-transparent border-0 d-flex align-items-center"
            >
              <span className="regular-small pe-2" style={{ opacity: '0.6' }}>
                Add sub chapter
              </span>
              <Image src="/assets/icons/new/circle_add.svg" alt="add" width={20} height={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterCard;
