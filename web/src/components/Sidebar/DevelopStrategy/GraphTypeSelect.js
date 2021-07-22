/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from "react-redux";
import { faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioButton from '../elements/RadioButton';
import Dropdown from '../elements/DropDown'

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

            <Dropdown
              onClickFunc={() => props.collapse({ 'id': 'graph', 'bool': props.showGraphTypeSelect, 'func': 'SET_SHOW_GRAPH_TYPE_SELECT', 'action': 'graphDetails' })}
              title={'Graph Type'}
              id={'graph'}
              margin={'18%'}
            />

            <li id='graphDetails' style={{ display: 'none'}} className="items-center">
                <div className="bg-gray-50">
                    <div className="flex flex-col items-start justify-center ">
                        <div className="flex flex-col">
                          <RadioButton
                            label={'Candlestick'}
                            checked={props.mainGraphType === 'candle'}
                            onChangeFunc={() => props.setMainGraphType('candle')}
                            id={'candle'}
                          />
                          <RadioButton
                            id={'line'}
                            checked={props.mainGraphType === 'line'}
                            onChangeFunc={() => props.setMainGraphType('line')}
                            label={'Line Graph'}
                          />
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