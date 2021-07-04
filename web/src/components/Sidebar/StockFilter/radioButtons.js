import React from 'react';

const RadioButtons = () => {
    const filterOptions = ['Open/Close Trend', 'Filter Letters', "Filter Price", 'MA Trend'];
    return(
    <>
        {filterOptions.map((item, index) => (
            <React.Fragment key={index}>
                <div>
                  <label class="inline-flex items-center">
                    <input name='filter' type="checkbox"  class="form-checkbox" />
                    <span class="ml-2">{item}</span>
                  </label>
                </div>
            </React.Fragment>
        ))}
    </>
    )
}

export default RadioButtons;