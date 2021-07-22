import React from 'react';
import './multirange.css'
import Multislider from './Multislider'

const PriceSlider = () => {

    return (
        <>
            <Multislider
                margin={'.75vw'}
                subject={'Choose Price Range'}
                mapKey={"priceFilter"}
                ids={['leftPrice', 'rightPrice']}
                min={'0'}
                max={'100'}
            />
        </>
      );
    };
    
export default PriceSlider;