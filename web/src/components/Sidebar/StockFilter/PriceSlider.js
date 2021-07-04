import React from 'react';
import './multirange.css'
import Multislider from './Multislider'

const PriceSlider = () => {

    return (
        <>
            <Multislider margin={'1vw'} subject={'Choose Price Range'} mapKey={"priceFilter"} ids={['leftPrice', 'rightPrice']}  min={'0'} max={'1000'} />
        </>
      );
    };
    
export default PriceSlider;