import React from 'react';
import Select from 'react-select';
/*
type Props = {
  id: string,
  display: string,
  width: string,
  options: [],
}
*/

const SearchSelect = ({ id, display, width, onChangeFunc, options }) => (
    <li id={id} style={{ display: `${display}`}} className="items-center">
        <div className="shadow flex">
          <div style={{ width: `${width}`}}>
            <Select
              onChange={onChangeFunc}
              options={options}
            />
          </div>
        </div>
    </li>
)

export default SearchSelect;