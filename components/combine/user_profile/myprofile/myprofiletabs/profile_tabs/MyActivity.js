import Image from 'next/image';
import classes from './MyActivity.module.css';

const MyActivity = ({ userActivity, userProfileDetails }) => {
  // console.log(props.userProfileDetails, 'myImage');
  console.log(userActivity, 'myActivity');
  return (
    <>
      {/* {props.userProfileDetails.useractivity.length !==0 ?
      props.userProfileDetails.useractivity?.map((item)=>( */}
      {userActivity?.items?.length != 0
        ? userActivity?.items?.map((items) => (
            <div className={`${classes.activitycommentRow} row mb-3 `}>
              <div className="col-md-2 col-sm-2 col-xs-2">
                <div className={`${classes.activityPicborder} mb-2 mt-2 d-flex align-items-center`}>
                  <Image
                    alt="activityImage"
                    src="/assets/images/activitypic.png"
                    width={22}
                    height={22}
                    className={`${classes.mygroupsImg} `}
                  />
                </div>
              </div>
              <div className="col-md-10 col-sm-10 col-xs-10">
                <p className={`${classes.activityComments}`}>{items.type}</p>
              </div>
            </div>
          ))
        : 'nothing'}
      {/* ))
: <div className='text-center'>Activity not exist</div>} */}
    </>
  );
};

export default MyActivity;
