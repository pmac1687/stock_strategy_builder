import React from 'react';
import TRows from './elements/TRows';
import { connect } from "react-redux";
import MaxTRow from './elements/MaxTRow';
import { windowsSeriesDataType } from './util/apiTypes';
import SubTable from './SubTable'
/*
type Props = {
    windowsSeriesData: windowsSeriesDataType
    strategyStock: string,
    data: windowsSeriesDataType
}
*/

const mapStateToProps = (state) => {
    return { 
        windowsSeriesData: state.windowsSeriesData,
        strategyStock: state.strategyStock,
      //windowsStocks: state.windowsStocks
     };
};


const titles = [
    ['ticker'],
    ['Close', 'High', 'Low', 'Volume'],
    ['High/Low', 'Spread'],
    ['MACD', 'Divergence'],
    ['MACD', 'Signal', 'Value'],
];

const ConnectedTableRows = ({ windowsSeriesData, strategyStock }) => (
    <>
        {windowsSeriesData['max'] &&
            <tbody>
                <MaxTRow ticker={strategyStock} dataMin={windowsSeriesData['min']} dataMax={windowsSeriesData['max']}/>
            </tbody >}
    </>
);

const TableRows  = connect(
    mapStateToProps,
)(ConnectedTableRows);
    
export default TableRows;