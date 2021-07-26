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

const ConnectedPeriodSlider = ({  stratStockData, dateRange, setDateRange, getMasterDateRange, masterDateRange }) => {
    useEffect(() => {
        getMasterDateRange();
    },[getMasterDateRange])

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