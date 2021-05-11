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

