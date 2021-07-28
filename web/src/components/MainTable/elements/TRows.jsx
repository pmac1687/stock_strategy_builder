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
  

const TRows = ({ ticker, data, item, date, titles  }) => {
    const [dataArr, setDataArr] = useState([])
    return (
        <tr>
            <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                <pre>{ticker}  { date }</pre>
            </th>
            {data[item] && titles.map((itm, index) => (
                <td key={index} className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    {itm.map((itms, index) => (
                        <div key={index}>{itms} : {data[item][itms]}</div>
                    ))}
                </td>
            ))}
        </tr>
    )
};

export default TRows;