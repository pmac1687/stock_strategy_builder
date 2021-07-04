import React from 'react';
import { connect } from "react-redux";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Indicators from './Indicators'

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
            <li onClick={() => props.collapse({ 'id': 'indicators', 'bool': props.showIndicatorSelect , 'func': 'SET_SHOW_INDICATOR_SELECT', action: 'indicatorDetails'})} className="items-center">
              <a className={"text-xs uppercase py-3 font-bold block "}>
                <i className={"fas fa-table mr-2 text-sm "}></i>
                Indicators <FontAwesomeIcon style={{ marginLeft:'20%'}} id='indicators' icon={faChevronUp} size='lg'/>
              </a>
            </li>

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