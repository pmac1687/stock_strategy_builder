import React from 'react';

type Props = {
    label: string,
    checked: boolean,
    onChangeFunc: () => void,
    id: string

}

const RadioButton = ({ label, checked,onChangeFunc, id}: Props) => (
    <label className="inline-flex items-center mt-3">
        <input checked={checked} type="radio" id={id} onChange={onChangeFunc} className="form-radio h-5 w-5 text-gray-600" /><span className="ml-2 text-gray-700">{ label }</span>
    </label>
)

export default RadioButton;