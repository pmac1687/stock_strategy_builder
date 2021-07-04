import React from 'react';
import { connect } from "react-redux";

import { 
    collapse,
    addGraph,
    removeGraph,
    incrementGraphCount,
    decrementGraphCount

  } from "../../../../js/actions/index";

const mapStateToProps = state => {
  return { 

   };
};

const ConnectedIndicatorMap = (props) => {
    const indicators = [
        {
            'subject': 'Awesome Oscillator',
            'indicator': 'ao'
        },
        {
            'subject': 'Bollinger Bands',
            'indicator': 'bollinger'
        },
        {
            'subject': 'Moving Average(Trend)',
            'indicator': 'ma'
        },
        {
            'subject': 'RSI',
            'indicator': 'rsi'
        },
        {
            'subject': 'MACD',
            'indicator': 'macd'
        }
    ];

    function addIndicators(e, id){
      if(e.target.checked){
        props.addGraph(id);
        props.incrementGraphCount()
  
      } else {
        props.removeGraph(id);
        props.decrementGraphCount();
      }
      console.log('checked',e.target.checked)
    }

    return (
        <>
            {indicators.map((item, index) => (
                <React.Fragment key={index}>
                  <div style={{marginLeft: '2vw'}}>
                    <label class="inline-flex items-center">
                      <input id='item' type="checkbox" onChange={e => addIndicators(e, item.indicator)} class="form-checkbox" />
                      <span class="ml-2">{item.subject}</span>
                    </label>
                  </div>
                </React.Fragment>
            ))}
        </>
      );
    };
    

const IndicatorMap = connect(
    mapStateToProps,
    { 
      collapse,
      addGraph,
      removeGraph,
      incrementGraphCount,
      decrementGraphCount
     }
    )(ConnectedIndicatorMap);

export default IndicatorMap;