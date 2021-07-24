import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { 
      windowsSeriesData: state.windowsSeriesData,
      windowsStocks: state.windowsStocks
     };
};
  

const ConnectedTRows = ({ windowsSeriesData, windowsStocks }) => {
    const [dataArr, setDataArr] = useState([])
    useEffect(() => {
        const arr = []
        for (const ind in Object.keys(windowsSeriesData)) {
            arr.push(windowsSeriesData[ind]);
        }
        console.log(arr)
    },[windowsSeriesData])
    return (
        <div>hello</div>
    )
};

const TRows  = connect(
    mapStateToProps,
    )(ConnectedTRows);

export default TRows;