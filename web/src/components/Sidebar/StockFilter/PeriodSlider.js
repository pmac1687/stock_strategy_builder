import React, { useEffect, useRef, useState } from 'react';
import './multirange.css'
import Multislider from './Multislider';
import { connect } from "react-redux";

import { 
    getStockData,
    setDateRange
  } from "../../../js/actions/index";

const mapStateToProps = state => {
    return { 
      stratStockData : state.stratStockData,
      dateRange: state.dateRange
     };
  };

const ConnectedPeriodSlider = (props) => {
    const [dates, setDates] = useState([])
    useEffect(() => {
        props.getStockData()
    },[])

    useEffect(() => {
        getDates()
    },[props.stratStockData])

    function getDates(){
        const dats = [];
        for(let i=1;i<props.stratStockData.length;i++){
            dats.push(props.stratStockData[i]['date'])
        }
        props.setDateRange(dats)
    }

    return (
        <>
            <Multislider dates={props.dateRange} subject={'Choose Period Range'} mapKey={"periodFilter"} ids={['leftPeriod', 'rightPeriod']}  min={0} max={561} />
        </>
      );
    };

const PeriodSlider = connect(
    mapStateToProps,
    {
        getStockData,
        setDateRange
    }
    )(ConnectedPeriodSlider);
    
export default PeriodSlider;