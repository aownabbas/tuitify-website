import React from 'react';
import { useDispatch } from 'react-redux';
import ActionStatistics from '../../../../redux/actions/ds_Statistics';
import Kh_StatisticsAction from '../../../../redux/actions/Kh_StatisticsAction';
import { useRouter } from 'next/router';
const DashboardButton = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = `platform_id=${props?.selectedPlatform?.platform_id}&type=${props.type}&interval=${props.interval}`;
  return (
    <div
      className=" shadow1 p-2 d-flex alig-items-center justify-content-center"
      onClick={() => {
        props.setmytype(props.type);
        props.setHeading(props.buttonName);
        props.setvisible2(props.buttonName);
        const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
        router.query.dashboard == 'kh'
          ? dispatch(Kh_StatisticsAction(params, LoginData.access_token))
          : dispatch(ActionStatistics(params, LoginData.access_token));
      }}
      style={props.buttonstyle}
    >
      <p className="text-white text-center mb-0 d-flex align-items-center regular-small">{props.buttonName}</p>
    </div>
  );
};

export default DashboardButton;
