import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IndicatorMap from './indicatorMap'

import { 
    collapse,
  } from "../../../../js/actions/index";

const mapStateToProps = state => {
  return { 

   };
};

const ConnectedIndicators = (props) => {


    return (
        <>
            <li id='indicatorDetails' style={{ display: 'none'}}>
              <div class="block">
                <span class="text-gray-700"></span>
                <div class="mt-2">
                    <IndicatorMap />
                </div>
              </div>
            </li>
        </>
      );
    };
    

const Indicators = connect(
    mapStateToProps,
    { 
      collapse
     }
    )(ConnectedIndicators);

export default Indicators;