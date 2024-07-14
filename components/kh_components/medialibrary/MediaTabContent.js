import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import UserGiists from '../../combine/user_profile/publishedgiists/UserGiists';
import UploadMediaModal from '../../modals/giistcreation/UploadMediaModal';
import SuccessErrorModal from '../../modals/successErrormodal/SuccessErrorModal';
import usePagination from '../../pagination/Pagination';
import WebPagination from '../../pagination/WebPagination';
import SkeletonLoader from '../kh_home/SkeletonLoader';
import MediaSkeleton from './MediaSkeleton';

const MediaTabContent = ({
  serverResponse,
  pageStates,
  pageNum,
  PER_PAGE,
  docThumbnail,
  // responseItems,
  // audioResponseItems,
  // documentResponseItems,
  handleOpenModal,
  openModal,
  handleCloseModal,
  mediatabValue,
  tabHeading,
  tabSubheading,
  emptyStyleBox,
  emptyBoxTypo,
  emptyBoxSubTypo,
  modalButton,
  accessToken,
  platformData,
  refreshMedias,
  S3_BUCKET,
  REGION,
  AccessKeyId,
  SecretAccessKey,
  successErrorOpenModal,
  handleOpenSuccessErrorModal,
  handleCloseSuccessErrorModal,
  setErrorinModal,
  errorinModal,
}) => {
  const numberItems = serverResponse?.totalItems;
  const responseItems = serverResponse?.items;

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  // console.log(responseItems, 'responseItems responseItems');

  const [toUpdateTitle, setToupdateTitle] = useState('');
  const [updateId, setUpdateId] = useState('');

  const count = Math.ceil(numberItems / PER_PAGE);
  const cardData = usePagination(responseItems, numberItems, PER_PAGE);

  const fetchedItemsPaginationHandler = (e, p) => {
    pageStates(p);
    cardData.jump(p);
  };

  return (
    <div>
      {mediatabValue == 0 && (
        <>
          {/* {!responseItems || numberItems == 0 ? ( */}
          {numberItems == 0 ? (
            <Box>
              <Typography component={'p'} sx={tabHeading}>
                Media Library
                <Typography component={'p'} sx={tabSubheading}>
                  (MP4, AVI, MOV) files are accepted
                </Typography>
              </Typography>
              <Box sx={emptyStyleBox}>
                <Image src="/assets/images/video-play-icon.svg" height={55} width={55} alt="video play icon" />
                <Typography component={'p'} pt={3} sx={emptyBoxTypo}>
                  Your Video Library is Empty
                </Typography>
                <Typography component={'p'} sx={emptyBoxSubTypo} mb={4}>
                  Upload videos (MP4, AVI, MOV) to your media library by drag & drop or upload from your desktop
                </Typography>
                <Button variant="contained" sx={modalButton} onClick={handleOpenModal}>
                  Upload Video
                </Button>
              </Box>
            </Box>
          ) : responseItems !== undefined ? (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component={'p'} sx={tabHeading}>
                  Media Library
                  <Typography component={'p'} sx={tabSubheading}>
                    (MP4, AVI, MOV) files are accepted
                  </Typography>
                </Typography>
                <Button variant="contained" sx={modalButton} onClick={handleOpenModal}>
                  Upload Video
                </Button>
              </Box>
              <Grid container spacing={2} pt={3}>
                {responseItems.length > 0 &&
                  responseItems.map((item) => (
                    <Grid item md={4} xs={12} key={item.id}>
                      <UserGiists
                        id={item.id}
                        file_name={`mediaLibrary/video/${item.file_name}`}
                        imagename={`mediaLibrary/images/${item.imagename}`}
                        title={item.title}
                        mediatabValue={mediatabValue}
                        thumbnail={awsLink + 'mediaLibrary/images/' + item.imagename}
                        previewMedia={awsLink + 'mediaLibrary/video/' + item.file_name}
                        image=""
                        toUpdateTitle={toUpdateTitle}
                        setToupdateTitle={setToupdateTitle}
                        updateId={updateId}
                        setUpdateId={setUpdateId}
                        refreshMedias={refreshMedias}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ) : (
            <MediaSkeleton tabHeading={tabHeading} tabSubheading={tabSubheading} />
          )}
        </>
      )}
      {mediatabValue == 1 && (
        <Box>
          {/* {!audioResponseItems || audioResponseItems.length == 0 ? ( */}
          {numberItems == 0 ? (
            <Box>
              <Typography component={'p'} sx={tabHeading}>
                Media Library 2
                <Typography component={'p'} sx={tabSubheading}>
                  (MP4, AVI, MOV) files are accepted
                </Typography>
              </Typography>
              <Box sx={emptyStyleBox}>
                <Image src="/assets/images/microphone.svg" height={55} width={55} alt="video play icon" />
                <Typography component={'p'} pt={3} sx={emptyBoxTypo}>
                  Your Audio Library is Empty
                </Typography>
                <Typography component={'p'} sx={emptyBoxSubTypo} mb={3}>
                  Upload audios to your media library by drag & drop or upload from your desktop
                </Typography>
                <Button variant="contained" sx={modalButton} onClick={handleOpenModal}>
                  Upload Audio
                </Button>
              </Box>
            </Box>
          ) : responseItems !== undefined ? (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component={'p'} sx={tabHeading}>
                  Media Library
                  <Typography component={'p'} sx={tabSubheading}>
                    (MP4, AVI, MOV) files are accepted
                  </Typography>
                </Typography>
                <Button variant="contained" sx={modalButton} onClick={handleOpenModal}>
                  Upload Audio
                </Button>
              </Box>
              <Grid container spacing={2} pt={3}>
                {responseItems.length > 0 &&
                  responseItems.map((item) => (
                    <Grid item md={4} xs={12} key={item.id}>
                      <UserGiists
                        id={item.id}
                        file_name={`mediaLibrary/audio/${item.file_name}`}
                        imagename={`mediaLibrary/images/${item.imagename}`}
                        title={item.title}
                        mediatabValue={mediatabValue}
                        thumbnail={awsLink + 'mediaLibrary/images/' + item.imagename}
                        previewMedia={awsLink + 'mediaLibrary/audio/' + item.file_name}
                        image=""
                        toUpdateTitle={toUpdateTitle}
                        setToupdateTitle={setToupdateTitle}
                        updateId={updateId}
                        setUpdateId={setUpdateId}
                        refreshMedias={refreshMedias}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ) : (
            <MediaSkeleton tabHeading={tabHeading} tabSubheading={tabSubheading} />
          )}
        </Box>
      )}
      {mediatabValue == 2 && (
        <Box>
          {numberItems == 0 ? (
            <Box>
              <Typography component={'p'} sx={tabHeading}>
                Media Library
                <Typography component={'p'} sx={tabSubheading}>
                  (MP4, AVI, MOV) files are accepted
                </Typography>
              </Typography>
              <Box sx={emptyStyleBox}>
                <Image src="/assets/images/document-text.svg" height={55} width={55} alt="video play icon" />
                <Typography component={'p'} pt={3} sx={emptyBoxTypo}>
                  Your Document Library is Empty
                </Typography>
                <Typography component={'p'} sx={emptyBoxSubTypo} mb={3}>
                  Upload documents (.pdf / .ppt / .xlsx) to your media library by drag & drop or upload from your
                  desktop
                </Typography>
                <Button variant="contained" sx={modalButton} onClick={handleOpenModal}>
                  Upload Document
                </Button>
              </Box>
            </Box>
          ) : responseItems !== undefined ? (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component={'p'} sx={tabHeading}>
                  Media Library
                  <Typography component={'p'} sx={tabSubheading}>
                    (MP4, AVI, MOV) files are accepted
                  </Typography>
                </Typography>
                <Button variant="contained" sx={modalButton} onClick={handleOpenModal}>
                  Upload Document
                </Button>
              </Box>
              <Grid container spacing={2} pt={3}>
                {responseItems.length > 0 &&
                  responseItems.map((item) => (
                    <Grid item md={4} xs={12} key={item.id}>
                      <UserGiists
                        id={item.id}
                        file_name={`mediaLibrary/documents/${item.file_name}`}
                        imagename={`mediaLibrary/images/${item.imagename}`}
                        title={item.title}
                        mediatabValue={mediatabValue}
                        thumbnail={awsLink + 'mediaLibrary/images/' + item.imagename}
                        previewMedia={awsLink + 'mediaLibrary/documents/' + item.file_name}
                        image=""
                        toUpdateTitle={toUpdateTitle}
                        setToupdateTitle={setToupdateTitle}
                        updateId={updateId}
                        setUpdateId={setUpdateId}
                        refreshMedias={refreshMedias}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ) : (
            <MediaSkeleton tabHeading={tabHeading} tabSubheading={tabSubheading} />
          )}
        </Box>
      )}
      <div className="row">
        <div className="d-flex justify-content-center">
          {responseItems == undefined ? (
            <SkeletonLoader height={25} borderRadius="15px" width="20%" />
          ) : (
            <WebPagination
              handleChange={fetchedItemsPaginationHandler}
              count={count}
              page={pageNum}
              size="small"
              shape="outlined"
            />
          )}
        </div>
      </div>
      <UploadMediaModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        mediatabValue={mediatabValue}
        accessToken={accessToken}
        platformData={platformData}
        refreshMedias={refreshMedias}
        S3_BUCKET={S3_BUCKET}
        REGION={REGION}
        AccessKeyId={AccessKeyId}
        SecretAccessKey={SecretAccessKey}
        setErrorinModal={setErrorinModal}
        handleOpenSuccessErrorModal={handleOpenSuccessErrorModal}
      />
      <SuccessErrorModal
        open={successErrorOpenModal}
        handleCloseMediaplay={handleCloseSuccessErrorModal}
        mediatabValue={mediatabValue}
        modalMessage={errorinModal ? errorinModal : 'Uploaded Media in Chapter successfully!'}
        refreshMedias={refreshMedias}
      />
    </div>
  );
};

export default MediaTabContent;
