import React from 'react';
import { connect } from "react-redux";
import DropDown from '../elements/DropDown';
import SearchSelect from '../elements/SearchSelect';
import { ValueType } from 'react-select/lib/types';


import { 
    setStrategyStock, 
    getStockData, 
    getCandlestickData,
    collapse,
    setShowSelectStock, 
  } from "../../../js/actions/index";

const mapStateToProps = (state: { tickerList: any; showSelectStock: any; }) => {
  return { 
    tickerList: state.tickerList,
    showSelectStock: state.showSelectStock,
   };
};

type Props = {
  setStrategyStock: ValueType<{ value: string; label: string; }>,
  getStockData: () => void,
  getCandlestickData: () => void,
  collapse: ({}) => void,
  setShowSelectStock: () => void,
  tickerList: [],
  showSelectStock: boolean,
}

const ConnectedStockSelect = ({
  setStrategyStock,
  getStockData,
  getCandlestickData,
  collapse,
  setShowSelectStock,
  tickerList,
  showSelectStock,
}: Props) => {


    return (
        <>
            <DropDown
              onClickFunc={() => collapse({ 'id': 'stock', 'bool': showSelectStock, 'func': 'SET_SHOW_SELECT_STOCK', 'action': 'stockSearch' })}
              title={'Stock'}
              id={'stock'}
              margin={'41%'}
              marginL={''}

            />
            <SearchSelect
              id={'stockSearch'}
              display={'none'}
              width={'100%'}
              onChangeFunc={(opt: { label: string, value: number }) => { setStrategyStock(opt.label.split(' ')[0]); getStockData(); getCandlestickData() }}
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