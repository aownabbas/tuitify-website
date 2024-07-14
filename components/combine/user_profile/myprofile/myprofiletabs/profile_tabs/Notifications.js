import classes from './Notifications.module.css';

const Notifications = () => {
  return (
    <div className={`${classes.activitycommentRow} row mb-3`}>
      <div className="col-md-8 col-sm-8 col-xs-8">
        <p className={`${classes.activityComments}`}>Alexa Commented on your giist </p>
      </div>
      <div className={`${classes.buttonAlign} col-md-4 col-sm-4 col-xs-4`}>
        {/* <div className={`${classes.activityPicborder} mb-2 mt-2`}>
          <img
            src="/images/activitypic.png"
            className={`${classes.mygroupsImg} `}
          />
        </div> */}
          <button className={`${classes.followbackButton} mb-1`}>Follow Back</button>
      </div>
    </div>
  );
};

export default Notifications;
