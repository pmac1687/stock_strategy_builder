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
  LOAD_CANDLESTICK  
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

  return state;
}

export default rootReducer;