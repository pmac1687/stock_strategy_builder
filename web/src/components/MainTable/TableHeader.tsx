import React from 'react';
import Button from '../filterTable/elements/Button';
import TableTitle from './elements/TableTitle';

const TableHeader = () => (
    <div  className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs  border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
      <div className="flex flex-wrap items-center">
        <TableTitle />
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <Button
                name={'See All'}
                className={''}
                color={'indigo'}
                margin={''}
                onClick={undefined}
            />
        </div>
      </div>
    </div>
);

export default TableHeader;