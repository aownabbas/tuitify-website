import Image from 'next/image';
import classes from './MyGroups.module.css';

const MyGroups = (props) => {
  const groupItems = props.userGroups?.items;

  return (
    <div>
      {groupItems?.length != 0 ? (
        groupItems?.map(
          (item) => (
            console.log(item, 'itemmss'),
            (
              <div className={`${classes.commentRow} d-flex align-items-center row mb-3`}>
                <div className="col-md-2 col-sm-2 col-2">
                  <div className={`${classes.groupsCircle} mb-2 mt-2`}>
                    <Image
                      src="/assets/images/giisty.svg"
                      alt="GroupImage"
                      width={21}
                      height={21}
                      className={`${classes.mygroupsImg} `}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-6">
                  <p className={`${classes.actComments} mt-3`}>{item.name}</p>
                </div>
                <div className="col-md-4 col-sm-4 col-4">
                  <button className={`${classes.viewbutton}  float-end mt-2`}>View</button>{' '}
                </div>
              </div>
            )
          ),
        )
      ) : (
        <div className="text-center mt-5">No groups found</div>
      )}
    </div>
  );
};

export default MyGroups;
