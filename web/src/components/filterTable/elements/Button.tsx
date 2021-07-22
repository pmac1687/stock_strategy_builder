import React from 'react';

type Props = {
  color: string,
  name: string,
  className: string,
  margin: string,
}

const Button = ({ color, name, className, margin }: Props) => (
  <button
    style={{ marginLeft: `${margin}`, marginRight: `${margin}`}}
      className={className ? className : `bg-${color}-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
      type="button"
    >
      { name }
    </button>
)

export default Button;