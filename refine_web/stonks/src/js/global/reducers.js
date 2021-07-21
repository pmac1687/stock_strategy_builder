/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { LOAD_TICKER_LIST } from './constants';

const initialState = { tickerList: [] };

function globalrootReducer(state = initialState, action) {
  if (action.type === LOAD_TICKER_LIST) {
    console.log(action.payload);
    return { ...state, tickerList: action.payload };
  }
  return state;
}

export default globalrootReducer;
