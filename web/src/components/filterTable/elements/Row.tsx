import React from 'react';

type Props = {
    key: number,
    volume: number,
    median: number,
    company: string,
    ticker: string,
  }

const Row = ({ key, volume, median, company, ticker }: Props) => {
    return (
        <>
            <tr key={key}>
                <td style={{ width: '33em'}} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    <div>{ticker}</div>
                    <div>{company}</div>
                </td>
                <td style={{ width: '33em'}} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-5 ">
                    {median}
                </td>
                <td style={{ width: '33em'}} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4.5 ">
                    {volume}
                </td>
            </tr>
        </>
    )
}

export default Row;