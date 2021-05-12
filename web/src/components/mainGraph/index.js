import React, { useEffect, useState, Component } from "react";
import CardCandleChart from "../../cards/CardCandleChart";
import CardLineChart from "../../cards/CardLineChart"
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { 
        mainGraphType: state.mainGraphType
     };
  };

function ConnectedMainGraph(props){
    const [graphs, setGraphs] = useState([]);
    const [keyCount, setKeyCount] = useState(0);
    const [stateCount, setStateCount] = useState(0)
    const line = <CardLineChart key={keyCount} />;
    const candle = <CardCandleChart key={keyCount} />
    //setGraphs(prev => [...prev, line])
    useEffect(() => {
        //to avoid initial state passed down from radio buttons on first load
     if(stateCount !== 0){
            chooseMainGraph()
        } else setStateCount(prev => prev + 1);

    }, [props.mainGraphType]);

    function chooseMainGraph(){
        if(props.mainGraphType === 'line'){
            if(graphs.length !== 0){
                console.log('idddddddd',graphs[0].props.id)
                const filtered = graphs.filter(function(value, index, arr){ 
                    return value.props.id !== 'candle';
                });
                setGraphs(prev => [...filtered, <CardLineChart id='line' key={keyCount} />]);
                setKeyCount(prev => prev + 1)
            } else {
                setGraphs(prev => [...prev, <CardLineChart id='line' key={keyCount} />]);
                setKeyCount(prev => prev + 1)
            }
        };
        if(props.mainGraphType === 'candle'){
            if(graphs.length !== 0){
                const filtered = graphs.filter(function(value, index, arr){ 
                    return value.props.id !== 'line';
                });
                setGraphs(prev => [...filtered, <CardCandleChart id='candle' key={keyCount} />]);
                setKeyCount(prev => prev + 1)
            } else {
                setGraphs(prev => [...prev, <CardCandleChart id='candle' key={keyCount} />]);
                setKeyCount(prev => prev + 1)
            }
        }
    }
    return (
        <>
        {graphs.map((item, index) => (
            <>
            {item}
            </>
        ))}
        </>

    )
}

const MainGraph = connect(
    mapStateToProps
    )(ConnectedMainGraph);
  
  export default MainGraph;