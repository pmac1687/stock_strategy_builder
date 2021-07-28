import React from 'react';
import TableColumnTitles from './TableColumnTitles';

const titles = [
    ['Ticker'],
    ['open','Close', 'High', 'Low', 'volume'],
    ['accel_oss','ao','atr','momentum'],
    ['rsi_6', 'rsi_12', 'rsi_18','rsi_24'],
    ['sma_10', 'sma_50','sma_200'],
    ['smma_5', 'smma_50', 'smma_200'],
    ['ema_10', 'ema_50', 'ema_200'],
];

const TableHead = () => (
    <thead>
        <tr>
            <TableColumnTitles titles={titles} />
        </tr>
    </thead>
)

export default TableHead;