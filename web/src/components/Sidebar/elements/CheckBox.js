import React from 'react';

const Checkbox = ({ key, margin, id, onChangeFunc, indicator,name }) => (
    <div key={key} style={{marginLeft: `${margin}`}}>
      <label class="inline-flex items-center">
        <input name={name} id={id} type="checkbox" onChange={onChangeFunc} class="form-checkbox" />
        <span class="ml-2">{indicator}</span>
      </label>
    </div>
)

export default Checkbox;



// <React.Fragment key={index}>
// <div style={{marginLeft: '2vw'}}>
// <label class="inline-flex items-center">
//   <input id='item' type="checkbox" onChange={e => addIndicators(e, item.indicator)} class="form-checkbox" />
//   <span class="ml-2">{item.subject}</span>
// </label>
// </div>
// </React.Fragment>