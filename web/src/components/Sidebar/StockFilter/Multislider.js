import React, { useState, useEffect } from 'react';
import './multirange.css';
import { connect } from "react-redux";

import { 
  setFilterAbcArr,
  setFilterPriceArr,
  setFilterPeriodArr,
} from "../../../js/actions/index";

const mapStateToProps = state => {
  return { 
    filterAbcArr : state.filterAbcArr
   };
};


const ConnectedMultiRangeSlider = (props) => {
  const [minVal, setMinVal] = useState(props.min);
  const [maxVal, setMaxVal] = useState(props.max);
  //const minValRef = useRef(props.min);
  //const maxValRef = useRef(props.max);

  const dispatchMap = {
    "abcFilter": props.setFilterAbcArr,
    "priceFilter": props.setFilterPriceArr,
    "periodFilter": props.setFilterPeriodArr
  }
    return (
        <>
          <div style={{ marginBottom: '2vh'}}>{props.subject}</div>
          <input
            type="range"
            min={props.min}
            max={props.max}
            value={minVal}
            onChange={event => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
              dispatchMap[props.mapKey](minVal, maxVal)
            }}
            id={props.ids[0]}
            className="thumb thumb--left"
          />
          <input
            type="range"
            min={props.min}
            max={props.max}
            value={maxVal}
            onChange={event => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
              dispatchMap[props.mapKey]([minVal, maxVal])
           }}
            id={props.ids[1]}
            className="thumb thumb--right"
          />
          <div className="slider">
             <div className="slider__track" />
             <div className="slider__range" />
          </div>
          <div name='filter' className="slider__left-value">{props.abc ? props.abc[minVal] : props.dates ? props.dates[minVal] : minVal}</div>
          <div name='filter' style={{ marginRight: props.margin}} className="slider__right-value">{props.abc ? props.abc[maxVal-1] : props.dates ? props.dates[maxVal] : maxVal}</div>
          <div style={{ marginBottom: '7vh'}} />

        </>
      );
    };

const MultiRangeSlider = connect(
  mapStateToProps,
  { 
    setFilterAbcArr,
    setFilterPriceArr,
    setFilterPeriodArr
   }
  )(ConnectedMultiRangeSlider);
    
export default MultiRangeSlider;
    