import React, {useEffect, useState } from "react";
import { connect } from "react-redux";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  "./styles.css";



const mapStateToProps = state => {
  return { 
    historyData: state.masterHistoryData,
    historyDataArray: state.pageHistoryDataArr,
    seriesWindows: state.seriesWindows,
    windowsSeriesData: [],
    windowsStocks: state.windowsStocks
   };
};



function ConnectedCardPageVisits(props) {
  const [ tableItems, setTableItems] = useState([])
  useEffect(() => {
    const arr = [];
    for ( const index in Object.keys(props.windowsSeriesData) ){
      arr.push(props.windowsSeriesData[index])
    };
    setTableItems(prev => arr);
  },[props.windowsSeriesData])

  function collapse(item){
    const svg = document.getElementById(`${item}1`)
    const table = document.getElementById(item)
    if(svg.style.transform === '' || svg.style.transform === 'rotate(360deg)'){
      svg.style.transform = 'rotate(180deg)'
      table.style.display = 'block'
    }
    else if(svg.style.transform === 'rotate(180deg)'){
      svg.style.transform = 'rotate(360deg)'
      table.style.display = 'none'
    }
  }


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
                  <div>ma trend</div>
                  <div>close trend</div>
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <div>High/Low</div>
                  <div>Spread</div>
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <div>MACD</div>
                  <div>DIVERGENCE</div>
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <div>MACD</div>
                  <div>signal /</div>
                  <div>value</div>
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <div>Boll upper</div>
                  <div>Diverge /</div>
                  <div>div percent</div>
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <div>MA</div>
                  <div>high / low</div>
                  <div>diverge</div>
                  <div>div percent</div>
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <div>ao</div>
                  <div>Value /</div>
                  <div>Val percent</div>
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <div>rsi</div>
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <div>fractals</div>
                  <div>up / down</div>
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <div>volume</div>
                  <div>high / low</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/*{props.windowsSeriesData && props.windowsSeriesData.map((item, index) => (*/}
              {tableItems && tableItems.map((item) => (
              <>
                <tr key={item['name']}>
                  <th onClick={() => collapse(item[0]['date'])} style={{display: 'flex', alignItems: 'center', justifyContent:'center', marginTop:'8vh'}} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    {''} - {item[0]['date'].split(',')[0]}/{item[0]['date'].split(',')[1]}<div style={{ marginLeft: '15%'}}></div><FontAwesomeIcon id={`${item[0]['date']}1`} icon={faChevronUp} size='lg'/>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'>
                      <div id={item[0]['ma_trend'] > 0 ? 'green': 'red'}>{item[0]['ma_trend']} /</div>
                    </div>
                    <div id='flex'>
                      <div id={item[0]['ma_close'] > 0 ? 'green': 'red'}>{item[0]['close_trend']}</div>
                    </div>
                    </td>
                    <td  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'><div id='green' >{`${item[0]['high']}`}</div>/<div id='red'>{item[0]['low']}</div></div>
                    <div>${item[0]['h_l_spread']}/ {item[0]['h_l_spread_perc']}%</div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'><div id='green' >{`${item[0]['macd_h_high']}`}</div>/<div id='red'>{item[0]['macd_h_low']}</div></div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'>
                      <div id='green'>{`${item[0]['macd_s_high']}`} /</div>
                      <div id='red'>{item[0]['macd_s_low']}</div>
                    </div>
                    <div id='flex'>
                      <div id='green'>{`${item[0]['macd_v_high']}`} /</div>
                      <div id='red'>{item[0]['macd_v_low']}</div>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'>
                      <div id='green'>{item[0]['boll_div_h']} /</div>
                      <div id='red'>{item[0]['boll_div_l']}</div>
                    </div>
                    <div id='flex'>
                      <div id='green'>{item[0]['boll_div_p_h']}% /</div>
                      <div id='red'>{item[0]['boll_div_p_l']}%</div>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'>
                      <div id='green'>{item[0]['ma_high']} /</div>
                      <div id='red'>{item[0]['ma_low']}</div>
                    </div>
                    <div id='flex'>
                      <div id='green'>{item[0]['ma_div_p_h']} /</div>
                      <div id='red'>{item[0]['ma_div_p_l']}</div>
                    </div>
                    <div id='flex'>
                      <div id='green'>{item[0]['ma_div_h']} /</div>
                      <div id='red'>{item[0]['ma_div_l']}</div>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'>
                      <div id='green'>{item[0]['ao_high']} /</div>
                      <div id='red'>{item[0]['ao_low']}</div>
                    </div>
                    <div id='flex'>
                      <div id='green'>{item[0]['ao_p_high']}% /</div>
                      <div id='red'>{item[0]['ao_p_low']}%</div>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'>
                      <div id='green'>{item[0]['rsi_h']}% /</div>
                      <div id='red'>{item[0]['rsi_l']}%</div>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'>
                      <div id='green'>{item[0]['f_up']} /</div>
                      <div id='red'>{item[0]['f_down']}</div>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <div id='flex'>
                      <div id='green'>{item[0]['vol_h']} /</div>
                      <div id='red'>{item[0]['vol_l']}</div>
                    </div>
                  </td>
                </tr>
                <table id={item[0]['date']} style={{ display: 'none'}}  className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Ticker
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        <div>bollinger</div>
                        <div>upper / lower</div>
                        <div>diverge</div>
                        <div>percent</div>
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        <div>macd</div>
                        <div>value / signal</div>
                        <div>macd div / div perc </div>
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        <div>ma</div>
                        <div>value</div>
                        <div>ma div / div perc </div>
                        <div>trending</div>
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        <div>ao</div>
                        <div>value / perc</div>
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        <div>rsi</div>
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        <div>open / close</div>
                        <div>div / perc</div>
                        <div>trend</div>
                        <div>today / total</div>
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        <div>high / low</div>
                        <div>div / perc</div>
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        <div>fractal high /</div>
                        <div>fractal low</div>
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        <div>volume</div>
                        <div>div / perc</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      {item.map((dats) => (
                        <tr>
                          <th style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            {''}-{dats['date']}<div style={{ marginLeft: '15%' }}></div><FontAwesomeIcon id='stock' icon={faChevronUp} size='lg' />
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <div id='flex'>
                              <div id='green'>{`${dats['boll_ub']}`} /</div>
                              <div id='red'>{dats['boll_lb']}</div>
                            </div>
                            <div id='flex'>
                              <div id='green'>{`${dats['boll_ub_div_arr']}`} /</div>
                              <div id='red'>{dats['boll_lb_div_arr']}</div>
                            </div>
                            <div id='flex'>
                              <div id='green'>{`${dats['boll_ub_div_perc_arr']}`} /</div>
                              <div id='red'>{dats['boll_lb_div_perc_arr']}</div>
                            </div>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <div id='flex'>
                            <div >{`${dats['macd_value']}`} /</div>
                            <div >{dats['macd_signal']}</div>
                          </div>
                          <div id='flex'>
                            <div id={dats['macd_h'] > 0 ? 'green' : 'red'}>{`${dats['macd_h']}`} /</div>
                            <div id={dats['macd_h_perc'] > 0 ? 'green' : 'red'}>{dats['macd_h_perc']} %</div>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <div id='flex'>
                            <div id={dats['trend_ma'] === 'up' ? 'green' : 'red'} >{`${dats['ma']}`} </div>
                          </div>
                          <div id='flex'>
                            <div id={dats['ma_div'] > 0 ? 'green' : 'red'}>{`${dats['ma_div']}`} /</div>
                            <div id={dats['ma_div_perc'] > 0 ? 'green' : 'red'}>{dats['ma_div_perc']} %</div>
                          </div>
                          <div id='flex'>
                            <div id={dats['trend_ma'] === 'up' ? 'green' : 'red'}>{`${dats['trend_ma']}`} </div>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <div id='flex'>
                            <div id={dats['ao'] > 0 ? 'green' : 'red'} >{`${dats['ao']}`} /</div>
                            <div id={dats['ao'] > 0 ? 'green' : 'red'} >{`${dats['ao_percent']}`}% </div>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <div id='flex'>
                            <div id={dats['rsi'] > 60 ? 'red' : dats['rsi'] < 40 ? 'green' : ''} >{`${dats['rsi']}`} </div>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <div id='flex'>
                            <div id={dats['open'] > dats['close'] ? 'green' : 'red'} >{`${dats['open']}`} /</div>
                            <div id={dats['close'] > dats['open'] ? 'green' : 'red'}>{dats['close']}</div>
                          </div>
                          <div id='flex'>
                            <div  id={dats['close'] > dats['open'] ? 'green' : 'red'}>{`${dats['open_close_div']}`} /</div>
                            <div  id={dats['close'] > dats['open'] ? 'green' : 'red'}>{dats['open_close_div_perc']} %</div>
                          </div>
                          <div id='flex'>
                            <div  id={dats['close'] > dats['open'] ? 'green' : 'red'}>{`${dats['trend_close']}`} /</div>
                            <div  id={dats['close_trend_count'] >= 0  ? 'green' : 'red'}>{`${dats['close_trend_count']}`}</div>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <div id='flex'>
                            <div id='green' >{`${dats['high']}`} /</div>
                            <div id='red' >{`${dats['low']}`} </div>
                          </div>
                          <div id='flex'>
                            <div  >{`${dats['open_close_div']}`} /</div>
                            <div  >{`${dats['open_close_div_perc']}`}% </div>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <div id='flex'>
                            <div id={dats['fractal_highs'] === 'True' ? 'green' : 'red'} >{`${dats['fractal_highs']}`} /</div>
                            <div id={dats['fractal_lows'] === 'True' ? 'green' : 'red'} >{`${dats['fractal_lows']}`} </div>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <div id='flex'>
                            <div  >{`${dats['volume']}`} /</div>
                          </div>
                          <div id='flex'>
                            <div  >{`${dats['vol_div']}`} /</div>
                            <div>{dats['vol_div_perc']} %</div>
                          </div>
                        </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
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
  )(ConnectedCardPageVisits);

export default CardPageVisits;