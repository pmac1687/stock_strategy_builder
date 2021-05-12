import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ErrorBar, ResponsiveContainer} from 'recharts'

const data = [
      {name: 'Week 1', max: 4000, min: 1400, error: [200, 1000]},
      {name: 'Week 2', max: 4000, min: 3400, errorNegative: [1000, 200]},
      {name: 'Week 3', max: 3200, min: 2400, errorNegative: [1000, 200]},
      {name: 'Week 4', max: 1000, min: 400, error: [200, 1000]},
      {name: 'Week 5', max: 2000, min: 1100, error: [200, 1000]},
      {name: 'Week 6', max: 3000, min: 400, error: [-200, 2000]},
      {name: 'Week 7', max: 500, min: -1000, error: [200, 2000]},
];
export default function CardCandleChart(){
  	return (
      <ResponsiveContainer width='100%' heigh='100%'>
    	<BarChart width={1000} height={650} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis xAxisId={0} dataKey="name" hide/>
       <XAxis xAxisId={1} dataKey="name"/>
       <YAxis/>
       <Tooltip cursor={{fill: 'transparent'}}/>
       <Bar barSize={30} xAxisId={0}  dataKey="max" fill="#035aa6" />
       <Bar barSize={35} xAxisId={1} dataKey='min' fill="black">
         <ErrorBar  dataKey="error" width={4} strokeWidth={2} stroke="#66c208" />
         <ErrorBar dataKey="errorNegative" width={4} strokeWidth={2} stroke="#ff0044" />
       </Bar>
      </BarChart>
      </ResponsiveContainer>
    );
}

