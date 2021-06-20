import React from 'react';
import './multirange.css'

const MultiRangeSlider = () => {

    return (
        <>
          <input
            type="range"
            min=""
            max=""
            id='left'
            className="thumb thumb--left"
          />
          <input
            type="range"
            min=""
            max=""
            id='right'
            className="thumb thumb--right"
          />
          <div className="slider">
             <div className="slider__track" />
             <div className="slider__range" />
          </div>

        </>
      );
    };
    
export default MultiRangeSlider;
    