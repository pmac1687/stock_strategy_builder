import React from 'react';
import Button from './elements/Button'

const TableButtons = () => (
    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
        <Button name={'Reverse'} color={'indigo'} />
        <Button name={'Percent'} color={'red'} />
    </div>
)

export default TableButtons;