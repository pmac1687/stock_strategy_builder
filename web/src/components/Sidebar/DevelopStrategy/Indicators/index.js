import React from 'react';
import { connect } from "react-redux";
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