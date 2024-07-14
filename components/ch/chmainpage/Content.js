import React, { useEffect, useState } from 'react';
import Interaction from './interaction/Interaction';
import BriffDetails from './briifdetail/BriffDetails';
import BriifActivityBar from './tooltip/BriifActivityBar';
import { useSelector } from 'react-redux';

const Content = (props) => {
  const { data } = useSelector((state) => state.sidebar);
  const [isMobile, setIsMobile] = useState('Desktop');

  const [heightofWindow, setHeightofWindow] = useState(window.innerHeight);
  const [widthofWindow, setWidthofWindow] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setHeightofWindow(window.innerHeight);
      setWidthofWindow(window.innerWidth);

      if (window.innerWidth <= 1220) {
        setIsMobile('');
      } else {
        setIsMobile('Desktop');
      }
    }
    // handleResize();
    window.addEventListener('load', handleResize);
    window.addEventListener('visibilitychange', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {

    };
  }, []);

  return (
    <>
      <div
        className="row w-100  mx-auto  px-2 pb-md-0 pb-3"
        style={{ overflowY: !isMobile ? 'scroll' : 'hidden', overflowX: 'hidden' }}
      >
        <div className="col-12 col-sm-12 col-lg-4 col-xl-3 px-1">
          <div className="activitybar innerbox m-0">
            <BriifActivityBar
              //loading
              setActiveBarLoading={props.setActiveBarLoading}
              setBriifDetailsLoading={props.setBriifDetailsLoading}
              activeBarLoading={props.activeBarLoading}
              receivedActiveIcon={props.receivedActiveIcon}
              setReceivedActiveIcon={props.setReceivedActiveIcon}
              sendActiveIcon={props.sendActiveIcon}
              setSendActiveIcon={props.setSendActiveIcon}
              archivedActiveIcon={props.archivedActiveIcon}
              setArchivedActiveIcon={props.setArchivedActiveIcon}
              playedBriifData={props.playedBriifData}
              setForwardBriifData={props.setForwardBriifData}
              ForwardBriifData={props.ForwardBriifData}
              handleForwardBriif={props.handleForwardBriif}
              handlePlayedBriif={props.handlePlayedBriif}
              handleDeleteReceivedBriif={props.handleDeleteReceivedBriif}
              handleDeleteSendBriif={props.handleDeleteSendBriif}
              handleUnArchivedBriif={props.handleUnArchivedBriif}
              handleArchivedBriif={props.handleArchivedBriif}
              handleUnReadBriif={props.handleUnReadBriif}
              handleReadBriif={props.handleReadBriif}
              handleReceivedBriifs={props.handleReceivedBriifs}
              handleArchivedBriifs={props.handleArchivedBriifs}
              handleSendBriifs={props.handleSendBriifs}
              sendBriifsData={props.sendBriifsData}
              receivedBriifsData={props.receivedBriifsData}
              archivedBriifsData={props.archivedBriifsData}
              briifAction={props.briifAction}
              playBriifId={props.playBriifId}
              playBriifAId={props.playBriifAId}
              playBriifCount={props.playBriifCount}
              setHandleAlertClose={props.setHandleAlertClose}
              briifId={props.briifId}
              briifAId={props.briifAId}
              briifCount={props.briifCount}
              setBriifId={props.setBriifId}
              setBriifAId={props.setBriifAId}
              setBriifCount={props.setBriifCount}
              setBriifAction={props.setBriifAction}
              setIsRead={props.setIsRead}
              isRead={props.isRead}
              searchValue={props.searchValue}
              searchData={props.searchData}
              setSearchSendData={props.setSearchSendData}
              setSearchArchiveData={props.setSearchArchiveData}
              setLoading={props.setLoading}
              setDraftBriifsData={props.setDraftBriifsData}
              draftBriifsData={props.draftBriifsData}
              handleDraftBriffs={props.handleDraftBriffs}
              handleDeleteDraftBriff={props.handleDeleteDraftBriff}
              searchDraftData={props.searchDraftData}
              setSearchDraftData={props.setSearchDraftData}
            />
          </div>
        </div>
        <div className="col-12 col-sm-12 col-lg-8 col-xl-6 mt-3 mt-lg-0 px-1">
          <div className="innerbox m-0">
            <BriffDetails
              setBriifDetailsLoading={props.setBriifDetailsLoading}
              briifDetailsLoading={props.briifDetailsLoading}
              playedBriifData={props.playedBriifData}
              setForwardBriifData={props.setForwardBriifData}
              ForwardBriifData={props.ForwardBriifData}
              handlePlayedBriif={props.handlePlayedBriif}
              handleDeleteReceivedBriif={props.handleDeleteReceivedBriif}
              handleDeleteSendBriif={props.handleDeleteSendBriif}
              handleUnArchivedBriif={props.handleUnArchivedBriif}
              handleArchivedBriif={props.handleArchivedBriif}
              handleUnReadBriif={props.handleUnReadBriif}
              handleReadBriif={props.handleReadBriif}
              handleSendBriif={props.handleSendBriif}
              handleReceivedBriif={props.handleReceivedBriif}
              handleReceivedBriifs={props.handleReceivedBriifs}
              handleArchivedBriifs={props.handleArchivedBriifs}
              handleSendBriifs={props.handleSendBriifs}
              briifAction={props.briifAction}
              playBriifId={props.playBriifId}
              playBriifAId={props.playBriifAId}
              playBriifCount={props.playBriifCount}
              setBriifAction={props.setBriifAction}
              setIsRead={props.setIsRead}
              isRead={props.isRead}
              setLoading={props.setLoading}
              handleDraftBriffs={props.handleDraftBriffs}
              handleDeleteDraftBriff={props.handleDeleteDraftBriff}
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-12 mt-3 mt-xl-0 col-lg-12 col-xl-3 px-1 mb-5 mb-xl-0 pb-5 pb-md-4 pb-xl-0">
          <div className="innerbox m-0 mx-auto mb-5">
            <Interaction
              setInteractionsLoading={props.setInteractionsLoading}
              interactionsLoading={props.interactionsLoading}
              setInteractionsData={props.setInteractionsData}
              interactionsData={props.interactionsData}
              playBriifId={props.playBriifId}
              playBriifTitle={props.playBriifTitle}
              setDraftBriifsData={props.setDraftBriifsData}
              draftBriifsData={props.draftBriifsData}
              handleDraftBriffs={props.handleDraftBriffs}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
