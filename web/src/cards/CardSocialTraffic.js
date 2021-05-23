import React, { useState, useEffect } from "react";
import '../App.css';
import { connect } from "react-redux";
import { addStock, getData, addSocialData } from "../js/actions/index";

// components

const mapStateToProps = state => {
  return { 
    remoteData: state.remoteAOData,
    data: state.socialData,
   };
};

function ConnectedCardSocialTraffic(props) {
  const [bgColorButton, setBgColorButton] = useState('bg-red');

  useEffect(() => {
    if(props.remoteData !== undefined){
      console.log('effectsocial',props.remoteData)
      formatData(props.remoteData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.remoteData]);
  useEffect(() => {
    console.log('social data',props.data)
  }, [props.data])
  function formatData(dats){
    const arg = [];
    for (let x=0;x<dats.length;x++){
      const ao = parseFloat(dats[x][0].split('/')[0]);
      const tick = dats[x][1].split(':')[1].split('/')[0];
      const price = dats[x][4].split(':')[1];
      const perc = Math.round(ao/price * 10)

      const ar = [tick, ao, price, perc];
      arg.push(ar);
    };
    props.addSocialData(arg)
  };

  function reverseArr(){
    const revArr = props.data.reverse();
    console.log('revarr', revArr)
    const arr = [];
    for(let x=0;x<revArr.length;x++){
      arr.push(revArr[x])
    };
    props.addSocialData(arr)

  };

  function changePercent(){
    const revArr = props.data;
    if(bgColorButton === 'bg-red'){
      setBgColorButton('bg-green');
      const newArr = revArr.sort(function(a,b){return a[3]-b[3]});
      const arr = [];
      for(let i=0;i<newArr.length;i++){
        arr.push(newArr[i])
      };
      props.addSocialData(arr)
    } else {
      setBgColorButton('bg-red');
      formatData(props.remoteData);
    }
  };




  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">
                Ranked By AO
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                onClick={reverseArr}
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Reverse
              </button>
              <button
                onClick={changePercent}
                className={`${bgColorButton}-500 text-white active:${bgColorButton}-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
              >
                Percent
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Ticker
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  AO
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left min-w-140-px">
                  AO vs Price
                </th>
              </tr>
            </thead>
           
          </table>
        </div>
      </div>
    </>
  );
}

const CardSocialTraffic = connect(
  mapStateToProps,
  { getData, addStock, addSocialData }
)(ConnectedCardSocialTraffic);

export default CardSocialTraffic;