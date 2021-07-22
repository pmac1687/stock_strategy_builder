import React from 'react';
import { connect } from "react-redux";
import Indicators from './Indicators'
import DropDown from '../elements/DropDown'

import { 
    collapse
  } from "../../../js/actions/index";

const mapStateToProps = state => {
  return { 
    showIndicatorSelect: state.showIndicatorSelect,

   };
};

const ConnectedIndicatorSelect = (props) => {


    return (
        <>
            <DropDown
              onClickFunc={() => props.collapse({ 'id': 'indicators', 'bool': props.showIndicatorSelect, 'func': 'SET_SHOW_INDICATOR_SELECT', action: 'indicatorDetails' })}
              title={'Indicators'}
              id={'indicators'}
              margin={'20%'}
            />
            <Indicators />
        </>
      );
    };
    

const IndicatorSelect = connect(
    mapStateToProps,
    { 
      collapse,

     }
    )(ConnectedIndicatorSelect);

export default IndicatorSelect;