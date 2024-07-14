import Image from 'next/image';
import classes from './Home.module.css';

const MySingleRank = () => {
  return (
    <div className='container-fluid'>
      <div className={`row ${classes.myrow}`}  id="myrankingScroll">
        <div className={`col-md-1 col-sm-1 col-1 ${classes.myrakingDetail}`}>1</div>
        <div className={`col-md-3 col-sm-3 col-3 text-center`} >
          <div className="row" style={{marginTop: '1rem'}}>
            <div className="col-md-4 col-sm-4 col-4">
              <Image
                src="/assets/images/ranking_image.png"
                height="100px"
                width="100px"
                className="img-row"
              />
            </div>
            <div className="col-md-8 col-sm-8 col-8">
              <a href="#user" className="text-decoration-none"><span className={`${classes.randingUserName}`}>Jane Kate</span></a>
            </div>
          </div>
        </div>
        <div className={`col-md-2 col-sm-2 col-2 ${classes.myrakingDetail}`}>120</div>
        <div className={`col-md-2 col-sm-2 col-2 ${classes.myrakingDetail}`}>85</div>
        <div className={`col-md-2 col-sm-2 col-2 ${classes.myrakingDetail}`}>30K</div>
        <div className="col-md-2 col-sm-2 col-2">
          <div className={`text-center ${classes.myrakingDetailRow}`}>
            
            <p className={`${classes.myrakingDetailTxt}`}>4.8</p>
            
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default MySingleRank;
