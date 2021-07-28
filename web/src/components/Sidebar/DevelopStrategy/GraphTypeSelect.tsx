/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from "react-redux";
import RadioButton from '../elements/RadioButton';
import Dropdown from '../elements/DropDown'

import { 
    collapse,
    setShowSelectStock,
    setMainGraphType

} from "../../../js/actions/index";
  
type Props = {
  showGraphTypeSelect: boolean,
  mainGraphType: string

}

const mapStateToProps = (state: Props) => {
  return { 
    showGraphTypeSelect: state.showGraphTypeSelect,
    mainGraphType: state.mainGraphType,
   };
};

const ConnectedGraphTypeSelect = ({ showGraphTypeSelect, mainGraphType}: Props) => {


    return (
        <>

            <Dropdown
              onClickFunc={() => collapse({ 'id': 'graph', 'bool': showGraphTypeSelect, 'func': 'SET_SHOW_GRAPH_TYPE_SELECT', 'action': 'graphDetails' })}
              title={'Graph Type'}
              id={'graph'}
              margin={'18%'}
              marginL={''}
          
            />

            <li id='graphDetails' style={{ display: 'none'}} className="items-center">
                <div className="bg-gray-50">
                    <div className="flex flex-col items-start justify-center ">
                        <div className="flex flex-col">
                          <RadioButton
                            label={'Candlestick'}
                            checked={mainGraphType === 'candle'}
                            onChangeFunc={() => setMainGraphType('candle')}
                            id={'candle'}
                          />
                          <RadioButton
                            id={'line'}
                            checked={mainGraphType === 'line'}
                            onChangeFunc={() => setMainGraphType('line')}
                            label={'Line Graph'}
                          />
                        </div>
                    </div>
                </div>
            </li>
        </>
      );
    };
    

const GraphTypeSelect = connect(
    mapStateToProps,
    { 
      collapse,
      setShowSelectStock,
      setMainGraphType 
     }
    )(ConnectedGraphTypeSelect);

export default GraphTypeSelect;