import React, { useEffect, useState} from "react";
import axios from 'axios';

// components

import CardBarChart from "../cards/CardBarChart.js";
import MainGraph from "../components/mainGraph"
import CardPageVisits from "../cards/CardPageVisits.js";
import CardSocialTraffic from "../cards/CardSocialTraffic.js";
import { connect } from "react-redux";
import { getData, getCandlestickData } from "../js/actions/index";


function Dashboard(props) {

  const [stockData] = useState([]);
  const [setStock] = useState('');
  const [historyData] = useState([]);
  useEffect(() => {
    props.getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    console.log('ceejwgcjhjhccjhj', props.dataAO)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataAO])


  
  return (
    <>
        <div className="flex flex-wrap">
          <div style={{ height: '70vh', backgroundColor:'black', zIndex:'10'}} className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <MainGraph />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardBarChart historyData={historyData} />
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits  />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic  setStock={setStock} stockData={stockData} />
          </div>
        </div>
    </>
  );
}


function mapStateToProps(state) {
  return {
    dataAO: state.remoteAOData
  };
}


export default connect(
  mapStateToProps,
  { getData, getCandlestickData }
)(Dashboard);