import React from 'react';
import Link from 'next/link';

const NavigateInteractions = (props) => {
  let { keyWords, setKeyWords } = props;
  return (
    <>
      {/* stats page navigate design component */}
      <div className="text-center row mb-3">
        {/* <Link href="/ch/dashboard/Interactions?dashboard=ch" passHref> */}
        <div className="col-lg-2 col-4">
          <div
            className={
              keyWords.id != 1
                ? 'text-white hoveringstat regular-xsmall dashboard-buttons-opacity'
                : 'text-white shadow4 hoveringstat regular-xsmall'
            }
            onClick={() => setKeyWords({ id: 1, value: 'Briifs_interactions_details' })}
          >
            Briifs Interactions
          </div>
        </div>
        {/* </Link> */}
        {/* <Link href="/ch/dashboard/GeneralStats" passHref> */}
        <div className="col-lg-3 col-4">
          <div
            className={
              keyWords.id != 2
                ? 'text-white  hoveringstat regular-xsmall dashboard-buttons-opacity'
                : ' text-white shadow4 hoveringstat regular-xsmall'
            }
            onClick={() => setKeyWords({ id: 2, value: 'User’s_interactions_general_stats' })}
          >
            Users Interactions Stats
          </div>
        </div>
        {/* </Link> */}
        {/* <Link href="/ch/dashboard/InteractionsDetail"> */}
        <div className="col-lg-3 col-4">
          <div
            className={
              keyWords.id != 3
                ? 'text-white hoveringstat regular-xsmall dashboard-buttons-opacity'
                : 'text-white shadow4 hoveringstat regular-xsmall'
            }
            onClick={() => setKeyWords({ id: 3, value: 'User’s_interactions_details' })}
          >
            Users Interactions Details
          </div>
        </div>
        {/* </Link> */}
      </div>
    </>
  );
};
export default NavigateInteractions;
