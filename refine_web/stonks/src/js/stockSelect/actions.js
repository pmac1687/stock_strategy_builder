import axios from 'axios';
import { SET_STRATEGY_STOCK, SET_SHOW_SELECT_STOCK, SHOW_NOTES, LOAD_STRATEGY_DATA, LOAD_CANDLESTICK } from './constants';

export function setStrategyStock(payload) {
  return { type: SET_STRATEGY_STOCK, payload };
}

export function setShowSelectStock() {
  return { type: SET_SHOW_SELECT_STOCK };
}

export function collapse(payload) {
  return function (dispatch, getState) {
    const show = payload.bool;
    if (show === false) {
      const ele = document.getElementById(payload.id);
      ele.style.transform = 'rotate(180deg)';
      //func(prev => true);
      dispatch({ type: payload.func, payload: true });
      if (payload.action !== 'notesDetails') {
        const ele2 = document.getElementById(payload.action);
        ele2.style.display = 'block';
      } else {
        dispatch({ type: SHOW_NOTES, payload: true });
        //props.setShowNotes(true)
      }
    }
    if (show === true) {
      const ele = document.getElementById(payload.id);
      ele.style.transform = 'rotate(360deg)';
      dispatch({ type: payload.func, payload: false });
      if (payload.action !== 'notesDetails') {
        const ele2 = document.getElementById(payload.action);
        ele2.style.display = 'none';
      } else {
        dispatch({ type: SHOW_NOTES, payload: false });
      }
    }
    //return { type: ADD_SERIES_ARRAY}
    return { type: null };
  };
}

export function getStockData() {
  return function (dispatch, getState) {
    const { strategyStock } = getState();
    return axios
      .get(`http://localhost:5000/${strategyStock}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(res => res.data)
      .then(data => {
        console.log('getStockData, api call redux-actions', data);
        dispatch({ type: LOAD_STRATEGY_DATA, payload: data });
      })
      .catch(err => {
        console.log('getStockData, api call redux-actions',err);
      });
  };
}

export function getCandlestickData() {
  return function (dispatch, getState) {
    const { strategyStock } = getState();
    return axios
      .get(`http://localhost:5000/candlestick/${strategyStock}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(res => res.data)
      .then(data => {
        console.log(' getCandlestickData(),api call actions- redux', data);
        dispatch({ type: LOAD_CANDLESTICK, payload: data });
      })
      .catch(err => {
        console.log(' getCandlestickData(),api call actions- redux',err);
      });
  };
}
