import React from 'react';
import { connect } from "react-redux";
import TRows from "../elements/TRows";

type Props = {
    windowsSeriesData: {
        [index: string]: {
            [index: string]: number | string
        }
    },
    strategyStock: string,
}

const titles = [
    ['open','Close', 'High', 'Low', 'volume'],
    ['accel_oss','ao','atr','momentum'],
    ['rsi_6', 'rsi_12', 'rsi_18','rsi_24'],
    ['sma_10', 'sma_50','sma_200'],
    ['smma_5', 'smma_50', 'smma_200'],
    ['ema_10', 'ema_50', 'ema_200'],
    ['alligator_jaw', 'alligator_lips', 'alligator_teeth'],
    ['macd_h', 'macd_signal', 'macd_value'],
    [ 'boll_lb', 'boll', 'boll_ub'],
    ['trend_close', 'trend_ma', 'green' ]
];

const mapStateToProps = (state: Props) => {
    return { 
        windowsSeriesData: state.windowsSeriesData,
        strategyStock: state.strategyStock,
     };
};

const ConnectedSubRows = ({windowsSeriesData, strategyStock}: Props) => (
    <>
        {windowsSeriesData && Object.keys(windowsSeriesData).map((item, index) => (
            <TRows titles={titles} ticker={strategyStock} date={windowsSeriesData[item]['date']} key={index} data={windowsSeriesData} item={item}  />
        ))}
    </>
)
const SubRows  = connect(
    mapStateToProps,
)(ConnectedSubRows);

export default SubRows;
