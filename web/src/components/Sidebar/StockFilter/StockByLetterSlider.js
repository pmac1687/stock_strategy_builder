import React from 'react';
import './multirange.css'
import Multislider from './Multislider'

const StockByLetterSlider = () => {
    const abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    return (
        <>
            <Multislider subject={'Choose Letter Range'} mapKey={"abcFilter"} ids={['leftAbc', 'rightAbc']} abc={abc} min={'0'} max={'26'} />
        </>
      );
    };
    
    export default StockByLetterSlider;