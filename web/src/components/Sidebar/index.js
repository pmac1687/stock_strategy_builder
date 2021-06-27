/*eslint-disable*/
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardAOChart from '../mainGraph/CardAOChart';
import StockFilter from './StockFilter/';
import StockSelect from './DevelopStrategy/StockSelect';
import GraphTypeSelect from "./DevelopStrategy/GraphTypeSelect";
import IndicatorSelect from "./DevelopStrategy/IndicatorsSelect";
import SearchBar from "./DevelopStrategy/SearchBar";
import ShowNotes from './DevelopStrategy/ShowNotes';
import Toggler from "./misc/Toggler";
import headerForm from "./misc/headerForm";
import Header from "./misc/header";

import { connect } from "react-redux";
import { 
  setMainGraphType, 
  setStrategyStock, 
  getStockData, 
  getTickerList, 
  setShowNotes, 
  getCandlestickData, 
  addGraph, 
  incrementGraphCount, 
  removeGraph, 
  addFirstGraph,
  decrementGraphCount,
  addWindowCoords, 
} from "../../js/actions/index";

import Select from 'react-select';


const mapStateToProps = state => {
  return { 
    mainGraphType: state.mainGraphType,
    strategyStock: state.strategyStock,
    tickerList: state.tickerList,
    graphCount: state.graphCount,
    graphs: state.graphs,
    stratStockData: state.stratStockData,

    
    win: state.refWindow
   };
};

function ConnectedSidebar(props) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [showStock, setShowStock] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showStrategyFilter, setShowStrategyFilter] = useState(false);
  const [dates, setDates] = useState([]);
  const arr = [1,2,3,4]
  useEffect(() => {
    const arrs = []
    props.stratStockData.map((item) => {
      arrs.push({
        'label': item['date'],
        'value': item['date']
      });
    });
    setDates(prev => [...arrs])
    console.log(dates)
  },[props.stratStockData])

  useEffect(() => {
    console.log('window', props.win)
  },[props.win])

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
      props.decrementGraphCount();
    }
    console.log('checked',e.target.checked)
  }

  
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <Toggler />
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
            >
            <headerForm />

            <Header />
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <StockSelect />
              <GraphTypeSelect />
              <IndicatorSelect />
              <ShowNotes
                onClick={() => collapse('notes', showNotes, setShowNotes, 'notesDetails')}
                content={'Notes'}
                icon={<FontAwesomeIcon style={{ marginLeft:'37%'}} id='notes' icon={faChevronUp} size='lg'/>}
              />
              <SearchBar 
                style={{width: '100%'}} 
                options={dates} 
                onChange={opt => {props.addWindowCoords([opt,'left'])}}
                placeholder={'Choose Date'}
              />
              <SearchBar 
                style={{ width: '100%', marginTop:'2vh'}} 
                options={dates} 
                onChange={opt => {props.addWindowCoords([opt,'right'])}}
                placeholder={'Choose Date'}
              />
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Stock Filter
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li onClick={() => collapse('strategy', showStrategyFilter, setShowStrategyFilter, 'strategyFilter')} className="items-center">
                <a
                  className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                  to="/auth/login"
                >
                  <i className="fas fa-fingerprint text-gray-500 mr-2 text-sm"></i>{" "}
                  Filter <FontAwesomeIcon style={{ marginLeft: '3vw'}} id='strategy' icon={faChevronUp} size='lg'/>
                </a>
              </li>
            </ul>

            <li id='strategyFilter' style={{ display: 'none'}} className="items-center">
              <div class="shadow flex">
                <StockFilter />
              </div>
            </li>



            {/* Divider */}
            <div style={{ height:'30px'}}></div>
            <hr  className="my-4 md:min-w-full" />
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
  { 
    setMainGraphType, 
    setStrategyStock, 
    getStockData, 
    getTickerList, 
    setShowNotes, 
    getCandlestickData, 
    addGraph, 
    incrementGraphCount, 
    removeGraph, 
    addFirstGraph,
    decrementGraphCount,
    addWindowCoords
   }
  )(ConnectedSidebar);

export default Sidebar;