/*eslint-disable*/
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardAOChart from '../mainGraph/CardAOChart';

import { connect } from "react-redux";
import { setMainGraphType, setStrategyStock, getStockData, getTickerList, setShowNotes, getCandlestickData, addGraph, incrementGraphCount, removeGraph, addFirstGraph } from "../../js/actions/index";

import Select from 'react-select';


const mapStateToProps = state => {
  return { 
    mainGraphType: state.mainGraphType,
    strategyStock: state.strategyStock,
    tickerList: state.tickerList,
    graphCount: state.graphCount,
    graphs: state.graphs,
   };
};

function ConnectedSidebar(props) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [showStock, setShowStock] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const indicators = {
    'ao': <CardAOChart id='ao' key={props.graphCount} />,
  }
  
  useEffect(() => {
    props.addFirstGraph(props.mainGraphType)
  },[props.mainGraphType])

  useEffect(() => {
    props.getTickerList();
    console.log('lisssststs', props.tickerList)
  }, [])

  
  function collapse(item, show, func, collapseItem){
    if(show===false){
      const ele = document.getElementById(item)
      ele.style.transform  = 'rotate(180deg)';
      func(prev => true);
      if(collapseItem !== 'notesDetails'){
        const ele2 = document.getElementById(collapseItem)
        ele2.style.display = 'block'
      }else{
        props.setShowNotes(true)
      }
    };
    if(show===true){
      const ele = document.getElementById(item)
      ele.style.transform  = 'rotate(360deg)';
      func(prev => false);
      if(collapseItem !== 'notesDetails'){
        const ele2 = document.getElementById(collapseItem)
        ele2.style.display = 'none'
      }else {
        props.setShowNotes(false)
      }
    };
  }

  function addCloseGraph(e,id){
    
  }

  function addIndicators(e, id){
    if(e.target.checked){
      props.addGraph(id);
      props.incrementGraphCount()

    } else {
      props.removeGraph(id);
      props.incrementGraphCount();
    }
    console.log('checked',e.target.checked)
  }

  
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <a
            className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Stock Strategy Builder
          </a>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
           
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <a
                    className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Stock Strategy Builder
                  </a>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Develop Strategy
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li onClick={() => collapse('stock', showStock, setShowStock, 'stockSearch')} className="items-center">
                <a style={{ display:'flex'}} className={"text-xs uppercase py-3 font-bold block " }>
                  <i className={"fas fa-tv mr-2 text-sm "}></i>
                  Stock <div  style={{ marginLeft: '60%'}}><FontAwesomeIcon id='stock' icon={faChevronUp} size='lg'/></div>
                </a>
              </li>

              <li id='stockSearch' style={{ display: 'none'}} className="items-center">
                <div class="shadow flex">
                  <div style={{ width: '30vw'}}>
                    <Select
                      onChange={opt => {props.setStrategyStock(opt.label.split(' ')[0]); props.getStockData();props.getCandlestickData()}}
                      options={props.tickerList}
                    />
                  </div>
                </div>
              </li>
                
              <li onClick={() => collapse('graph', showGraph, setShowGraph, 'graphDetails')} className="items-center">
                <a className={"text-xs uppercase py-3 font-bold block " }>
                  <i className={"fas fa-tv mr-2 text-sm "}></i>
                  Graph Type <FontAwesomeIcon style={{ marginLeft:'39%'}} id='graph' icon={faChevronUp} size='lg'/>
                </a>
              </li>

              <li id='graphDetails' style={{ display: 'none'}} className="items-center">
                  <div class="bg-gray-50">
                      <div class="flex flex-col items-start justify-center ">
                          <div class="flex flex-col">
                              <label class="inline-flex items-center mt-3">
                                  <input checked={props.mainGraphType === 'candle'} type="radio" id='candle' onChange={() => props.setMainGraphType('candle')} class="form-radio h-5 w-5 text-gray-600" /><span class="ml-2 text-gray-700">Candlestick</span>
                              </label>
                              <label class="inline-flex items-center mt-3">
                                  <input type="radio" id='line' checked={props.mainGraphType === 'line'} onChange={() => props.setMainGraphType('line')} class="form-radio h-5 w-5 text-red-600" /><span class="ml-2 text-gray-700">Line Graph</span>
                              </label>
                          </div>
                      </div>
                  </div>
              </li>


              <li onClick={() => collapse('indicators', showIndicators, setShowIndicators, 'indicatorDetails')} className="items-center">
                <a className={"text-xs uppercase py-3 font-bold block "}>
                  <i className={"fas fa-table mr-2 text-sm "}></i>
                  Indicators <FontAwesomeIcon style={{ marginLeft:'40%'}} id='indicators' icon={faChevronUp} size='lg'/>
                </a>
              </li>

              <li id='indicatorDetails' style={{ display: 'none'}}>
                <div class="block">
                  <span class="text-gray-700"></span>
                  <div class="mt-2">
                    <div>
                      <label class="inline-flex items-center">
                        <input type="checkbox" onChange={e => addIndicators(e, 'ao')} class="form-checkbox" />
                        <span class="ml-2">Awesome Oscillator</span>
                      </label>
                    </div>
                    <div>
                      <label class="inline-flex items-center">
                        <input onChange={e => addIndicators(e, 'bollinger')} type="checkbox" class="form-checkbox"/>
                        <span class="ml-2">Bollinger Bands</span>
                      </label>
                    </div>
                    <div>
                      <label class="inline-flex items-center">
                        <input onChange={e => addIndicators(e, 'ma')} type="checkbox" class="form-checkbox"/>
                        <span class="ml-2">Moving Average(Trend)</span>
                      </label>
                    </div>
                    <div>
                      <label class="inline-flex items-center">
                        <input onChange={e => addIndicators(e, 'rsi')} type="checkbox" class="form-checkbox"/>
                        <span class="ml-2">RSI</span>
                      </label>
                    </div>
                    <div>
                      <label class="inline-flex items-center">
                        <input onChange={e => addIndicators(e, 'macd')} type="checkbox" class="form-checkbox"/>
                        <span class="ml-2">MACD</span>
                      </label>
                    </div>
                  </div>
                </div>
              </li>

              <li onClick={() => collapse('notes', showNotes, setShowNotes, 'notesDetails')} className="items-center">
                <a className={"text-xs uppercase py-3 font-bold block "}>
                  <i className={"fas fa-map-marked mr-2 text-sm " }></i>
                  Notes <FontAwesomeIcon style={{ marginLeft:'56%'}} id='notes' icon={faChevronUp} size='lg'/>
                </a>
              </li>

              <li className="items-center">
                <a className={"text-xs uppercase py-3 font-bold block " }>
                  <i className={"fas fa-map-marked mr-2 text-sm " }></i>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Show
                  </button>
                  <button style={{ marginLeft:'1vw'}} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                    Save
                  </button>
                </a>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Auth Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <a
                  className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                  to="/auth/login"
                >
                  <i className="fas fa-fingerprint text-gray-500 mr-2 text-sm"></i>{" "}
                  Login
                </a>
              </li>

              <li className="items-center">
                <a
                  className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                  to="/auth/register"
                >
                  <i className="fas fa-clipboard-list text-gray-400 mr-2 text-sm"></i>{" "}
                  Register
                </a>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              No Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <a
                  className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                  to="/landing"
                >
                  <i className="fas fa-newspaper text-gray-500 mr-2 text-sm"></i>{" "}
                  Landing Page
                </a>
              </li>

              <li className="items-center">
                <a
                  className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                  to="/profile"
                >
                  <i className="fas fa-user-circle text-gray-500 mr-2 text-sm"></i>{" "}
                  Profile Page
                </a>
              </li>
            </ul>


          </div>
        </div>
      </nav>
    </>
  );
}

const Sidebar = connect(
  mapStateToProps,
  { setMainGraphType, setStrategyStock, getStockData, getTickerList, setShowNotes, getCandlestickData, addGraph, incrementGraphCount, removeGraph, addFirstGraph }
  )(ConnectedSidebar);

export default Sidebar;