import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { URL } from '../../../public/assets/path/path';
import Image from 'next/image';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';
import { useRouter } from 'next/router';

const Delete = (props) => {
  // all states

  const router = useRouter();

  console.log('props', props);
  const [email, setEmail] = useState();
  const [id, setId] = useState();

  const [getPlatData, setGetPlatData] = useState({});
  const [token, setToken] = useState();
  const [platformId, setPlatformId] = useState();
  useEffect(() => {
    // login and getplat data
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (LoginData) {
      const email = LoginData.email;
      setEmail(email);
      const user_id = LoginData.id;
      setId(user_id);
      setToken(LoginData.access_token);
      setPlatformId(GetPlatData.platform_id);
    }

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }
    return () => {};
    //eslint-disable-next-line
  }, []);

  console.log('chGiist', props?.chGiist);

  const handleClick = async () => {
    // separate two ids from generalStat
    let sub = '';
    let domain = '';
    let briifArray = [];
    let userIdArray = [];

    props.briifArray?.map((item) => {
      let parts = item.split(':');

      sub = parts[0];
      briifArray.push(sub);
      domain = parts[1];
      userIdArray.push(domain);
    });
    // deleting rows of different tables of dashboard
    if (props?.ids) {
      var totBriif = JSON.stringify({
        briff_ids: props.ids?.totalbriifsid,
        platform_id: platformId,
      });
      var totGiist = JSON.stringify({
        giist_ids: props.ids?.totalgiistsid,
      });
      let paframs = router.query.dashboard == 'ch' ? totBriif : totGiist;
      let route = router.query.dashboard == 'ch' ? 'deleteBriffs' : 'kHubDashboardDeleteGiists';
      await GlobalApiCall(
        `${URL.khbaseUrl}${route}`,
        'delete',
        paframs,
        (response) => {
          props.myfunction();
          props.setSelected([]);
        },
        (error) => console.log(error),
      );
    } else if (props.engagementRateIds) {
      var engagementRateIds = JSON.stringify({
        giist_ids: props.engagementRateIds,
      });
      await GlobalApiCall(
        `${URL.khbaseUrl}kHubDashboardDeleteGiists`,
        'delete',
        engagementRateIds,
        (response) => {
          props.myfunction();
          console.log(response, 'del');
          props.setSelected([]);
        },
        (error) => {
          console.log(error);
        },
      );
    } else if (props.interactionid) {
      var comments = JSON.stringify({
        comment_ids: props.interactionid?.totalbriifsCommentid,
        platform_id: platformId,
      });
      var totGiistcomment = JSON.stringify({
        comment_ids: props.interactionid?.totalgiistsCommentid,
      });
      let paframs = router.query.dashboard == 'ch' ? comments : totGiistcomment;
      let route = router.query.dashboard == 'ch' ? 'deleteBriffComments' : 'kHubDashboardDeleteComments';
      await GlobalApiCall(
        `${URL.khbaseUrl}${route}`,
        'delete',
        paframs,
        (response) => {
          props.myfunction();
          console.log(response, 'del');
          props.setSelected([]);
        },
        (error) => {
          console.log(error);
        },
      );
    } else if (props.liveSessionid) {
      await GlobalApiCall(
        `${URL.khbaseUrl}delete_meeting?name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&go_live_id=
       [${props.liveSessionid}]`,
        'get',
        {},
        (res) => props.myfunction(),
        (error) => console.log(error),
      );
    } else if (props.briifArray) {
      await GlobalApiCall(
        `${URL.khbaseUrl}delete_user_comments?name=${getPlatData.name}&env=${getPlatData.env}&platform_id=${getPlatData.platform_id}&briff_id=
    [${briifArray}]&user_id=[${userIdArray}]`,
        'get',
        {},
        (res) => props.myfunction(),
        (error) => console.log(error),
      );
    } else {
      null;
    }
  };
  return (
    <>
      <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-12 mb-3 ms-auto">
        <div className="shadow2" style={{ cursor: 'pointer' }}>
          {props.value && (
            <CSVLink
              target="_parent"
              data={props.value}
              filename="transactions.csv"
              style={{ textDecoration: 'none', color: 'red', fontSize: '12px' }}
            >
              {/* <div className="row"> */}
              <div className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <Image src="/assets/icons/csv.png" alt="csv" width="20px" height="20px" />
                  {/* </div> */}
                </div>
                {/* <div className="col-xl-10 col-md-10 col-sm-5 col-5"> */}
                <div className="green-color text-center regular-small ms-2"> Download CSV</div>
                {/* </div> */}
              </div>
            </CSVLink>
          )}
        </div>
      </div>
      {/* delete table rows */}
      <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-3 col-12" onClick={handleClick}>
        {/* <div className=""> */}
        <div className="shadow3" style={{ cursor: 'pointer' }}>
          <div className="d-flex justify-content-center  align-items-center">
            {/* <div className="mt-1 pe-0 col-2"> */}
            {/* <div className=""> */}
            <Image src="/assets/icons/delete.png" alt="delete" width="16px" height="19px" />
            <div className="txtstyle1 text-white text-center mt-1 mt-md-0 py-1 ms-2 regular-small">Delete</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Delete;
