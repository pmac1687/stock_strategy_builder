import React from 'react';
import { connect } from "react-redux";


const mapStateToProps = (state: { masterHistoryData: any; pageHistoryDataArr: any; seriesWindows: any; windowsSeriesData: any; windowsStocks: any; }) => {
    return { 
      historyData: state.masterHistoryData,
      historyDataArray: state.pageHistoryDataArr,
      seriesWindows: state.seriesWindows,
      windowsSeriesData: state.windowsSeriesData,
      windowsStocks: state.windowsStocks
     };
  };

const ConnectedMainTable = () => (
    <div>hello</div>
)

const MainTable = connect(
    mapStateToProps,
    )(ConnectedMainTable);

export default MainTable;

