import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from "react-redux";
import { faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { 
    collapse,
    setShowSelectStock,
    setMainGraphType

  } from "../../../js/actions/index";

const mapStateToProps = state => {
  return { 
    showGraphTypeSelect: state.showGraphTypeSelect,
    mainGraphType: state.mainGraphType,
   };
};

const ConnectedGraphTypeSelect = (props) => {


    return (
        <>
            <li onClick={() => props.collapse({'id': 'graph','bool': props.showGraphTypeSelect, 'func' : 'SET_SHOW_GRAPH_TYPE_SELECT', 'action': 'graphDetails'})} className="items-center">
              <a className={"text-xs uppercase py-3 font-bold block " }>
                <i className={"fas fa-tv mr-2 text-sm "}></i>
                Graph Type <FontAwesomeIcon style={{ marginLeft:'18%'}} id='graph' icon={faChevronUp} size='lg'/>
              </a>
            </li>

            <li id='graphDetails' style={{ display: 'none'}} className="items-center">
                <div class="bg-gray-50">
                    <div class="flex flex-col items-start justify-center ">
                        <div class="flex flex-col">
                            <label class="inline-flex items-center mt-3">
                                <input checked={props.mainGraphType === 'candle'} type="radio" id='candle' onChange={() => props.setMainGraphType('candle')} class="form-radio h-5 w-5 text-gray-600" /><span class="ml-2 text-gray-700">Candlestick</span>
                            </label>
                            <label class="inline-flex items-center mt-3">
                                <input type="radio" id='line' checked={props.mainGraphType === 'line'} onChange={() => props.setMainGraphType('line')} class="form-radio h-5 w-5 text-red-600" /><span class="ml-2 text-gray-700">Line Graph</span>
                            </label>
                        </div>
                    </div>
                </div>
            </li>
        </>
      );
    };
    

const GraphTypeSelect = connect(
    mapStateToProps,
    { 
      collapse,
      setShowSelectStock,
      setMainGraphType 
     }
    )(ConnectedGraphTypeSelect);

export default GraphTypeSelect;