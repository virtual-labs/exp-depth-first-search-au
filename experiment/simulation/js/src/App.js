import React from 'react';
import Initializer from "./components/Initializer";
import GraphSim from "./components/GraphSim";

const App = () => {

  const [graphData, setGraphData] = React.useState({startingNode: 1, noOfNodes: 5, randomize: true, flag: 1});

  return (
      <div className="flex justify-between bg-gray-800/90  items-center" style={{width:'100vw', height:'100vh'}}>
        <Initializer graphData={graphData} setGraphData={setGraphData}/>
        <GraphSim graphData={graphData} setGraphData={setGraphData} />
      </div>
  )
}

export default App
