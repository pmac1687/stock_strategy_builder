import React, { useEffect } from 'react';
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

const ConnectedPeriodSlider = ({ getStockData, stratStockData, dateRange, setDateRange }) => {
    useEffect(() => {
        getStockData()
    },[])

    useEffect(() => {
        getDates()
    },[stratStockData])

    function getDates(){
        const dats = [];
        for (let i = 1; i < stratStockData.length; i++){
            const dat = stratStockData[i]['date'].split('-')
            const date = `${dat[1]}-${dat[2]}-${dat[0]}`
            dats.push(date)
        }

        setDateRange(dats)
    }

    return (
        <>
            <Multislider margin={'4vw'} dates={dateRange} subject={'Choose Period Range'} mapKey={"periodFilter"} ids={['leftPeriod', 'rightPeriod']}  min={0} max={520} />
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