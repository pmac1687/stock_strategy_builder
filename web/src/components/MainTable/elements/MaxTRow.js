import React, {useEffect} from 'react';
import { windowsSeriesDataType } from '../util/apiTypes'



const titles = [
    ['Close', 'High', 'Low', 'volume'],
    ['accel_oss','ao','atr','momentum'],
    ['rsi_6', 'rsi_12', 'rsi_18','rsi_24'],
    ['sma_10', 'sma_50','sma_200'],
    ['smma_5', 'smma_50', 'smma_200'],
    ['ema_10', 'ema_50', 'ema_200'],
];

const MaxTRow = ({ ticker, dataMin, dataMax }) => {
    return (
    <tr>
        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                <div>{ ticker }</div>
        </th>
            {titles.map((item, ind) => (
            <td key={ind} className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    {item.map((itm, index) => (
                        <div key={index} style={{ display: 'flex'}}>
                            <div style={{ color: 'green' }}>{dataMax && dataMax[itm]}</div>
                            <pre>/</pre>
                            <div style={{ color: 'red'}}>{dataMin && dataMin[itm]}</div>
                        </div>
            ))}
            </td>

        ))}   
            
    </tr>
    )
}

export default MaxTRow;