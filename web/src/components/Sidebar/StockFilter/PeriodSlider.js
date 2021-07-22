import React, { useEffect } from 'react';
import './multirange.css'
import Multislider from './Multislider';
import { connect } from "react-redux";

import { 
    getStockData,
    setDateRange,
    getMasterDateRange
  } from "../../../js/actions/index";

const mapStateToProps = state => {
    return { 
      stratStockData : state.stratStockData,
      dateRange: state.dateRange,
      masterDateRange: state.masterDateRange
     };
  };

const ConnectedPeriodSlider = ({ getStockData, stratStockData, dateRange, setDateRange, getMasterDateRange, masterDateRange }) => {
    useEffect(() => {
        getMasterDateRange();
    },[])

    useEffect(() => {
        //getDates();
        console.log(masterDateRange)
    },[masterDateRange])

    function getDates(){
        const dats = [];
        for (let i = 0; i < masterDateRange.length; i++){
            const dat = stratStockData[i]['date'].split('-')
            console.log('dates', dat)
            const date = `${dat[1]}-${dat[2]}-${dat[0]}`
            dats.push(date)
        }

        setDateRange(dats)
    }

    return (
        <>
            <Multislider
                margin={'2.75vw'}
                dates={masterDateRange}
                subject={'Choose Period Range'}
                mapKey={"periodFilter"} ids={['leftPeriod', 'rightPeriod']}
                min={0}
                max={628}
            />
        </>
      );
    };

const PeriodSlider = connect(
    mapStateToProps,
    {
        getStockData,
        setDateRange,
        getMasterDateRange
    }
    )(ConnectedPeriodSlider);
    
export default PeriodSlider;