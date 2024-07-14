import dynamic from 'next/dynamic'

const AudioReplayDynamic = dynamic(() => import('../../../components/ch/replays/audio/AudioReplayDynamic'), {
  ssr: false
})

export default () => <AudioReplayDynamic />