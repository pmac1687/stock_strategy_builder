import React from 'react';
import Select from 'react-select';
import { connect } from "react-redux";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <li onClick={() => props.collapse({'id' : 'stock', 'bool' : props.showSelectStock, 'func' : 'SET_SHOW_SELECT_STOCK', 'action' : 'stockSearch'})} className="items-center">
              <a style={{ display:'flex'}} className={"text-xs  uppercase py-3 font-bold block " }>
                <i className={"fas fa-tv mr-2 text-sm "}></i>
                Stock <div  style={{ marginLeft: '41%'}}><FontAwesomeIcon id='stock' icon={faChevronUp} size='lg'/></div>
              </a>
            </li>

            <li id='stockSearch' style={{ display: 'none'}} className="items-center">
                <div class="shadow flex">
                  <div style={{ width: '100%'}}>
                    <Select
                      onChange={opt => {props.setStrategyStock(opt.label.split(' ')[0]); props.getStockData();props.getCandlestickData()}}
                      options={props.tickerList}
                    />
                  </div>
                </div>
            </li>
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