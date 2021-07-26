import React from 'react';
import TRows from './elements/TRows';
import { connect } from "react-redux";

type Props = {
    windowsSeriesData: {} 
}


const mapStateToProps = (state: Props) => {
    return { 
      windowsSeriesData: state.windowsSeriesData,
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

const ConnectedTableRows = ({ windowsSeriesData }: Props) => (
    <tbody>
        {windowsSeriesData && Object.keys(windowsSeriesData).map((item, index) => (
            <TRows />
        ))}
    </tbody>
);

const TableRows  = connect(
    mapStateToProps,
)(ConnectedTableRows);
    
export default TableRows;