import { 
  ADD_STOCK,
  DATA_LOADED, 
  SET_LINE_DATA, 
  SET_MASTER_LINE_DATA, 
  SET_HISTORY_DATA, 
  SET_HISTORY_GRAPH_DATA,
  SET_MASTER_HISTORY_DATA,
  SET_BAR_DATA,
  SET_MASTER_BAR_DATA,
  MOVE_BAR_LEFT,
  MOVE_BAR_RIGHT,
  SET_SOCIAL_DATA,
  SET_PAGE_HISTORY_DATA_ARR,
  ///////////
  SET_MAIN_GRAPH_TYPE,
  SET_STRATEGY_STOCK,
  LOAD_STRATEGY_DATA,
  LOAD_TICKER_LIST,
  SHOW_NOTES,
  LOAD_CANDLESTICK,
  ADD_GRAPH,
  INCREMENT_COUNT,
  REMOVE_GRAPH,
  ADD_CLOSE_GRAPH,
  DECREMENT_COUNT,
  FILTER_GRAPH_DATA,
  GET_REF_COORDS,
  ADD_WINDOW_COORDS,
  ADD_SERIES_ARRAY, 
  REMOVE_WINDOW_COORDS  
} from "../constants/action-types";

const initialState = {
  stock: [],
  remoteAOData: [],
  cardLineData: [],
  masterCardLineData: [],
  cardHistoryData: [],
  cardHistoryGraphData: [],
  masterHistoryData: [],
  cardBarData: [],
  masterCardBarData: [],
  cardBarIndex: [8,0],
  socialData: [],
  pageHistoryDataArr: [],
  ///////////
  mainGraphType: 'candle',
  strategyStock: '',
  stratStockData: [],
  tickerList: [],
  showNotes: false,
  candlestickData: [],
  graphs: ['candle'],
  graphCount: 1,
  refCoords: [],
  refWindow: [],
  seriesWindows: [],
};


function rootReducer(state = initialState, action) {
  if (action.type === ADD_STOCK) {
    return {...state, stock: [...state.stock, action.payload.split(' ')[2]]}
  }
  if (action.type === DATA_LOADED) {
    return {...state, remoteAOData: action.payload}
  }
  if (action.type === SET_LINE_DATA) {
    return {...state, cardLineData: action.payload}
  }
  if (action.type === SET_SOCIAL_DATA) {
    return {...state, socialData: action.payload}
  }
  if (action.type === SET_MASTER_LINE_DATA) {
    return {...state, masterCardLineData: action.payload}
  }
  if (action.type === SET_HISTORY_DATA) {
    return {...state, cardHistoryData: action.payload}
  }
  if (action.type === SET_PAGE_HISTORY_DATA_ARR) {
    return {...state, pageHistoryDataArr: action.payload}
  }
  if (action.type === SET_HISTORY_GRAPH_DATA) {
    return {...state, cardHistoryGraphData: action.payload}
  }
  if (action.type === SET_MASTER_HISTORY_DATA) {
    return {...state, masterHistoryData: action.payload}
  }
  if (action.type === SET_BAR_DATA) {
    return {...state, cardBarData: action.payload}
  }
  if (action.type === MOVE_BAR_LEFT) {
    return {...state, cardBarIndex: action.payload}
  }
  if (action.type === MOVE_BAR_RIGHT) {
    return {...state, cardBarIndex: action.payload}
  }
  if (action.type === SET_MASTER_BAR_DATA) {
    return {...state, masterCardBarData: action.payload}
  }
  //////// NEW STUFF ////////
  if (action.type === SET_MAIN_GRAPH_TYPE) {
    console.log(action.payload)
    return {...state, mainGraphType: action.payload}
  }
  if (action.type === SET_STRATEGY_STOCK) {
    console.log(action.payload)
    return {...state, strategyStock: action.payload}
  }
  if (action.type === LOAD_STRATEGY_DATA) {
    console.log(action.payload)
    return {...state, stratStockData: action.payload}
  }
  if (action.type === LOAD_TICKER_LIST) {
    console.log(action.payload)
    return {...state, tickerList: action.payload}
  }
  if (action.type === SHOW_NOTES) {
    console.log('notes', action.payload)
    return {...state, showNotes: action.payload}
  }
  if (action.type === LOAD_CANDLESTICK) {
    console.log('notes', action.payload)
    return {...state, candlestickData: action.payload}
  }
  if (action.type === INCREMENT_COUNT) {
    console.log('notes', action.payload)
    return {...state, graphCount: state.graphCount + 1}
  }
  if (action.type === DECREMENT_COUNT) {
    console.log('notes', action.payload)
    return {...state, graphCount: state.graphCount - 1}
  }
  if (action.type === ADD_CLOSE_GRAPH) {
    console.log('notes', action.payload)
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
    console.log('action.payload', action.payload)
    return {...state, graphs: [...state.graphs, action.payload]}
  }
  if (action.type === REMOVE_GRAPH) {
    console.log('action.payload', action.payload)
    console.log('state.graphs', state.graphs)
    const filtered = state.graphs.filter((item) => 
      item !== action.payload
    )
    return {...state, graphs: filtered}
  }

  if ( action.type === GET_REF_COORDS) {
    console.log('action.REDUCER.FILTER', action.payload)
    return {...state, refCoords: [...action.payload]}
  }

  if ( action.type === ADD_SERIES_ARRAY) {
    let coords = state.refWindow;
    const arr = []
    let within = false
    if(coords[0] && coords[1]){
      coords = coords.sort()
      for(let i=0;i<state.stratStockData.length;i++){
        const dat = state.stratStockData[i];
        if(dat['date'] === coords[1]){
          arr.push(dat);
          within = false;
          break
        }
        if(within === true){
          arr.push(dat)
        }
        if(dat['date'] === coords[0]){
          arr.push(dat);
          within = true
          console.log(dat['date'],coords[0], 'date reducer')
        }
      }
      return {...state, seriesWindows: [...state.seriesWindows, arr]}
    }
  }

  if ( action.type === REMOVE_WINDOW_COORDS) {
    return {...state, refWindow: ['', '']}
  }

  if ( action.type === ADD_WINDOW_COORDS) {
    console.log('action.window.coords', action.payload)
    if(action.payload[1] === 'left'){
      return {...state, refWindow: [action.payload[0]['label'], state.refWindow[1]]}
    }
    if(action.payload[1] === 'right'){
      return {...state, refWindow: [state.refWindow[0], action.payload[0]['label']]}
    }
  }

  if ( action.type === FILTER_GRAPH_DATA) {
    console.log('action.REDUCER.FILTER', state.refCoords)
    let withinRange = false
    const stratArr = []
    const candleArr = []
    for(let i=0;i < state.stratStockData.length;i++){
      const dat = state.stratStockData[i];
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

  return state;
}

export default rootReducer;