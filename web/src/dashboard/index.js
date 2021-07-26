import React, { useEffect} from "react";
import MainGraph from "../components/mainGraphs"
import CardPageVisits from "../cards/CardPageVisits.js";
import FilterTable from "../components/filterTable"
import { connect } from "react-redux";
import { getCandlestickData } from "../js/actions/index";
import MainTable from "../components/MainTable";

function mapStateToProps(state) {
  return {
    dataAO: state.remoteAOData,
    graphCount: state.graphCount,
  };
}


function Dashboard(props) {

  return (
    <>
        <div className="flex flex-wrap">
          <div style={{ height: `${75 + (props.graphCount - 1) * 35}vh`, backgroundColor:'black', zIndex:'10'}} className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <MainGraph />
          </div>
          <div className="w-full xl:w-4/12 px-4">
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
          <MainTable />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <FilterTable />
          </div>
        </div>
    </>
  );
}


export default connect(
  mapStateToProps,
  { getCandlestickData }
)(Dashboard);