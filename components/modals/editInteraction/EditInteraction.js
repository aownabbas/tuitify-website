import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { Button } from '@mui/material';
import styles from '../modalsStyles/ModalStyles';

const EditInteraction = ({ openModal, handleCloseModal, comment, setComment, commentId, handleEditComment }) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton } = styles;
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="del-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          <Typography id="delete-modal-title" sx={modalHeading}>
            Edit Comment
          </Typography>
          <Typography id="del-modal-description" sx={{ mt: 2 }}>
            You can change your comment
          </Typography>
          <div className="row pt-3 pb-3 px-1 ">
            <label htmlFor="edit-comment" className="d-flex flex-start mb-2">
              Type comment
            </label>

            <input
              id="edit-comment"
              type="text"
              name="title"
              placeholder="Type comment"
              style={{ height: '48px', border: '1px solid #353452', borderRadius: '10px' }}
              className={`w-100`}
              autoFocus
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', pt: 3 }}>
            <Button variant="outlined" onClick={handleCloseModal} sx={noButton}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={yesButton}
              onClick={async () => {
                await handleEditComment(commentId, comment);
                handleCloseModal();
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditInteraction;
