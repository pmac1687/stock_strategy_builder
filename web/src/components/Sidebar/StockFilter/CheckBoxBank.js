import React from 'react';
import Checkbox from '../elements/CheckBox'

const CheckBoxBank = () => {
    const filterOptions = ['Open/Close Trend', 'Filter Letters', "Filter Price", 'MA Trend'];
    return(
    <>
        {filterOptions.map((item, index) => (
            <Checkbox
              key={index}
              margin={'1vw'}
              id={''}
              name={'filter'}
              onChangeFunc={null}
              indicator={item}
            />
        ))}
    </>
    )
}

export default CheckBoxBank;