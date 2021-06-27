import React, { useEffect, useRef } from 'react';
import './multirange.css'
import Multislider from './Multislider'

const PriceSlider = () => {

    return (
        <>
            <Multislider subject={'Choose Price Range'} mapKey={"priceFilter"} ids={['leftPrice', 'rightPrice']}  min={'0'} max={'1000'} />
        </>
      );
    };
    
export default PriceSlider;