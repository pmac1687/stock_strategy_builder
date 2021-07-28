import React from 'react';
import { connect } from "react-redux";
import DropDown from '../elements/DropDown';
import SearchSelect from '../elements/SearchSelect';


import { 
    setStrategyStock, 
    getStockData, 
    getCandlestickData,
    collapse,
    setShowSelectStock, 
  } from "../../../js/actions/index";

const mapStateToProps = (state) => {
  return { 
    tickerList: state.tickerList,
    showSelectStock: state.showSelectStock,
   };
};
/*
type Props = {
  setStrategyStock: (opt: ValueType<{ value: string, label: string }, false>) => void,
  getStockData: () => void,
  getCandlestickData: () => void,
  collapse: ({}) => void,
  setShowSelectStock: () => void,
  tickerList: [],
  showSelectStock: boolean,
}
*/

const ConnectedStockSelect = ({
  setStrategyStock,
  getStockData,
  getCandlestickData,
  collapse,
  setShowSelectStock,
  tickerList,
  showSelectStock,
}) => {


    return (
        <>
        <DropDown
          onClickFunc={(e) => { collapse({ 'id': 'stock', 'bool': showSelectStock, 'func': 'SET_SHOW_SELECT_STOCK', 'action': 'stockSearch' }) }}
              title={'Stock'}
              id={'stock'}
              margin={'41%'}
              marginL={''}

            />
            <SearchSelect
              id={'stockSearch'}
              display={'none'}
              width={'100%'}
              onChangeFunc={(opt) => { setStrategyStock(opt.label.split(' ')[0]); getStockData(); getCandlestickData() }}
              options={tickerList}
            />
        </>
      );
    };
    

const StockSelect = connect(
    mapStateToProps,
    { 
      setStrategyStock, 
      getStockData, 
      getCandlestickData,
      collapse,
      setShowSelectStock 
     }
    )(ConnectedStockSelect);

export default StockSelect;