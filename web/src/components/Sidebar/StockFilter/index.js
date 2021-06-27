import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { addBarData, } from "../../../js/actions/index";
import RangeSlider from "bootstrap";
import Nouislider from 'react-nouislider';
//import Slider from 'bootstrap-slider';
import Slider from 'bootstrap-slider'
import Multislider from './Multislider';
import StockByLetterSlider from './StockByLetterSlider';
import PriceSlider from './PriceSlider';
import PeriodSlider from './PeriodSlider';

//const Slider = require("bootstrap-slider");

//var slider = new Slider('#ex2', {});


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedStockFilter(props) {


  
  return (
    <div>
        <StockByLetterSlider />
        <PriceSlider />
        <PeriodSlider />
    </div>
  );
}

const StockFilter = connect(
  mapStateToProps,
  )(ConnectedStockFilter);

export default StockFilter;