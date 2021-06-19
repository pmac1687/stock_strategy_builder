import React, {useState, useEffect} from "react";
import Select from 'react-select';



const SearchBar = (props) => (
  //console.log(props.styles)
  <li className='items-center'>
    <div class="shadow flex">
      <div style={{...props.style}}>
        <Select
          onChange={props.onChange}
          options={props.options}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  </li>

);

export default SearchBar;