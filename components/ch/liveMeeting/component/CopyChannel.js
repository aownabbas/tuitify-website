import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CopyChannel = ({ meetingChannel }) => {
  const [messageText, setMessageText] = useState();
  const [copyAddressModal, setCopyAddressModal] = useState(false);

  const router = useRouter();
  const domainName = window.location.host;
  // to make a link excluding channel name coming from router
  const onlyLink = router.pathname.split('/');
  const lastParExcluded = onlyLink.pop();
  var linkPath = onlyLink.join('/');
  // end to make a link excluding channel name coming from router

  const linkWithouthttp = domainName + linkPath + '/' + meetingChannel;

  const url = new URL(
    linkWithouthttp.startsWith('http://') || linkWithouthttp.startsWith('https://')
      ? linkWithouthttp
      : `http://${linkWithouthttp}`,
  );

  const copyChannel = (wallet) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopyAddressModal(true);
        setMessageText('Address copied to clipboard');
        CloseCopyAddressModal();
      })
      .catch(() => {
        setCopyAddressModal(true);
        setMessageText('Cannot be copied');
      });
  };

  function CloseCopyAddressModal() {
    const timer = setInterval(() => {
      setCopyAddressModal(false);
      clearInterval(timer);
    }, 2000);
  }

  return (
    <div>
      <Typography id="modal-modal-description" sx={{ mt: 2, fontFamily: 'Gilroy-Medium', fontSize: '16px' }}>
        Or Share this meeting link with others you want them to join this meeting
      </Typography>

      <div className="d-flex mt-4 ">
        <div className="linkBox w-100 position-relative">
          <div className="medium-mid-large float-start text-break">{meetingChannel}</div>
          <div className="float-end">
            <div>
              <Image
                src="/assets/icons/meetingIcons/copyUrl.png"
                height={20}
                width={20}
                alt="AddPeople"
                onClick={copyChannel}
              />
            </div>
          </div>
          {copyAddressModal && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                position: 'absolute',
                zIndex: '2',
                height: '80%',
                width: '95%',
                background: 'grey',
                borderStyle: 'none ',
                outline: 'none ',
                border: '1px solid white',
                p: 1,
                borderRadius: '5px',
                color: 'white',
              }}
            >
              <Typography id="modal-modal-description" className="regular-small text-white">
                {messageText}
              </Typography>
            </div>
          )}
        </div>
      </div>

      <div className="d-flex mt-3">
        <div className="mt-2">
          <Image src="/assets/icons/meetingIcons/permission.png" height={42} width={42} alt="AddPeople" />
        </div>
        <div className="ms-2 medium">
          People who use this meeting link must get your permission before they can join .
        </div>
      </div>
    </div>
  );
};

export default CopyChannel;
