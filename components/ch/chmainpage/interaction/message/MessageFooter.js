import React, { useState, useEffect } from 'react';
import reactions from '../../../../../redux/actions/Reactions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Image from 'next/image';

const MessageFooter = (props) => {
  console.log('props', props);
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');

  const [getPlatData, setGetPlatData] = useState({});

  const [like, setLike] = useState('1');
  const [idea, setIdea] = useState('1');
  const [celebration, setCelebration] = useState('1');

  const [reactionsData, setReactionsData] = useState({
    status: '',
    message: '',
    likes: [{ likes: 0 }],
    ideas: [{ idea: 0 }],
    celeberation: [{ celeberation: 0 }],
  });

  const handleReactions = (comment_id, briif_id, isLike, value, title) => {
    const date = moment().format('YYYY-MM-DD[T]HH:mm:ss');
    const params = `title=${title}&m_id=${briif_id}&platform_id=${getPlatData.platform_id}&user_id=${id}&id=${comment_id}&status=${value}&like=${isLike}&briff_id=${briif_id}&created=${date}`;
    dispatch(reactions(params, onReactionsSuccess));
  };
  const onReactionsSuccess = (res) => {
    setReactionsData(res.data);
    // props.handleInteractionData(props.briif_id);
  };

  const updateInteraction = (id, property, totalProperty) => {
    const updatedInteractions = props.interactionsData.interactions.map((interaction) => {
      if (interaction.id === id) {
        const updatedProperty = !interaction[property];
        const updatedTotal = interaction[totalProperty] + (updatedProperty ? 1 : -1);

        return {
          ...interaction,
          [property]: updatedProperty,
          [totalProperty]: updatedTotal,
        };
      }
      return interaction;
    });

    // Update the interactions data with the updated array
    props.setInteractionsData((prevState) => ({
      ...prevState,
      interactions: updatedInteractions,
    }));

    // Do any other necessary operations with the updated data
  };

  const handleLike = (like) => {
    if (like == '0') {
      setLike('1');
    } else {
      setLike('0');
    }
  };
  const handleIdea = (idea) => {
    if (idea == '0') {
      setIdea('1');
    } else {
      setIdea('0');
    }
  };
  const handleCelebration = (celebration) => {
    if (celebration == '0') {
      setCelebration('1');
    } else {
      setCelebration('0');
    }
  };
  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      const platform_id = LoginData.platform_id;
      setPlatformId(platform_id);
    }
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
    return () => {};
  }, []);

  // console.log(props.title);

  return (
    <>
      <div className="d-flex justify-content-start ms-2 mt-3">
        <span className="col-9 ms-4 d-flex justify-content-evenly p-0">
          <div className="pe-1 d-flex align-items-center">
            <Image
              src={!props.likedByMe ? '/assets/icons/new/like-outlined.svg' : '/assets/icons/new/like-filled.svg'}
              width="20px"
              height="20px"
              alt="like"
              className="zoom-animation"
              onClick={() => {
                updateInteraction(props.id, 'likedbyme', 'likes');
                handleReactions(props.id, props.briif_id, props.likedByMe ? '0' : '1', '0', props.title);
              }}
            />
            <p className="d-inline m-0 px-1">
              <small>{props.likes}</small>
            </p>
          </div>
          <div className="pe-1 d-flex align-items-center">
            <Image
              src={!props.ideaByMe ? '/assets/icons/new/idea-outlined.svg' : '/assets/icons/new/idea-filled.svg'}
              width="20px"
              height="20px"
              alt="idea"
              className="zoom-animation"
              onClick={() => {
                updateInteraction(props.id, 'ideabyme', 'idea');

                handleIdea(idea),
                  // setIdea(!idea),
                  handleReactions(props.id, props.briif_id, props.ideaByMe ? '0' : '1', '1', props.title);
              }}
            />
            <p className="d-inline m-0 px-1">
              <small>{props.idea}</small>
            </p>
          </div>
          <div className="pe-1 d-flex align-items-center">
            <Image
              src={
                !props.celebrationByMe
                  ? '/assets/icons/new/celebrate-outlined.svg'
                  : '/assets/icons/new/celebrate-filled.svg'
              }
              width="20px"
              height="20px"
              alt="celebration"
              className="zoom-animation"
              onClick={() => {
                updateInteraction(props.id, 'celeberationbyme', 'celeberation');
                handleCelebration(celebration),
                  handleReactions(props.id, props.briif_id, props.celebrationByMe ? '0' : '1', '2', props.title);
              }}
            />
            <p className="d-inline m-0 px-1">
              <small>{props.celebration}</small>
            </p>
          </div>
        </span>
      </div>
    </>
  );
};

export default MessageFooter;
