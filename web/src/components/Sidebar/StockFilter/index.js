import React from "react";
import { connect } from "react-redux";
import StockByLetterSlider from './StockByLetterSlider';
import PriceSlider from './PriceSlider';
import PeriodSlider from './PeriodSlider';
import TrendPeriod from './trendPeriod';
import CheckBoxBank from './CheckBoxBank';
import Button from "../../filterTable/elements/Button";

import { 
  setFilteredStockArr,
} from "../../../js/actions/index";


const mapStateToProps = state => {
  return { 
    stratStockData: state.stratStockData,
    graphCount: state.graphCount
   };
};

function ConnectedStockFilter(props) {
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const names = document.getElementsByName('filter')
    for (let i = 0; i < names.length; i++){
      console.log(names[i])
    }
    const filterLetters = names[8].checked
    const filterPrice = names[9].checked
    const letters =  filterLetters ? [names[0].innerText, names[1].innerText] : ['A', 'Z']
    const priceRange = filterPrice ? [names[2].innerText, names[3].innerText] : ['0', '1000']
    const period = [names[4].innerText, names[5].innerText]
    const tPeriod = names[6].value ? names[6].value : '0';
    const slug = `${letters[0]},${letters[1]},${priceRange[0]},${priceRange[1]},${period[0]},${period[1]},${tPeriod},`
    console.log('slug',slug)
    props.setFilteredStockArr(slug)
  }

  
  return (
    <form
      onSubmit={handleSubmit}
    >
      <StockByLetterSlider />
      <PriceSlider />
      <PeriodSlider />
      <TrendPeriod />
      <CheckBoxBank style={{marginLeft: ''}} />
      <Button
        name={'Filter'}
        className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
        margin={'3vw'}
      />

    </form>
  );
}

const StockFilter = connect(
  mapStateToProps,
  {
    setFilteredStockArr
  }
  )(ConnectedStockFilter);

export default StockFilter;