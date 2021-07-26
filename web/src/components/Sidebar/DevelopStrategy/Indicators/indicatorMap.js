import React from 'react';
import { connect } from "react-redux";
import CheckBox from '../../elements/CheckBox'

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
    }

    return (
        <>
            {indicators.map((item, index) => (
              <CheckBox
                key={index}
                margin={'0vw'}
                id={'item'}
                onChangeFunc={e => addIndicators(e, item.indicator)}
                indicator={item.subject}
              />
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