/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SET_STRATEGY_STOCK, SET_SHOW_SELECT_STOCK, SHOW_NOTES, LOAD_STRATEGY_DATA, LOAD_CANDLESTICK } from './constants';

const initialState = {
  strategyStock: 'CNTY',
  showSelectStock: false,
  showNotes: false,
  stratStockData: [],
  candlestickData: [],
};

interface Props {
  state: {
    strategyStock: string,
    showSelectStock: boolean,
    showNotes: boolean,
    stratStockData: [],
    candleStickData: [],
  };
  action: {
    type: string,
    payload: [] | string | boolean,
  };
  strategyStock: string;
  showSelectStock: boolean;
  showNotes: boolean;
  stratStockData: [];
  candleStickData: [];
}

function stockSelectrootReducer(state = initialState, action: { type: never, payload: never }): Props {
  if (action.type === SET_STRATEGY_STOCK) {
    console.log(action.payload);
    return { ...state, strategyStock: action.payload };
  }
  if (action.type === SET_SHOW_SELECT_STOCK) {
    return { ...state, showSelectStock: action.payload };
  }
  if (action.type === SHOW_NOTES) {
    console.log('notes', action.payload);
    return { ...state, showNotes: action.payload };
  }
  if (action.type === LOAD_STRATEGY_DATA) {
    console.log(action.payload);
    return { ...state, stratStockData: action.payload };
  }
  if (action.type === LOAD_CANDLESTICK) {
    console.log('notes', action.payload);
    return { ...state, candlestickData: action.payload };
  }
  return state;
}

export default stockSelectrootReducer;
