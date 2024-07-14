import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionStatistics from '../../../../redux/actions/ds_Statistics';
import Kh_StatisticsAction from '../../../../redux/actions/Kh_StatisticsAction';
import { useRouter } from 'next/router';
const DashboardFilter = (props) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const params = `platform_id=${props?.selectedPlatform?.platform_id}&type=${props.type}&interval=${props.interval}`;
  return (
    <div className="mrgntp1">
      <div
        className={
          props.visible1 == props.tab
            ? ' background text-white radius d-flex align-items-center'
            : ' bgklr radius d-flex align-items-center'
        }
        onClick={() => {
          props.setvisible1(props.tab);
          props.setvisible1(props.tab);
          props.setinterval(props.interval);
          router.query.dashboard == 'ch'
            ? dispatch(ActionStatistics(params, props.token))
            : dispatch(Kh_StatisticsAction(params, props.token));
        }}
        style={{ cursor: 'pointer' }}
      >
        <strong
          className={
            props.visible1 == props.tab
              ? 'col-lg-11 col-md-9 col-11 text-white py-1 regular-xsmall'
              : 'col-lg-11 col-md-9 col-11 py-1 regular-xsmall'
          }
        >
          {props.value}
        </strong>
        <div className=" col-lg-1 col-md-2 col-sm-2">
          <div className={props.visible1 == props.tab ? ' radius1 text-white ' : 'radius1'}>
            <div className={props.visible1 == props.tab ? 'bgradius1' : ''}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilter;
