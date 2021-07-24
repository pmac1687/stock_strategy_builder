import React from 'react';

type Props = {
  key: number,
  margin: string,
  id: string,
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void,
  indicator: string,
  name: string
}

const Checkbox = ({ key, margin, id, onChangeFunc, indicator,name }: Props) => (
    <div key={key} style={{marginLeft: `${margin}`}}>
      <label className="inline-flex items-center">
        <input name={name} id={id} type="checkbox" onChange={onChangeFunc} className="form-checkbox" />
        <span className="ml-2">{indicator}</span>
      </label>
    </div>
)

export default Checkbox;

