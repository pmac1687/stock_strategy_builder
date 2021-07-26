import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { 
      windowsSeriesData: state.windowsSeriesData,
      windowsStocks: state.windowsStocks
     };
};

const titles = [
    ['Ticker'],
    ['Close', 'High', 'Low', 'Volume'],
    ['High/Low', 'Spread'],
    ['MACD', 'Divergence'],
    ['MACD', 'Signal', 'Value'],
];
  

const ConnectedTRows = ({ windowsSeriesData, windowsStocks }) => {
    const [dataArr, setDataArr] = useState([])
    useEffect(() => {
        for (const keys in Object.keys(windowsSeriesData)) {
            console.log(keys, windowsSeriesData[keys])
        }
    }, [windowsSeriesData])
    
    return (
        <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                <div>hello</div>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <div>hello</div>
            </td>
        </tr>
    )
};

const TRows  = connect(
    mapStateToProps,
    )(ConnectedTRows);

export default TRows;