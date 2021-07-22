import React from 'react';
import Select from 'react-select';
import { connect } from "react-redux";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropDown from '../elements/DropDown';
import SearchSelect from '../elements/SearchSelect';

import { 
    setStrategyStock, 
    getStockData, 
    getCandlestickData,
    collapse,
    setShowSelectStock, 
  } from "../../../js/actions/index";

const mapStateToProps = state => {
  return { 
    tickerList: state.tickerList,
    showSelectStock: state.showSelectStock,
   };
};

const ConnectedStockSelect = (props) => {


    return (
        <>
            <DropDown
              onClickFunc={() => props.collapse({ 'id': 'stock', 'bool': props.showSelectStock, 'func': 'SET_SHOW_SELECT_STOCK', 'action': 'stockSearch' })}
              title={'Stock'}
              id={'stock'}
              margin={'41%'}

            />
            <SearchSelect
              id={'stockSearch'}
              display={'none'}
              width={'100%'}
              onChangeFunc={opt => { props.setStrategyStock(opt.label.split(' ')[0]); props.getStockData(); props.getCandlestickData() }}
              options={props.tickerList}
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