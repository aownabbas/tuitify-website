import React from 'react';
import classes from './AddChapter.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Chapters from '../Chapters';
import SkeletonLoader from '../../../kh_home/SkeletonLoader';
import HelpIcon from '@mui/icons-material/Help';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuizIcon from '@mui/icons-material/Quiz';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useDispatch } from 'react-redux';
import DeleteChapter from '../../../../../redux/actions/DeleteChapter';
import DummyDeleteModal from '../../../../modals/deletemodal/DummyDeleteModal';
import DeleteS3Media from '../../../../../utils/DeleteS3Media';
import { useEffect } from 'react';

const SubChapterCard = (props) => {
  const {
    subChapterTitle,
    subChapTitle,
    chapterId,
    resChapterId,
    giistSubChapCreate,
    giistSubchapEdit,
    subChapterIndex,
    subItem,
    setChapters,
    chapters,
    parentIndex,
    subIndex,
    resChapterData,
    subindexForMedia,
    setSubindexForMedia,
    chaptersCreateRes,
    setChaptersCreateRes,
    setIndexForMedia,
    indexForMedia,
    chapterAddloading,
    setChapterAddloading,
    activeSubChap,
    setActiveSubChap,
    detailCreationRes,
    accessToken,
    setToEdit2,
    toEdit2,
    setDotProgressLoading,
    handleOpendModalPublish,
    handleModal,
  } = props;

  let chapterResId = chaptersCreateRes?.data?.chapters[parentIndex];
  let subChapterResObj = chapterResId?.subChapters[subIndex];

  const [inputToTxt, setInputToTxt] = useState(props.inputToTxt == true ? true : false);
  const [toEdit, setToEdit] = useState(toEdit2);

  const [deleteChapterModal, setDeleteSubChapterModal] = useState(false);
  const handleOpenDeleteChapter = () => setDeleteSubChapterModal(true);
  const handleCloseDeleteChapter = () => setDeleteSubChapterModal(false);

  const dispatch = useDispatch();

  const subChapChangeHandler = (e, pIndex, cIndex) => {
    const inputChapter = [...chapters];
    const { name, value } = e.target;
    inputChapter[pIndex].subChapters[cIndex][name] = value;
    inputChapter[pIndex].subChapters[cIndex].toText = true;
    setChapters(inputChapter);
  };

  const keyDownHandler = (e, parentIndex, subIndex) => {
    if (!chapters[parentIndex].subChapters[subIndex].title.trim()) {
      handleOpendModalPublish({
        heading: 'Incomplete Chapter',
        message: `Please enter a title to this sub chapter`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: false,
      });
      return;
    }
    if (!chaptersCreateRes?.data?.chapters[parentIndex]?.title.trim()) {
      handleOpendModalPublish({
        heading: 'Incomplete Chapter',
        message: `Please enter a title to the chapter before sub chapter`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
        move: false,
      });
      return;
    }
    if (inputToTxt == false) {
      setChapterAddloading(true);
      setActiveSubChap(true);
      setSubindexForMedia(subIndex);
      setToEdit(true);
      setInputToTxt(true);
      if (subChapterResObj?.chapter_id) {
        giistSubchapEdit(subChapterResObj?.chapter_id, subChapterResObj?.parent_id, subIndex);
      } else {
        giistSubChapCreate(resChapterId, parentIndex, subIndex);
      }
    } else {
      setChapterAddloading(true);
      setInputToTxt(false);
    }
  };

  const DeleteSpecificSubChapter = async (pIndex, cIndex, awsPath) => {
    setDotProgressLoading(true);
    let chapterId = chaptersCreateRes?.data?.chapters[pIndex];
    let subChapId = chapterId?.subChapters[cIndex];

    // let tutorialMediaObj = subChapId?.tutorialMedia?.title;
    let tutorialMediaObj = resChapterData?.subChapters[cIndex]?.tutorialMedia?.title;

    let file_name = '';
    if (awsPath == 0) {
      file_name = `giists/video/${tutorialMediaObj}`;
    } else if (awsPath == 2) {
      file_name = `giists/audio/${tutorialMediaObj}`;
    } else if (awsPath == 1) {
      file_name = `giists/documents/${tutorialMediaObj}`;
    }

    if (tutorialMediaObj) {
      await DeleteS3Media([file_name]);
    }
    const newSubList = [...chapters];

    if (newSubList[pIndex].subChapters[cIndex]?.title !== '') {
      const deleteParams = {
        giist_id: detailCreationRes?.id,
        chapter_id: subChapId?.chapter_id,
      };
      dispatch(DeleteChapter(accessToken, deleteParams, onDeleteSubChapterSuccess, onDeleteSubChapterError));
    }

    newSubList[pIndex].subChapters?.splice(cIndex, 1);
    setChapters(newSubList);
    setDotProgressLoading(false);
  };

  const onDeleteSubChapterSuccess = (res) => {
    if (res.data) {
      setChaptersCreateRes(res);
      console.log(res.data, 'sub chapter delete res');
      setDotProgressLoading(false);
      handleModal({
        heading: 'Subchapter Removed!',
        message: `The subchapter has been deleted successfully`,
        buttonText: 'Okay',
        image: '/assets/icons/new/checkedtick.svg',
      });
    }
  };
  const onDeleteSubChapterError = (err) => {
    if (err) {
      const message = err.message;
      console.log(err, 'sub chapter delete res');
      setDotProgressLoading(false);
      handleModal({
        heading: 'Something Wrong',
        message: `Oops, ${message}`,
        buttonText: 'Try Again',
        image: '/assets/icons/danger.svg',
      });
    }
  };

  const handleSelectSubChap = (parentIndex, subIndex) => {
    setIndexForMedia(parentIndex);
    setSubindexForMedia(subIndex);
  };

  useEffect(() => {
    if (!subChapTitle.title) {
      setInputToTxt(false);
      setToEdit(false);
    }
  }, []);

  return (
    <div
      className={`border-bottom d-flex justify-content-between ps-4 ${
        parentIndex == indexForMedia && subindexForMedia === subIndex ? `${classes.subChapChangeColor}` : ''
      }`}
      style={{ paddingTop: '10px', paddingBottom: '10px' }}
      onClick={() => {
        handleSelectSubChap(parentIndex, subIndex);
      }}
    >
      <div className="d-flex justify-content-start col-9 ">
        <p className="px-2 d-flex medium-large justify-content-center align-items-center mb-0">
          {chapterId}.{subChapterIndex}
        </p>
        {inputToTxt == false ? (
          <div className="px-2 w-100">
            <input
              id="chapter"
              name="title"
              type="text"
              style={{
                fontSize: '14px',
                width: '100%',
                background: 'rgba(215, 220, 223,0.5)',
                border: '1px solid rgba(53, 52, 82, 0.3)',
                borderRadius: '6px',
                height: '32px',
              }}
              className="p-2"
              placeholder="Add Subchapter"
              autoFocus
              onChange={(e) => {
                subChapChangeHandler(e, parentIndex, subIndex);
              }}
              value={subChapterTitle}
              onKeyPress={(event) => event.key === 'Enter' && keyDownHandler(event, parentIndex, subIndex)}
            />
          </div>
        ) : (
          <div className="px-2 w-100">
            <div
              className="d-flex justify-content-between"
              onClick={() => {
                setIndexForMedia(parentIndex);
                setSubindexForMedia(subIndex);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-btween align-items-center ">
                {resChapterData?.subChapters[subIndex]?.tutorialMedia?.type == null &&
                resChapterData?.subChapters[subIndex]?.quiz == null ? (
                  <HelpIcon sx={{ fontSize: '32px' }} />
                ) : resChapterData?.subChapters[subIndex]?.tutorialMedia?.type == 0 ? (
                  <VideocamIcon sx={{ fontSize: '32px' }} />
                ) : resChapterData?.subChapters[subIndex]?.tutorialMedia?.type == 1 ? (
                  <TextSnippetIcon sx={{ fontSize: '28px' }} />
                ) : resChapterData?.subChapters[subIndex]?.tutorialMedia?.type == 2 ? (
                  <AudioFileIcon sx={{ fontSize: '28px' }} />
                ) : resChapterData?.subChapters[subIndex]?.quiz !== null ? (
                  <QuizIcon sx={{ fontSize: '28px' }} />
                ) : (
                  ''
                )}
                <div className="ms-1 text-break">
                  {!chapterAddloading ? (
                    // resChapterData?.subChapters[subIndex]?.title
                    <p className={classes.chapSubchapHeading}>{subChapTitle.title}</p>
                  ) : (
                    <SkeletonLoader height={20} className="mt-2" borderRadius="15px" width={100} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="d-flex align-items-center justify-content-between px-2">
        <div className="d-flex align-items-center ">
          {toEdit == true ? (
            <button
              className="border-0 d-flex align-items-center me-2  bg-transparent"
              onClick={() => {
                setInputToTxt(false);
                setToEdit(false);
              }}
            >
              <Image src="/assets/images/edit-pencil.svg" height={22} width={22} alt="cam icon" />
            </button>
          ) : (
            <button
              className="border-0 bg-transparent d-flex me-2 align-items-center "
              onClick={(event) => {
                keyDownHandler(event, parentIndex, subIndex);
              }}
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
        heading={'Do you want to Delete?'}
        text={'Are you sure about to delete this Sub Chapter permanently?'}
        image={'/assets/images/trash.svg'}
        buttonText1="No"
        buttonText2="Yes"
        handleClick={() =>
          DeleteSpecificSubChapter(parentIndex, subIndex, resChapterData?.subChapters[subIndex]?.tutorialMedia?.type)
        }
      />
    </div>
  );
};

export default SubChapterCard;
