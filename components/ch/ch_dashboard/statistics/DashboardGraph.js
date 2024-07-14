import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DashboardGraph = (props) => {
  return (
    <div className="shadow mt-lg-0 mt-4" style={{ height: '65%' }}>
      <div className="col-lg-3 col-md-3 col-sm-3">
        <div className="bold1 p-3">{props.heading}</div>
      </div>
      <div className="position-relative" style={{ height: '80%' }}>
        {props.visible1 !== 'alldata' ? (
          <ResponsiveContainer
            width="100%"
            // aspect={3.4}
            className="position-absolute pb-5"
          >
            <AreaChart
              width="100%"
              // height="100%"
              // height={300}
              // style={{height: "30%"}}
              data={props.graph}
              margin={{
                top: 0,
                right: 20,
                left: 0,
                // bottom: 0,
              }}
            >
              <CartesianGrid className="" strokeDasharray="5 5" style={{ opacity: '0.4' }} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis style={{ opacity: '0.6' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Total"
                // stroke="#8884d8"
                stroke="#4E6AFE"
                // fill="#4E6AFE"
                fill="rgba(106, 110, 229, .3)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer
            width="99%"
            // aspect={4}
            className="position-absolute pb-5"
            // height="100%"
          >
            <BarChart
              width="100%"
              // height="30%"
              // height={300}
              data={props.graph}
              margin={{
                top: 0,
                right: 20,
                left: 0,
                // bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" style={{ opacity: '0.4' }} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis style={{ opacity: '0.4' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Total"
                // fill="#4E6AFE"
                // fill="rgba(106, 110, 229, .16)"
                fill="#4E6AFE"
                radius="radius"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DashboardGraph;
