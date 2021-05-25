import { ADD_STOCK, 
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
  /////////////
  SET_MAIN_GRAPH_TYPE,
  SET_STRATEGY_STOCK, 
  LOAD_STRATEGY_DATA,
  LOAD_TICKER_LIST,
  SHOW_NOTES,
  LOAD_CANDLESTICK,
  ADD_GRAPH,
  INCREMENT_COUNT,
  REMOVE_GRAPH,
  ADD_CLOSE_GRAPH
} from "../constants/action-types";
import axios from 'axios';

export function addStock(payload) {
    return { type: ADD_STOCK, payload }
  };

export function addLineData(payload) {
  return { type: SET_LINE_DATA, payload }
};

export function addPageHistory(payload) {
  return { type: SET_PAGE_HISTORY_DATA_ARR, payload }
};

export function addSocialData(payload) {
  return { type: SET_SOCIAL_DATA, payload }
};

export function addMasterLineData(payload) {
  return { type: SET_MASTER_LINE_DATA, payload }
};

export function addHistoryGraphData(payload) {
  return { type: SET_HISTORY_GRAPH_DATA, payload }
};

export function addMasterHistoryData(payload) {
  return { type: SET_MASTER_HISTORY_DATA, payload }
};

export function addBarData(payload) {
  return { type: SET_BAR_DATA, payload }
};

export function incrementBarIndex(payload) {
  return { type: MOVE_BAR_LEFT, payload }
};

export function decrementBarIndex(payload) {
  return { type: MOVE_BAR_RIGHT, payload }
};

export function addMasterBarData(payload) {
  return { type: SET_MASTER_BAR_DATA, payload }
};

export function getHistoryData() {
  return function(dispatch, getState) {
    const { stock } = getState()
    console.log('reducer', stock)
    if(stock){
      return   axios.get(`http://localhost:5000/${stock[stock.length - 1]}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
          })  
          .then(res => res.data)
          .then(data => {
            console.log('resdata', data)  
            dispatch({ type: SET_HISTORY_DATA, payload: data})
          })
          .catch(err => {  
            console.log(err)  
          });  
        }
  };
}

export function getData() {
  return function(dispatch) {
    return   axios.get(`http://localhost:5000/`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })  
        .then(res => res.data)
        .then(data => {
          console.log('resdata', data)  
          dispatch({ type: DATA_LOADED, payload: data})
        })
        .catch(err => {  
          console.log(err)  
        });  
  };
}

/////////// NEW STUFF /////////

export function setMainGraphType(payload) {
  return { type: SET_MAIN_GRAPH_TYPE, payload }
};

export function setStrategyStock(payload) {
  return { type: SET_STRATEGY_STOCK, payload }
};

export function setShowNotes(payload) {
  return { type: SHOW_NOTES, payload }
};

export function addGraph(payload, getState) {
  return function(dispatch, getState){
    const { graphs } = getState();
    console.log('payload', payload)
    dispatch({ type: ADD_GRAPH, payload: payload})
  }
};

export function removeGraph(payload, getState) {
  return function(dispatch, getState){
    const { graphs } = getState();
    console.log('payload', payload)
    dispatch({ type: REMOVE_GRAPH, payload: payload})

  }
};

export function incrementGraphCount(payload) {
  return { type: INCREMENT_COUNT, payload}
};

export function addFirstGraph(payload) {
  return { type: ADD_CLOSE_GRAPH, payload}
};

export function getStockData() {
  return function(dispatch, getState) {
    const { strategyStock } = getState()
    console.log('strratta', strategyStock)
    return   axios.get(`http://localhost:5000/${strategyStock}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })  
        .then(res => res.data)
        .then(data => {
          console.log('resdata', data)  
          dispatch({ type: LOAD_STRATEGY_DATA, payload: data})
        })
        .catch(err => {  
          console.log(err)  
        });  
  };
}

export function getCandlestickData() {
  return function(dispatch, getState) {
    const { strategyStock } = getState()
    console.log('strratta', strategyStock)
    return   axios.get(`http://localhost:5000/candlestick/${strategyStock}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })  
        .then(res => res.data)
        .then(data => {
          console.log('resdata', data)  
          dispatch({ type: LOAD_CANDLESTICK, payload: data})
        })
        .catch(err => {  
          console.log(err)  
        });  
  };
}

export function getTickerList() {
  return function(dispatch) {
    return   axios.get(`http://localhost:5000/tickerList`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })  
        .then(res => res.data)
        .then(data => {
          console.log('resdata', data)  
          dispatch({ type: LOAD_TICKER_LIST, payload: data})
        })
        .catch(err => {  
          console.log(err)  
        });  
  };
}
