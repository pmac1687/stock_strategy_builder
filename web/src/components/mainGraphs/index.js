import React, { useEffect} from "react";
import CardCandleChart from "./CandleChart";
import CardLineChart from "./LineChart";
import BollChart from '../secondaryGraphs/BollChart';
import MAChart from '../secondaryGraphs/MAChart';
import RSIChart from '../secondaryGraphs/RSIChart';
import MACDchart from '../secondaryGraphs/MACDChart';
import { connect } from "react-redux";
import { addGraph } from "../../js/actions/index";
import AOChart from "../secondaryGraphs/AOChart";


const mapStateToProps = state => {
    return { 
        mainGraphType: state.mainGraphType,
        strategyStock: state.strategyStock,
        graphs: state.graphs
     };
  };

function ConnectedMainGraph(props){

    const graphArr = {
        'ao': <AOChart id='ao' key='1' />,
        'bollinger': <BollChart id='bollinger' key='2' />,
        'macd': <MACDchart id='macd' key='3' />,
        'rsi': <RSIChart id='rsi' key='4' />,
        'ma': <MAChart id='ma' key='5' />,
        'candle': <CardCandleChart id='candle' key='6'/>,
        'line': <CardLineChart id='line' key='7' />
        
    }

    useEffect(() => {
        console.log(props.graphs)
    }, [props.graphs])
/*
    function chooseMainGraph(){
        if(props.mainGraphType === 'line'){
            if(graphs.length !== 0){
                console.log('idddddddd',graphs[0].props.id)
                const filtered = graphs.filter(function(value, index, arr){ 
                    return value.props.id !== 'candle';
                });
                props.addGraph(<CardLineChart id='line' key={keyCount} />);
                setKeyCount(prev => prev + 1)
            } else {
                addGraph(<CardLineChart id='line' key={keyCount} />);
                setKeyCount(prev => prev + 1)
            }
        };
        if(props.mainGraphType === 'candle'){
            if(graphs.length !== 0){
                const filtered = graphs.filter(function(value, index, arr){ 
                    return value.props.id !== 'line';
                });
                props.addGraph(<CardCandleChart id='candle' key={keyCount} />);
                setKeyCount(prev => prev + 1)
            } else {
                props.addGraph(<CardCandleChart id='candle' key={keyCount} />);
                setKeyCount(prev => prev + 1)
            }
        }
    }*/
    return (
        <>
        {props.graphs.map((item, index) => (
            <>
            {graphArr[item]}
            </>
        ))}
        </>

    )
}

const MainGraph = connect(
    mapStateToProps,
    { addGraph }
    )(ConnectedMainGraph);
  
  export default MainGraph;