import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addBarData, } from "../../js/actions/index";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedStockFilter(props) {
    
  
  return (
    <div>
        hello
    </div>
  );
}

const StockFilter = connect(
  mapStateToProps,
  )(ConnectedStockFilter);

export default StockFilter;