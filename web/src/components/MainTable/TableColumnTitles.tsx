import React from 'react';

const titles = [
    ['Ticker'],
    ['Close', 'High', 'Low', 'Volume'],
    ['High/Low', 'Spread'],
    ['MACD', 'Divergence'],
    ['MACD', 'Signal', 'Value'],
];

const TableColumnTitles = () => {
    return (
        <>
            {titles.map((item, index) => (
                <th key={index} className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    {item.map((itm) => (
                        <div>{ itm }</div>
                    ))}
                </th>

            ))}
        </>
    )
}

export default TableColumnTitles;