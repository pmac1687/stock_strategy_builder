import React, { useEffect } from "react";
import { BarChart, Bar,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { 

   };
};

function ConnectedCardBarChart(props) {


  
  return (
    <>
      <button onClick={panRight} style={{ height: '2vw', width: '2vw', position: 'absolute', zIndex: '1'}}>right</button>
      <button onClick={panLeft} style={{ marginTop: '2vw' ,height: '2vw', width: '2vw', position: 'absolute', zIndex: '1'}}>left</button>
      <ResponsiveContainer width="100%" height="100%" style={{ backgroundColor: 'white'}}>
        <BarChart
          width={500}
          height={300}
          data={props.data}
          style={{ backgroundColor: 'white'}}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="black" />
          <Bar dataKey="percent" fill="green" />
          <Bar dataKey="ao" fill="blue" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

const CardBarChart = connect(
  mapStateToProps,
  )(ConnectedCardBarChart);

export default CardBarChart;