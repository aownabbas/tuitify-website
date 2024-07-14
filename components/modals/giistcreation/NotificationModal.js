/** this modal is made to show alerts related to chapter create button active or error
 * it called in AddChapter.js
 */
import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import ModalStyles from '../modalsStyles/ModalStyles';

const NotificationModal = ({ open, handleNotificationModalClose, detailCreationRes }) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton, centeredCloseBtn } =
    ModalStyles;
  console.log(open, 'modal opened');
  return (
    <Modal
      open={open}
      onClose={handleNotificationModalClose}
      aria-labelledby="success-error-modal-title"
      aria-describedby="success-error-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          {detailCreationRes !== null && (
            <Box>
              <Image src="/assets/images/tick-blue-circle.svg" height={100} width={100} alt="uploaded video" />
              <Typography id="success-error-modal-title" sx={modalHeading} mb={3}>
                Add Chapter button is Active!
              </Typography>
              <Box>
                <Typography>You can now add chapters!</Typography>
              </Box>
              <Box sx={buttonGroup} mt={3}>
                <Button variant="contained" sx={centeredCloseBtn} onClick={handleNotificationModalClose}>
                  Close
                </Button>
              </Box>
            </Box>
          )}
          {detailCreationRes == null && (
            <Box>
              <Image src="/assets/images/modal-webcam.svg" height={100} width={100} alt="uploaded video" />
              <Typography id="success-error-modal-title" sx={modalHeading} mb={3}>
                Please Wait!
              </Typography>
              <Box>
                <Typography>Add chapter button will be activated in few seconds, Please wait!</Typography>
              </Box>
              <Box sx={buttonGroup} mt={3}>
                <Button variant="contained" sx={centeredCloseBtn} onClick={handleNotificationModalClose}>
                  Close
                </Button>
              </Box>
            </Box>
          )}
          {detailCreationRes?.id == undefined && (
            <Box>
              <Image src="/assets/images/modal-webcam.svg" height={100} width={100} alt="uploaded video" />
              <Typography id="success-error-modal-title" sx={modalHeading} mb={3}>
                Something went wrong!
              </Typography>
              <Box>
                <Typography>
                  It seems, you didn't provide proper information, Please try again and fill all fieldssss!
                </Typography>
              </Box>
              <Box sx={buttonGroup} mt={3}>
                <Button variant="contained" sx={centeredCloseBtn} onClick={handleNotificationModalClose}>
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
