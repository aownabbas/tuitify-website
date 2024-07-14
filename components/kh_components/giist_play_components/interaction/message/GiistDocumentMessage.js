import React, { useState } from 'react';
import PlayMediaModal from '../../../../modals/playmediamodal/PlayMediaModal';

const GiistDocumentMessage = ({ id, link, originalName, type, isBriif }) => {
  const [docPreviewModal, setDocPreviewModal] = useState(false);

  const handleOpenDocPreviewModal = () => setDocPreviewModal(true);
  const handleCloseDocPreviewModal = () => setDocPreviewModal(false);

  const awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  // Function to extract file extension from the link
  const getFileExtension = () => link.substr(link.lastIndexOf('.') + 1);

  // Function to get the correct icon URL based on the file extension
  const getFileIconUrl = () => {
    const fileExtension = getFileExtension();
    console.log("fileExtension", fileExtension)
    const imageExtensions = ['jpg', 'jpeg', 'png', 'svg', 'gif', "JPG"];
    if (imageExtensions.includes(fileExtension)) {
      return '/assets/icons/image-icon.svg';
    } else if (fileExtension == "pdf") {
      return `/assets/icons/PDF.png`;
    } else if (fileExtension == "doc" || fileExtension == "docx") {
      return `/assets/images/word.png`;
    } else if (fileExtension == "xls" || fileExtension == "xlsx") {
      return `/assets/icons/XLXS.png`;
    } else if (fileExtension == "ppt" || fileExtension == "pptx") {
      return `/assets/icons/PPT.png`;
    }
    else {
      return '/assets/icons/othericon.png';
    }
  };

  // Function to truncate document name if it exceeds a certain length
  const truncateName = (name, maxLength) => {
    if (name && name.length > maxLength) {
      return `${name.slice(0, maxLength - 1)}...${getFileExtension()}`;
    }
    return `${name}.${getFileExtension()}`;
  };

  return (
    <>
      <div className="ps-5" onClick={handleOpenDocPreviewModal}>
        <img
          src={getFileIconUrl()}
          width={getFileIconUrl().includes('image-icon') ? '35px' : '35px'}
          className="text-center"
          style={{ height: "40px" }}
          alt="attachment"
        />
        <p className="medium text-nowrap cursor-pointer">
          {truncateName(originalName, 10)}
        </p>
      </div>

      {docPreviewModal && (
        <PlayMediaModal
          id={id}
          previewInteractionDoc={`${awsLink}${isBriif ? 'briffs' : 'giists'}/interactions/documents/${link}`}
          mediaplayModal={docPreviewModal}
          mediatabValue={type}
          handleCloseMediaplay={handleCloseDocPreviewModal}
          name={originalName}
          downloadlink={`${isBriif ? 'briffs' : 'giists'}/interactions/documents/${link}`}
        />
      )}
    </>
  );
};

export default GiistDocumentMessage;
