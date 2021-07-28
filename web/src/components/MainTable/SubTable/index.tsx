import React from 'react';
import TableColumnTitles from '../TableColumnTitles';
import SubRows from './SubRows';



const SubTable = () => (
    <>
        <table className="items-center w-full bg-transparent border-collapse">
            <tbody>
                <SubRows />
            </tbody>
        </table>
    </>

);

export default SubTable;