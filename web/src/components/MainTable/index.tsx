import React from 'react';
import { connect } from "react-redux";
import TableHeader from './TableHeader';
import TableColumnTitles from './TableHead';
import TableRows from './TableRows';


const mapStateToProps = (state: { masterHistoryData: any; pageHistoryDataArr: any; seriesWindows: any; windowsSeriesData: any; windowsStocks: any; }) => {
    return { 
      historyData: state.masterHistoryData,
      historyDataArray: state.pageHistoryDataArr,
      seriesWindows: state.seriesWindows,
      windowsSeriesData: state.windowsSeriesData,
      windowsStocks: state.windowsStocks
     };
};
/*  
type Props = {
    historyData: [],
    historyDataArray: [],
    seriesWindows: [],
    windowsSeriesData: [],
    windowsStocks: []
}
*/

const ConnectedMainTable = ({
    }) => (
    <>
        <TableHeader />
        <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
                <TableColumnTitles />
                <TableRows />
            </table>
        </div>

    </>
)

const MainTable = connect(
    mapStateToProps,
    )(ConnectedMainTable);

export default MainTable;

