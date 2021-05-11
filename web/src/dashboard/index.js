import React, { useEffect, useState, Component } from "react";
import axios from 'axios';

// components
import CardHistoryChart from '../cards/CardHistoryChart';
import CardLineChart from "../cards/CardLineChart.js";
import CardBarChart from "../cards/CardBarChart.js";
import CardPageVisits from "../cards/CardPageVisits.js";
import CardSocialTraffic from "../cards/CardSocialTraffic.js";
import { connect } from "react-redux";
import { getData } from "../js/actions/index";


function Dashboard(props) {

  const [stockData, setStockData] = useState([]);
  const [stock, setStock] = useState('');
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    props.getData();
  }, [])
  useEffect(() => {
    console.log('ceejwgcjhjhccjhj', props.dataAO)
  }, [props.dataAO])
  /*
  useEffect(() => {
    const arr = [];
    axios(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(response => {for(let x=0;x < response.data.length;x++){arr.push(response.data[x])}})
    setStockData(arr)
    if(stockData.length === 0){
      getData()
    };
    console.log(stockData)

  }, [stockData])*/
  const getData = () => {  
    axios.get(`http://localhost:5000/`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })  
    .then((res) => {  
      setStockData(res.data)
      console.log(stockData) 
    })
    .catch(err => {  
      console.log(err)  
    });  
  };
  useEffect(() => {
    console.log(stock);
  }, [stock])
  
  return (
    <>
        <div className="flex flex-wrap">
          <div style={{ height: '70vh'}} className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardLineChart style={{ display: 'block'}} stockData={stockData} />
          </div>
          <div style={{ height: '70vh', zIndex: '1', display:'nonel.'}} className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardHistoryChart style={{ display:'none'}} setHistoryData={setHistoryData}  />
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
  { getData }
)(Dashboard);