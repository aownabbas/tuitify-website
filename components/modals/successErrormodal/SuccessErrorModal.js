/** this modal is made to show success or error alerts and specifically for giistcreation uplaoding webcam video */
import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import ModalStyles from '../modalsStyles/ModalStyles';
const SuccessErrorModal = ({
  open,
  handleCloseMediaplay,
  chaptersCreateRes,
  blobError,
  mediatabValue,
  modalMessage,
  refreshMedias,
  updateResponse,
}) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton, centeredCloseBtn } =
    ModalStyles;
  console.log(open, 'modal opened');
  return (
    <Modal
      open={open}
      onClose={handleCloseMediaplay}
      aria-labelledby="success-error-modal-title"
      aria-describedby="success-error-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          {chaptersCreateRes == true && (
            <Box>
              {/* <Image src="/assets/images/modal-webcam.svg" height={100} width={100} alt="uploaded video" /> */}
              <Image src="/assets/icons/new/checkedtick.svg" height={100} width={100} alt="uploaded video" />
              <Typography id="success-error-modal-title" sx={modalHeading} mb={3}>
                {/* Play Media */}
                Success!
              </Typography>
              <Box>
                <Typography>Media has been uploaded Successfully</Typography>
              </Box>
              <Box sx={buttonGroup} mt={3}>
                <Button variant="contained" sx={centeredCloseBtn} onClick={handleCloseMediaplay}>
                  Close
                </Button>
              </Box>
            </Box>
          )}
          {(chaptersCreateRes == false || blobError) && (
            <Box>
              <Image src="/assets/icons/new/red_alert.svg" height={100} width={100} alt="uploaded video" />
              <Typography id="success-error-modal-title" sx={modalHeading} mb={3}>
                {/* Play Media */}
                Something Went wrong!
              </Typography>
              <Box>
                <Typography>There is something wrong while uploading the file. Let's give it another try</Typography>
              </Box>
              <Box sx={buttonGroup} mt={3}>
                <Button variant="contained" sx={centeredCloseBtn} onClick={handleCloseMediaplay}>
                  Try Again Later
                </Button>
              </Box>
            </Box>
          )}
          {mediatabValue !== undefined && (
            <Box>
              <Image src="/assets/images/modal-webcam.svg" height={100} width={100} alt="uploaded video" />
              <Typography id="success-error-modal-title" sx={modalHeading} mb={3}>
                Success!
              </Typography>
              <Box>
                <Typography>{modalMessage}</Typography>
              </Box>
              <Box sx={buttonGroup} mt={3}>
                <Button
                  variant="contained"
                  sx={centeredCloseBtn}
                  onClick={() => {
                    refreshMedias();
                    handleCloseMediaplay();
                  }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}
          {/* section for user profile' information alert */}
          {updateResponse == true && (
            <Box>
              <Image src="/assets/images/modal-webcam.svg" height={100} width={100} alt="uploaded video" />
              <Typography id="success-error-modal-title" sx={modalHeading} mb={3}>
                Profile Information Updated!
              </Typography>
              <Box>
                <Typography>{modalMessage}</Typography>
              </Box>
              <Box sx={buttonGroup} mt={3}>
                <Button
                  variant="contained"
                  sx={centeredCloseBtn}
                  onClick={() => {
                    refreshMedias();
                    handleCloseMediaplay();
                  }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}
          {/* end section for user profile' information alert */}
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessErrorModal;
