import React from 'react';
import TableRows from './TableRows';
import TableHead from './TableHead';
import TableTitle from './TableTitle';
import TableButtons from './TableButtons';

function FilterTable() {
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <TableTitle />
              <TableButtons />
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <TableHead />
              <TableRows />
            </table>
          </div>
        </div>
      </>
    )
}

export default FilterTable;