import React, { useState, useEffect, useCallback, useRef } from 'react';
import classes from './AddChapter.module.css';
import Image from 'next/image';
import ChapterCard from './ChapterCard';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import DeleteChapter from '../../../../../redux/actions/DeleteChapter';
import NotificationModal from '../../../../modals/giistcreation/NotificationModal';

const AddChapter = (props) => {
  const router = useRouter();

  const {
    setChapters,
    chapters,
    chaptersCreateRes,
    giistChapCreate,
    giistSubChapCreate,
    giistSubchapEdit,
    setGiistChapterId,
    activeSubChap,
    setActiveSubChap,
    setIndexForMedia,
    indexForMedia,
    subindexForMedia,
    setSubindexForMedia,
    giistChapEdit,
    detailCreationRes,
    setChaptersCreateRes,
    chapterAddloading,
    setChapterAddloading,
    DotProgressLoading,
    setDotProgressLoading,
    handleModal,
  } = props;

  const [toEditSub, setToEditSub] = useState(true);

  const AddNewChapter = () => {
    let myvariable = [...chapters];
    let totext = false;
    myvariable.push({
      id: myvariable.length + 1,
      title: '',
      toText: !totext,
      uploadedMedia: '',
      subChapters: [],
    });
    setChapters(myvariable);
    setToEditSub(false);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  const [channgeInputToTxt, setChanngeInputToTxt] = useState(true);

  useEffect(() => {
    if (!chapters.length) {
      AddNewChapter();
      setChanngeInputToTxt(false);
      setIndexForMedia(chapters.length);
      setToEditSub(false);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chapters]);

  return (
    <div className={`${classes.skyBackgroundBox} `}>
      <div className="px-3 py-2">
        <button
          className="border-0 bg-transparent d-flex align-items-center"
          style={{ opacity: detailCreationRes?.id !== null ? '' : 0.5 }}
          onClick={() => {
            if (detailCreationRes !== null) {
              AddNewChapter();
              setChanngeInputToTxt(false);
              setIndexForMedia(chapters.length);
            }
          }}
        >
          <span className="regular-small pe-2" style={{ opacity: '0.6' }}>
            Add chapter
          </span>
          <Image src="/assets/icons/new/circle_add.svg" alt="add" width={20} height={20} />
        </button>
      </div>
      <div className={`${classes.contentScroll}`} style={{ borderRadius: '10px', height: '365px', width: '100%' }}>
        {chapters?.length == 0 && (
          <div className="mx-auto text-center my-3">
            <Image
              src="/assets/icons/new/addchapterarrow.svg"
              className="pb-2"
              alt="arrow"
              width="80px"
              height="100px"
            />
            <p className="regular-small pe-2" style={{ opacity: '0.6' }}>
              Click on add chapter to add a new chapter
            </p>
          </div>
        )}
        <div className="px-3 py-2">
          {chapters?.map((item, index) => (
            <div className={index === 0 ? '' : 'pt-3'} key={index} id={index}>
              <ChapterCard
                chaptersCreateRes={chaptersCreateRes}
                channgeInputToTxt={channgeInputToTxt}
                setChanngeInputToTxt={setChanngeInputToTxt}
                soloInput={props.soloInput}
                chapterId={index + 1}
                indexForMedia={indexForMedia}
                chapter={item.title}
                item={item}
                index={index}
                setChapters={setChapters}
                chapters={chapters}
                giistChapCreate={giistChapCreate}
                giistSubChapCreate={giistSubChapCreate}
                giistSubchapEdit={giistSubchapEdit}
                setGiistChapterId={setGiistChapterId}
                activeSubChap={activeSubChap}
                setActiveSubChap={setActiveSubChap}
                setIndexForMedia={setIndexForMedia}
                subindexForMedia={subindexForMedia}
                setSubindexForMedia={setSubindexForMedia}
                giistChapEdit={giistChapEdit}
                detailCreationRes={detailCreationRes}
                chapterAddloading={chapterAddloading}
                setChapterAddloading={setChapterAddloading}
                setChaptersCreateRes={setChaptersCreateRes}
                toEditSub={toEditSub}
                setDotProgressLoading={setDotProgressLoading}
                DotProgressLoading={DotProgressLoading}
                handleModal={handleModal}
              />
              <div ref={messagesEndRef} className="d-flex" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddChapter;
