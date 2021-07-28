import React from 'react';
import { connect } from "react-redux";
import Indicators from './Indicators'
import DropDown from '../elements/DropDown'

import { 
    collapse
} from "../../../js/actions/index";
  
type Props = {
  showIndicatorSelect: boolean
}

const mapStateToProps = (state: Props) => {
  return { 
    showIndicatorSelect: state.showIndicatorSelect,

   };
};

const ConnectedIndicatorSelect = ({ showIndicatorSelect }: Props) => {


    return (
        <>
            <DropDown
              onClickFunc={() => collapse({ 'id': 'indicators', 'bool': showIndicatorSelect, 'func': 'SET_SHOW_INDICATOR_SELECT', action: 'indicatorDetails' })}
              title={'Indicators'}
              id={'indicators'}
          margin={'20%'}
          marginL={''}
            />
            <Indicators />
        </>
      );
    };
    

const IndicatorSelect = connect(
    mapStateToProps,
    { 
      collapse,

     }
    )(ConnectedIndicatorSelect);

export default IndicatorSelect;