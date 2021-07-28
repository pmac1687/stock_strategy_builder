import {
  // select stock //`
  LOAD_TICKER_LIST,
  SET_STRATEGY_STOCK,
  LOAD_STRATEGY_DATA,
  LOAD_CANDLESTICK,
  // zoom graph  ///
  FILTER_GRAPH_DATA,
  GET_REF_COORDS,
  // main table -- zoom data//
  ADD_WINDOWS_SERIES_DATA,
  ADD_SERIES_ARRAY, 

  
  SET_MAIN_GRAPH_TYPE,


  SHOW_NOTES,
  ADD_GRAPH,
  INCREMENT_COUNT,
  REMOVE_GRAPH,
  ADD_CLOSE_GRAPH,
  DECREMENT_COUNT,

  //ADD_WINDOW_COORDS,
  //REMOVE_WINDOW_COORDS,

  SET_SHOW_SELECT_STOCK,
  SET_SHOW_GRAPH_TYPE_SELECT,
  SET_SHOW_INDICATOR_SELECT,
  SET_FILTER_ABC_ARR,
  SET_FILTER_PRICE_ARR,
  SET_FILTER_PERIOD_ARR,
  SET_DATE_RANGE,
  SET_FILTERED_STOCK_ARR,
  SET_MASTER_DATE_RANGE,
} from "../constants/action-types";
import {
  useDummy,
  StratStockData,
  TickerList,
  MasterDateRange, 
  CandlestickData,
  WindowsSeriesData,
  FilteredStockArr
} from '../dummy'
const initialState = {
  // on load // 
  tickerList: useDummy ? TickerList : [],
  masterDateRange: useDummy ? MasterDateRange : [],

  // select stock //
  strategyStock: 'CNTY',
  stratStockData: useDummy ? StratStockData : [],
  candlestickData: useDummy ? CandlestickData: [],
  // zoom graph // 
  refCoords: [],
  // main table - zoom data ////
  seriesWindows: [],
  windowsSeriesData: useDummy ? WindowsSeriesData : {},
  ///// collapse bools  ///////////
  showSelectStock: false,
  showGraphTypeSelect: false,
  showIndicatorSelect: false,
  showNotes: false,



  mainGraphType: 'candle',
  graphs: ['candle'],
  graphCount: 1,
  refWindow: [],
  windowsStocks: [],

  filterAbcArr: [0,25],
  priceFilterArr: [0,1000],
  periodFilterArr: ['3-1-2021', '3-1-2020'],
  dateRange: [],
  filteredStockArr: useDummy ? FilteredStockArr: [],
};


function rootReducer(state = initialState, action) {
  ///////  set stock ///////
  if (action.type === SET_STRATEGY_STOCK) {
    return {...state, strategyStock: action.payload}
  }
  if (action.type === LOAD_STRATEGY_DATA) {
    console.log('load strat stock reducers',action.payload)
    return {...state, stratStockData: action.payload}
  }
  if (action.type === LOAD_CANDLESTICK) {
    console.log('load candlestick', action.payload)
    return {...state, candlestickData: action.payload}
  }
  //////// zoom graph /////////////
  if ( action.type === GET_REF_COORDS) {
    return {...state, refCoords: [...action.payload]}
  }
  if ( action.type === FILTER_GRAPH_DATA) {
    let withinRange = false
    const stratArr = []
    const candleArr = []
    console.log('action getrefcoords  stratstockdata', state.stratStockData)
    for(const i in Object.keys(state.candlestickData)){
      const dat = state.candlestickData[i];
      if(dat.date === state.refCoords[1]){
        withinRange = false;
        stratArr.push(dat);
        candleArr.push(state.candlestickData[i]);
        break
      }
      if(withinRange === true){
        stratArr.push(dat);
        candleArr.push(state.candlestickData[i]);
      }
      if(dat.date === state.refCoords[0]){
        withinRange = true;
        stratArr.push(dat);
        candleArr.push(state.candlestickData[i]);
      }
    }
    return {...state, candlestickData: [...candleArr], stratStockData: [...stratArr]}
  }
  ////// main table -- zoom dat /////////////////////
  if ( action.type === ADD_WINDOWS_SERIES_DATA) {
    return { ...state, windowsSeriesData: { ...state.windowsSeriesData, ...action.payload }}
  }

  if ( action.type === ADD_SERIES_ARRAY) {
    let coords = state.refCoords;
    const arr = []
    let within = false
    if(coords[0] && coords[1]){
      coords = coords.sort()
      for(const i in Object.keys(state.stratStockData)){
        const dat = state.stratStockData[i];
        if(dat['date'] === coords[1]){
          arr.push(dat['date']);
          within = false;
          break
        }
        if(within === true){
          arr.push(dat['date'])
        }
        if(dat['date'] === coords[0]){
          arr.push(dat['date']);
          within = true
        }
      }
      return {...state, seriesWindows: [...state.seriesWindows, arr], windowsStocks: [...state.windowsStocks, state.strategyStock]}
    }
  }

  //////// NEW STUFF ////////
  if (action.type === SET_MAIN_GRAPH_TYPE) {
    return {...state, mainGraphType: action.payload}
  }
  if (action.type === SET_MASTER_DATE_RANGE) {
    return {...state, masterDateRange: action.payload}
  }
  if (action.type === LOAD_TICKER_LIST) {
    return {...state, tickerList: action.payload}
  }
  if (action.type === SHOW_NOTES) {
    return {...state, showNotes: action.payload}
  }
  if (action.type === LOAD_CANDLESTICK) {
    return {...state, candlestickData: action.payload}
  }
  if (action.type === INCREMENT_COUNT) {
    return {...state, graphCount: state.graphCount + 1}
  }
  if (action.type === SET_SHOW_SELECT_STOCK) {
    return {...state, showSelectStock: action.payload}
  }
  if (action.type === SET_SHOW_GRAPH_TYPE_SELECT) {
    return {...state, showGraphTypeSelect: action.payload}
  }
  if (action.type === SET_SHOW_INDICATOR_SELECT) {
    return {...state, showIndicatorSelect: action.payload}
  }
  if (action.type === SET_FILTER_ABC_ARR) {
    return {...state, filterAbcArr: action.payload}
  }
  if (action.type === SET_FILTER_PRICE_ARR) {
    return {...state, filterPriceArr: action.payload}
  }
  if (action.type === SET_FILTER_PERIOD_ARR) {
    return {...state, filterPeriodArr: action.payload}
  }
  if (action.type === SET_DATE_RANGE) {
    return {...state, dateRange: action.payload}
  }
  if (action.type === DECREMENT_COUNT) {
    return {...state, graphCount: state.graphCount - 1}
  }
  if (action.type === ADD_CLOSE_GRAPH) {
    const arr = []
    for(let i=0;i<state.graphs.length;i++){
      if(i===0){
        arr.push(action.payload)
      } else {
        arr.push(state.graphs[i])
      }
    }
    return {...state, graphs: arr}
  }

  if (action.type === ADD_GRAPH) {
    return {...state, graphs: [...state.graphs, action.payload]}
  }
  if (action.type === REMOVE_GRAPH) {
    const filtered = state.graphs.filter((item) => 
      item !== action.payload
    )
    return {...state, graphs: filtered}
  }




/*
  if ( action.type === REMOVE_WINDOW_COORDS) {
    return {...state, refWindow: ['', '']}
  }
*/
  if ( action.type === SET_FILTERED_STOCK_ARR) {
    return {...state, filteredStockArr: action.payload}
  }
/*
  if ( action.type === ADD_WINDOW_COORDS) {
    console.log('action.window.coords', action.payload)
    if(action.payload[1] === 'left'){
      return {...state, refWindow: [action.payload[0]['label'], state.refWindow[1]]}
    }
    if(action.payload[1] === 'right'){
      return {...state, refWindow: [state.refWindow[0], action.payload[0]['label']]}
    }
  }
*/
  return state;
}

export default rootReducer;