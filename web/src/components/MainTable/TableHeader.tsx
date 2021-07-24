import React from 'react';
import Button from '../filterTable/elements/Button';
import TableTitle from './elements/TableTitle';

const TableHeader = () => (
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <TableTitle />
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <Button
                name={'See All'}
                className={''}
                color={'indigo'}
                margin={''}
            />
        </div>
      </div>
    </div>
);

export default TableHeader;