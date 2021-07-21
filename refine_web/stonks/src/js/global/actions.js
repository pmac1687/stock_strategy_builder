import { LOAD_TICKER_LIST } from './constants';
import axios from 'axios';

export function getTickerList() {
  return function (dispatch) {
    return axios
      .get(`http://localhost:5000/tickerList`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(res => res.data)
      .then(data => {
        console.log('resdata', data);
        dispatch({ type: LOAD_TICKER_LIST, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
