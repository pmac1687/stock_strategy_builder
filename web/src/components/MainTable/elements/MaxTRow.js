import React, {useEffect} from 'react';
import { windowsSeriesDataType } from '../util/apiTypes'



const titles = [
    ['Close', 'High', 'Low', 'volume'],
    ['High/Low', 'Spread'],
    ['MACD', 'Divergence'],
    ['MACD', 'Signal', 'Value'],
];

const MaxTRow = ({ ticker, data }) => {
    useEffect(() => {
        console.log(data['max'], 'maxData')
    },[data])
    return (
    <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                <div>{ ticker }</div>
        </th>
            {titles.map((item, ind) => (
            <td key={ind} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item.map((itm) => (
                        <div>{data['max'] && data['max'][itm]}</div>
            ))}
            </td>

        ))}   
            
    </tr>
    )
}

export default MaxTRow;