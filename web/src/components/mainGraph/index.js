import React, { useEffect, useState} from "react";
import CardCandleChart from "./CardCandleChart";
import CardLineChart from "./CardLineChart"
import { connect } from "react-redux";
import { addGraph } from "../../js/actions/index";


const mapStateToProps = state => {
    return { 
        mainGraphType: state.mainGraphType,
        strategyStock: state.strategyStock,
        graphs: state.graphs
     };
  };

function ConnectedMainGraph(props){
    const [graphs, setGraphs] = useState([]);
    const [keyCount, setKeyCount] = useState(0);
    const [stateCount, setStateCount] = useState(0)
    const line = <CardLineChart key={keyCount} />;
    const candle = <CardCandleChart key={keyCount} />
    useEffect(() => {
        //to avoid initial state passed down from radio buttons on first load
     if(stateCount !== 0){
            chooseMainGraph()
        } else setStateCount(prev => prev + 1);
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.mainGraphType]);

    useEffect(() => {
        console.log(props.graphs)
    }, [props.graphs])

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
    }
    return (
        <>
        {props.graphs.map((item, index) => (
            <>
            {item}
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