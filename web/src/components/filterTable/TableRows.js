import React, { useEffect } from 'react';
import Row from './elements/Row';
import { connect } from 'react-redux';


// {"AACG": [{"open": 3, "close": 3, "high": 3, "low": 3,
// "volume": 47500, "date": "2021-05-04", "ticker_id": 4, 
// "ticker": "AACG", "median_close": 2},

const mapStateToProps = state => {
    return { 
        filteredStockArr: state.filteredStockArr,
     };
  };
const ConnectedTableRows = ({ filteredStockArr }) => {
    return (
        <tbody style={{ width: '100em' }}>
            {filteredStockArr && Object.keys(filteredStockArr).map((key, ind) => (
                <Row key={ind} ticker={key} company={filteredStockArr[key][0]['company']} volume={filteredStockArr[key][0]['volume']} median={filteredStockArr[key][0]['median_close']} />
            ))}

        </tbody>
    )
}


const TableRows = connect(
    mapStateToProps,
    )(ConnectedTableRows);

export default TableRows;