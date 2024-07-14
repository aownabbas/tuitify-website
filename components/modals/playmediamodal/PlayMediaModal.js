import { Box, Button, CardMedia, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import PrimaryMediaPlayer from '../../combine/mediaPlayer/PrimaryMediaPlayer';
import { useState } from 'react';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    border: 'none',
    outline: 'none',
  },
  centeringContent: {
    textAlign: 'center',
  },
  modalHeading: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '25px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0',
    paddingTop: '15px',
  },
  noButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    border: '1px solid #353452',
    '&:hover': {
      backgroundColor: 'inherit',
      textShadow: 'none',
      border: '1px solid #353452',
    },
  },
  yesButton: {
    width: '132px',
    height: '40px',
    borderRadius: '8px',
    color: '#FFFFFF !important',
    textShadow: 'none !important',
    textTransform: 'capitalize',
    backgroundColor: '#353452',
    '&:hover': {
      backgroundColor: '#353452',
      textShadow: 'none',
    },
  },
};

const PlayMediaModal = ({
  id,
  thumbnail,
  mediatabValue,
  mediaplayModal,
  handleCloseMediaplay,
  previewInteractionDoc,
  downloadlink,
  name,
}) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton } = style;

  function getExtension(filename) {
    return filename?.split('.').pop();
  }
  const [playing, setPlaying] = useState(true);

  let extension = getExtension(previewInteractionDoc);
  console.log(extension, 'my extension in interaction');

  console.log('mediatabValue', previewInteractionDoc);

  const handleDownloadFile = async (downloadlink) => {
    fetch(downloadlink, {
      method: 'GET',
      headers: {
        'Content-Type': `application/pdf`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        console.log('blob', blob);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };
  console.log('mediatabValue', mediatabValue);
  return (
    <Modal
      open={mediaplayModal}
      onClose={handleCloseMediaplay}
      aria-labelledby="delete-modal-title"
      aria-describedby="del-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          <Box>
            <Typography id="delete-modal-title" sx={modalHeading} mb={3}>
              Play Media
            </Typography>
            <Box>
              {mediatabValue == 'mp4' && (
                <Box
                  sx={{
                    width: '50vw',
                    height: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <video style={{ width: '100%', height: '100%' }} width="400" controls>
                    <source src={previewInteractionDoc} type="video/mp4" />
                    <source src={previewInteractionDoc} type="video/wmv" />
                    <source src={previewInteractionDoc} type="video/avi" />
                    <source src={previewInteractionDoc} type="video/ogg" />
                  </video>
                  {/* <PrimaryMediaPlayer link={previewInteractionDoc} /> */}
                </Box>
              )}
              {mediatabValue == 'mp4' && (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={thumbnail !== undefined ? thumbnail : '/assets/images/audio-thumb.svg'}
                    height={220}
                    width={300}
                    alt="music thumbnail"
                  />

                  <audio
                    controls
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      maxHeight: '100%',
                      maxWidth: '100%',
                      margin: 'auto',
                      objectFit: 'contain',
                    }}
                  >
                    <source src={previewInteractionDoc} type="audio/ogg" />
                    <source src={previewInteractionDoc} type="audio/mpeg" />
                    <source src={previewInteractionDoc} type="audio/avi" />
                  </audio>
                </Box>
              )}

              {/* called from chaptersTab.js */}
              {mediatabValue == 'doc' && (
                <Box
                  id={id}
                  sx={{
                    width: '50vw',
                    height: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  {extension == 'jpg' ||
                  extension == 'jpeg' ||
                  extension == 'png' ||
                  extension == 'svg' ||
                  extension == 'gif' ||
                  extension == 'JPG' ? (
                    <img
                      src={previewInteractionDoc}
                      height={'100%'}
                      width={'100%'}
                      style={{
                        borderRadius: '10px',
                        border: 'none',
                        position: 'absolute',
                        objectFit: 'contain',
                      }}
                      alt="Image not"
                    />
                  ) : extension == `pdf` ||
                    extension == `xlsx` ||
                    extension == `pptx` ||
                    extension == `xls` ||
                    extension == `ppt` ||
                    extension == `docx` ||
                    extension == 'doc' ? (
                    <>
                      <iframe
                        height="100%"
                        width="100%"
                        src={
                          extension == 'pdf'
                            ? `${previewInteractionDoc}#toolbar=0&scrollbar=0`
                            : `https://view.officeapps.live.com/op/embed.aspx?src=${previewInteractionDoc}&embedded=true`
                        }
                        loading="lazy"
                        style={{ borderRadius: '10px', border: 'none' }}
                        sandbox
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        background: 'linear-gradient(180deg, #F6F2F1,#F6F2F1, #ddd4d4,rgb(59 64 84))',
                        aspectRatio: '16/9',

                        height: '380px',
                        width: '100%',
                        borderRadius: '10px',
                      }}
                    >
                      <PrimaryMediaPlayer playing={playing} setPlaying={setPlaying} link={previewInteractionDoc} />
                    </div>
                  )}
                </Box>
              )}
            </Box>
            {/* need change this in aws link for production bucket link */}
            <Box sx={buttonGroup}>
              <Button
                variant="contained"
                sx={yesButton}
                onClick={() => handleDownloadFile(`https://giistyxelor.s3.amazonaws.com/${downloadlink}`)}
              >
                download
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PlayMediaModal;
