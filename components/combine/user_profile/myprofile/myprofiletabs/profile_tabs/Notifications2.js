import Image from 'next/image';
import classes from './Notifications.module.css';

const Notifications2 = () => {
  return (
    <div className={`${classes.activitycommentRow} row mb-3`}>
      <div className="col-md-8 col-sm-8 col-xs-8">
        <p className={`${classes.activityComments}`}>
          Alexa Commented on your giist{" "}
        </p>
      </div>
      <div className={`${classes.buttonAlign} col-md-4 col-sm-4 col-xs-4`}>
        <div className={`${classes.activityPicborder} mb-2 mt-2`}>
        <Image
          src="/assets/images/activitypic.png"
          width={22}
          height={22}
          className={`${classes.mygroupsImg} `}
          alt=''
        />
      </div>
        {/* <button className={`${classes.followbackButton} mb-1`}>
          Follow Back
        </button> */}
      </div>
    </div>
  );
};

export default Notifications2;
