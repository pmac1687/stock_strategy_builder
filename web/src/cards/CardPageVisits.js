import React, {useEffect, useReducer, useState} from "react";
import { connect } from "react-redux";
import { addPageHistory } from "../js/actions/index";



const mapStateToProps = state => {
  return { 
    historyData: state.masterHistoryData,
    historyDataArray: state.pageHistoryDataArr,
   };
};

const initialState = {
  historyDataArray: [],
  dataArray: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'addHistoryData': return {...state, historyData: action.arr};
    case 'addNewTick': return {...state, dataArray: action.arr};
    case 'removeDoubles': return {...state, dataArray: [...new Set(state.dataArray)]};
    case 'clear': return {...state, dataArray: action.arr};
    default: throw new Error('Unexpected action');
  }
};

function ConnectedCardPageVisits(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState([]);
  useEffect(() => {
    //const p = state.historyDataArray;
    //dispatch({ type: 'addHistoryData', arr: p.push(props.historyData)});
    props.addPageHistory(props.historyData)
    formatData();
    setData(prev => state.dataArray);
  }, [props.historyData]);
  useEffect(() => {
    console.log('arrrrrrrrrrrrrray', state.dataArray);
  }, [state])
  function formatData(){
    if(props.historyDataArray.length > 0){
      const arr = [];
      state.dataArray = [];
      const dat = props.historyDataArray;
      //unusual, i cant pop the empty array that apperates out of nowhere??
      if(dat[0].length === 0){
        dat.pop(0);
      };
      for(let i=0;i<dat.length;i++){
        getData(dat[i])
      }
    };
}
  function getHighLow(arr,time){
    console.log('hello', arr.length)
    if(arr.length > time-1){
      const dats = arr.slice(arr.length-time, arr.length-1);
      let high = 0;
      let low = 100;
      for(let i=0;i<dats.length;i++){
        if(parseFloat(dats[i]) > high){
          high = Math.round(parseFloat(dats[i])*1000) / 1000
        }
        if(dats[i] < low){
          low = (Math.round((parseFloat(dats[i]) *1000)))/1000
        }
      }
      return `${high}/${low}`
    } else return '0'
  }
  function getData(arr){
    const res = state.dataArray;
    const price =[];
    const ao = [];
    const date = [];
    const tick = [];
    const percent = [];
    for(let b=0;b<arr.length;b++){
      price.push(arr[b]['price']);
      ao.push(arr[b]['ao']);
      date.push(arr[b]['date']);
      tick.push(arr[b]['name']);
      percent.push(arr[b]['percent']);
    };
    const pyear = getHighLow(price, 365);
    const psixM = getHighLow(price, 180);
    const pthreeM = getHighLow(price, 90)
    const pmonth = getHighLow(price, 30)
    const aoyear = getHighLow(ao,365);
    const aosixM = getHighLow(ao,180);
    const aothreeM = getHighLow(ao,90);
    const aomonth = getHighLow(ao,30);
    const c = arr.length - 1
    console.log(pmonth,'yearrrsr')
    const result = {'name': tick[c], 'price': price[c], 'ao': ao[c], 'percent': percent[c], 'date': date[c], 'pmonth': pmonth, 'pyear': pyear, 'psixM': psixM, 'pthreeM': pthreeM, 'aomonth': aomonth, 'aoyear': aoyear, 'aosixM': aosixM, 'aothreeM': aothreeM};
    //res.push(result);
    console.log('resssss', result);
    const arg = [];
    for(let d=0;d<res.length;d++){
      arg.push(res[d]['name'])
    };
    console.log(result['name']);
    console.log(arg)
    if(!(result['name'] in arg)){
      res.push((result))
    };
    dispatch({ type: 'addNewTick', arr: res});
    setData(prev => state.dataArray)
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">
                Page visits
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Ticker
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Percent AO/Price
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  AO
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Price
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  6 Month AO
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  6 Month Price
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  1 Months AO
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  1 Month Price
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  3 Month AO
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  3 Month Price
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  1 Year AO
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  1 Year Price
                </th>
              </tr>
            </thead>
            <tbody>
              {state.dataArray.map((item, index) => (
                <tr key={item['name']}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    {item['name']}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['percent']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['ao']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['price']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['aosixM']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['psixM']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['aomonth']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['pmonth']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['aothreeM']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['pthreeM']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['aoyear']}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {item['pyear']}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const CardPageVisits = connect(
  mapStateToProps,
  { addPageHistory }
  )(ConnectedCardPageVisits);

export default CardPageVisits;