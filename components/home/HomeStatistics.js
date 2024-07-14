import classes from './Home.module.css';

const HomeStatistics = (props) => {
  // console.log(mystats.mystats, 'all my stats');
  // const statsData = props.mystats;
  return (
    <div className="card" style={{ borderRadius: '10px', height: '35vh', boxShadow: '1px black' }}>
      {props.mystats?.map((stat) => (
        <div className="card-body">
          <div className="row">
            <h6 className={`card-title ${classes.cardtext}`}>My Statistics</h6>
          </div>
          <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '30vh' }}>
            <div className="row mb-2 ">
              <p className={`mb-2 textCenter ${classes.notiText}`}>{stat.tutorial_views_count}</p>
              <p className={`card-text textCenter ${classes.statText}`}>Total views Gained</p>
            </div>
            <div className="row mb-3">
              <p className={`mb-2 textCenter ${classes.notiText}`}>{stat.tutorials_count}</p>
              <p className={`card-text textCenter ${classes.statText}`}>Total giists created</p>
            </div>
            <div className="row mb-3">
              <p className={`mb-2 textCenter ${classes.notiText}`}>{stat.avg_rating}</p>
              <p className={`textCenter card-text ${classes.statText}`}>Average Rating</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeStatistics;
