import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const LiveConference = dynamic(() => import('../../../components/ch/liveMeeting/LiveMeetingInvite'), {
  ssr: false,
});

const ConferenceLive = () => {
  const router = useRouter();
  let meetingChannel;
  if (router) {
    meetingChannel = router.asPath?.split('/').pop();
  }
  return <LiveConference meetingChannel={meetingChannel} />;
};

export default ConferenceLive;
