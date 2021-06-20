import React, { useEffect } from 'react';
import './multirange.css'
import Multislider from './Multislider'

const StockByLetterSlider = () => {
    useEffect(() => {
        console.log(1)
        const left = document.getElementById('left')
        const right = document.getElementById('right')
        left.min = '0';
        left.max = '26';
        right.min = '0';
        right.max = '26';
        right.value='26';
        left.value = '10';
        console.log(left.value,right.value)
    }, [])

    return (
        <>
            <Multislider />
        </>
      );
    };
    
    export default StockByLetterSlider;