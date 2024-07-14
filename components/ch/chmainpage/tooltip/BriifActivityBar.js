import React from 'react';
import { useSelector } from 'react-redux';
import TooltipStructure from './TooltipStructure';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';

const BriifActivityBar = (props) => {
  const { data } = useSelector((state) => state.sidebar);
  const sevenDummyArray = [1, 2, 3, 4, 5, 6, 7];
  const fiveDummyArray = [1, 2, 3, 4, 5];
  return (
    <div style={{ overflowY: 'hidden', overflowX: 'hidden', borderRadius: '25px', height: '100%' }}>
      <div className="text-white">
        {props.activeBarLoading ? (
          <>
            <div className="row mt-4 mx-auto ms-2">
              <div className="col-6">
                <Skeleton
                  className="d-inline-flex"
                  animation="wave"
                  height={20}
                  width="100%"
                  style={{ marginBottom: 10 }}
                />
              </div>
              <div className="col-3">
                <Skeleton
                  className="position-relative overflow-hidden text-center"
                  animation="wave"
                  style={{ borderRadius: '40%' }}
                  variant="circular"
                  width={30}
                  height={20}
                />
              </div>
            </div>
            {sevenDummyArray.map((item, index) => {
              return (
                <>
                  <div key={index} className="row mt-4 mx-auto d-flex justify-content-center">
                    <div className="col-xxl-2 col-xl-3">
                      <Skeleton
                        className="position-relative overflow-hidden text-center"
                        animation="wave"
                        style={{ borderRadius: '50% 50% 0% 50%' }}
                        variant="circular"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="col-xxl-10 mt-2 col-9">
                      <div className="row">
                        <div className="col-8">
                          <Skeleton
                            className="d-inline-flex"
                            animation="wave"
                            height={17}
                            width="70%"
                            style={{ marginBottom: 13 }}
                          />
                        </div>
                        <div className="col-4 me-auto pe-0">
                          <Skeleton
                            className="ms-auto"
                            animation="wave"
                            height={17}
                            width="60%"
                            style={{ marginBottom: 10 }}
                          />
                        </div>
                      </div>
                      <Skeleton animation="wave" height={12} width="80%" style={{ marginBottom: 3 }} />
                      <Skeleton animation="wave" height={12} width="80%" style={{ marginBottom: 10 }} />
                      <div className="row col-8 ms-auto mb-2">
                        {fiveDummyArray.map((item, index) => {
                          return (
                            <>
                              <div key={index} className="col-1 p-2">
                                <Skeleton
                                  className="position-relative overflow-hidden text-center"
                                  animation="wave"
                                  style={{ borderRadius: '50% 50% 50% 50%' }}
                                  variant="circular"
                                  width={10}
                                  height={10}
                                />
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <Skeleton animation="wave" height={4} width="90%" className="mx-auto" style={{ marginBottom: 10 }} />
                </>
              );
            })}
          </>
        ) : (
          <>
            {data == 'receive' && (
              <TooltipStructure
                receivedBriifsData={props.receivedBriifsData}
                handleReceivedBriifs={props.handleReceivedBriifs}
                setReceivedBriifsData={props.setReceivedBriifsData}
                handlePlayedBriif={props.handlePlayedBriif}
                handleDeleteReceivedBriif={props.handleDeleteReceivedBriif}
                handleDeleteSendBriif={props.handleDeleteSendBriif}
                handleArchivedBriif={props.handleArchivedBriif}
                handleUnReadBriif={props.handleUnReadBriif}
                handleReadBriif={props.handleReadBriif}
                handleForwardBriif={props.handleForwardBriif}
                setForwardBriifData={props.setForwardBriifData}
                ForwardBriifData={props.ForwardBriifData}
                setHandleAlertClose={props.setHandleAlertClose}
                briifId={props.briifId}
                briifAId={props.briifAId}
                briifCount={props.briifCount}
                setBriifId={props.setBriifId}
                setBriifAId={props.setBriifAId}
                setBriifCount={props.setBriifCount}
                setBriifAction={props.setBriifAction}
                briifAction={props.briifAction}
                setIsRead={props.setIsRead}
                isRead={props.isRead}
                action="recive"
                //playbriif id
                playBriifId={props.playBriifId}
                all="60"
                latest="6"
                // search
                searchValue={props.searchValue}
                searchData={props.searchData}
                setLoading={props.setLoading}
              />
            )}
            {data == 'sent' && (
              <TooltipStructure
                sendBriifsData={props.sendBriifsData}
                handleSendBriifs={props.handleSendBriifs}
                style={{ zIndex: '-99999' }}
                handlePlayedBriif={props.handlePlayedBriif}
                handleDeleteReceivedBriif={props.handleDeleteReceivedBriif}
                handleDeleteSendBriif={props.handleDeleteSendBriif}
                handleArchivedBriif={props.handleArchivedBriif}
                handleSendBriif={props.handleSendBriif}
                handleUnReadBriif={props.handleUnReadBriif}
                handleReadBriif={props.handleReadBriif}
                handleForwardBriif={props.handleForwardBriif}
                setForwardBriifData={props.setForwardBriifData}
                ForwardBriifData={props.ForwardBriifData}
                briifId={props.briifId}
                briifAId={props.briifAId}
                briifCount={props.briifCount}
                setBriifId={props.setBriifId}
                setBriifAId={props.setBriifAId}
                setBriifCount={props.setBriifCount}
                setBriifAction={props.setBriifAction}
                briifAction={props.briifAction}
                setIsRead={props.setIsRead}
                isRead={props.isRead}
                action="sent"
                //playbriif id
                playBriifId={props.playBriifId}
                all="30"
                latest="3"
                // search
                setSearchSendData={props.setSearchSendData}
                searchValue={props.searchValue}
                setLoading={props.setLoading}
              />
            )}
            {data == 'archived' && (
              <TooltipStructure
                archivedBriifsData={props.archivedBriifsData}
                handlePlayedBriif={props.handlePlayedBriif}
                handleUnArchivedBriif={props.handleUnArchivedBriif}
                handleArchivedBriifs={props.handleArchivedBriifs}
                handleForwardBriif={props.handleForwardBriif}
                setForwardBriifData={props.setForwardBriifData}
                ForwardBriifData={props.ForwardBriifData}
                briifId={props.briifId}
                briifAId={props.briifAId}
                briifCount={props.briifCount}
                setBriifId={props.setBriifId}
                setBriifAId={props.setBriifAId}
                setBriifCount={props.setBriifCount}
                setBriifAction={props.setBriifAction}
                briifAction={props.briifAction}
                action="archive"
                //playbriif id
                playBriifId={props.playBriifId}
                all="40"
                latest="4"
                // search
                setSearchArchiveData={props.setSearchArchiveData}
                searchValue={props.searchValue}
                setLoading={props.setLoading}
              />
            )}
            {data == 'draft' && (
              <TooltipStructure
                draftBriifsData={props.draftBriifsData}
                handlePlayedBriif={props.handlePlayedBriif}
                handleUnArchivedBriif={props.handleUnArchivedBriif}
                handleArchivedBriifs={props.handleArchivedBriifs}
                handleForwardBriif={props.handleForwardBriif}
                setForwardBriifData={props.setForwardBriifData}
                ForwardBriifData={props.ForwardBriifData}
                handleDraftBriffs={props.handleDraftBriffs}
                briifId={props.briifId}
                briifAId={props.briifAId}
                briifCount={props.briifCount}
                setBriifId={props.setBriifId}
                setBriifAId={props.setBriifAId}
                setBriifCount={props.setBriifCount}
                setBriifAction={props.setBriifAction}
                briifAction={props.briifAction}
                action="draft"
                //playbriif id
                playBriifId={props.playBriifId}
                all="40"
                latest="4"
                // search
                setSearchArchiveData={props.setSearchArchiveData}
                searchValue={props.searchValue}
                setLoading={props.setLoading}
                setSearchDraftData={props.setSearchDraftData}
                searchDraftData={props.searchDraftData}
                handleDeleteDraftBriff={props.handleDeleteDraftBriff}
              />
            )}
            {data != 'receive' && data != 'sent' && data != 'archived' && data != 'draft' && (
              <>
                <div className="d-flex align-items-end justify-content-center" style={{ height: '250px' }}>
                  <Image
                    src="/assets/icons/new/empty_tooltip.svg"
                    width="200px"
                    height="200px"
                    alt="empty"
                    className="d-block"
                  />
                </div>
                <br />
                <br />
                <br />
                <p className="text-white text-center ultralight">There are no briif available </p>
                <p className="text-white text-center ultralight">in this section</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BriifActivityBar;
