import { 
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
  REMOVE_WINDOW_COORDS,
  ADD_SERIES_ARRAY,
  ADD_WINDOWS_SERIES_DATA,
  SET_SHOW_SELECT_STOCK,
  SET_SHOW_GRAPH_TYPE_SELECT 
} from "../constants/action-types";
import axios from 'axios';

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

export function addRefCoords(payload) {
  return { type: GET_REF_COORDS, payload }
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

export function decrementGraphCount(payload) {
  return { type: DECREMENT_COUNT, payload}
};

export function addFirstGraph(payload) {
  return { type: ADD_CLOSE_GRAPH, payload}
};

export function filterGraphData() {
  return { type: FILTER_GRAPH_DATA}
};

export function addWindowCoords(payload) {
  return { type: ADD_WINDOW_COORDS, payload}
};

export function removeWindowCoords() {
  return { type: REMOVE_WINDOW_COORDS}
};

export function addSeriesArray() {
  return { type: ADD_SERIES_ARRAY}
};

export function setShowSelectStock() {
  return { type: SET_SHOW_SELECT_STOCK}
};

export function setShowGraphTypeSelect() {
  return { type: SET_SHOW_GRAPH_TYPE_SELECT}
};

export function collapse(payload) {
  console.log('selects tock', payload.func);
  return function(dispatch, getState){
    const show = payload.bool;
    console.log('show', show)
    if(show===false){
      const ele = document.getElementById(payload.id)
      ele.style.transform  = 'rotate(180deg)';
      //func(prev => true);
      dispatch({ type: payload.func, payload: true})
      console.log('booo', payload.bool)
      if(payload.action !== 'notesDetails'){
        const ele2 = document.getElementById(payload.action)
        ele2.style.display = 'block'
      }else{
        dispatch({ type: SHOW_NOTES, payload: true})
        //props.setShowNotes(true)
      }
    };
    if(show===true){
      const ele = document.getElementById(payload.id)
      ele.style.transform  = 'rotate(360deg)';
      dispatch({ type: payload.func, payload: false})
      if(payload.action !== 'notesDetails'){
        const ele2 = document.getElementById(payload.action)
        ele2.style.display = 'none'
      }else {
        dispatch({ type: SHOW_NOTES, payload: false})
      }
    };
    //return { type: ADD_SERIES_ARRAY}
  return { type: null}
  };
};

export function getWindowsSeriesData() {
  return function(dispatch, getState) {
    const { strategyStock, seriesWindows } = getState()
    const ind = seriesWindows.length - 1
    const end = seriesWindows[ind].length -1
    console.log('strratta', seriesWindows)
    return   axios.get(`http://localhost:5000/table/${seriesWindows[ind][0]},${seriesWindows[ind][end]},${strategyStock}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })  
        .then(res => res.data)
        .then(data => {
          console.log('resdata for the table', data)  
          dispatch({ type: ADD_WINDOWS_SERIES_DATA, payload: data})
        })
        .catch(err => {  
          console.log(err)  
        });  
  };
}

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
