import React from "react";
import logo from '../assets/logo.svg';
import {generateEdges} from "./GraphSim";

const ControlPanel = ({graphData, setGraphData}) => {

    return (
        <>
                <>
                    <div
                        className="items-center flex"
                    >
                        <div>
                            <div className="border-0 rounded-r-lg shadow-lg relative flex flex-col w-full bg-gray-800/90 text-white outline-none focus:outline-none"  style={{width: '250px', minHeight:'50vh'}}>
                                <div className="flex items-start justify-between p-5 rounded-t">
                                    <h3 className="text-xl font-medium title-font mb-2">
                                        Depth First Search
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="mb-4 pt-0">
                                        <label className="">Number of nodes</label>
                                        <input
                                            type="number"
                                            min={1}
                                            placeholder="Number of nodes"
                                            value={graphData.noOfNodes}
                                            onChange={(e)=>setGraphData({...graphData, noOfNodes: parseInt(e.target.value)})}
                                            className="px-3 py-2 text-black my-2 rounded w-full"
                                        />
                                    </div>

                                    <div className="mb-4 pt-0">
                                        <label className="">Starting node</label>
                                        <input
                                            type="number"
                                            min={1}
                                            max={graphData.noOfNodes || 1}
                                            placeholder="Starting node"
                                            value={graphData.startingNode}
                                            onChange={(e) => setGraphData({
                                                ...graphData,
                                                startingNode: parseInt(e.target.value) > graphData.noOfNodes ?
                                                    1 : parseInt(e.target.value)}
                                            )}
                                            className="px-3 py-2 text-black my-2 rounded w-full"
                                        />
                                    </div>

                                    <div className="mt-4 pt-0">
                                        <label className="">Create edges</label>
                                        <div className="flex mt-2 ml-5">
                                            <div>
                                                <div className="">
                                                    <input
                                                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
                                                        type="radio" checked={graphData.randomize} id="random"
                                                        onChange={()=>setGraphData({...graphData, randomize: true})}
                                                    />
                                                    <label className="form-check-label inline-block" htmlFor="random">
                                                        Random
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
                                                        type="radio" checked={!graphData.randomize} id="manual"
                                                        onChange={()=>setGraphData({...graphData, randomize: false})}
                                                    />
                                                    <label className="form-check-label inline-block" htmlFor="manual">
                                                        Manual
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-between p-6 rounded-b">
                                    <button
                                        className={`bg-gray-200 ${graphData.randomize?"cursor-pointer":"cursor-not-allowed"} text-white active:bg-gray-300 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                        type="button"
                                        onClick={() => {
                                            generateEdges(graphData)
                                            setGraphData({...graphData, flag: 1})
                                        }}
                                        disabled={!graphData.randomize}
                                    >
                                        <img src={logo} style={{width:'20px', height:'20px'}} alt="random"/>
                                    </button>
                                    <div>
                                        <button
                                            className="text-blue-500 text-white active:text-blue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                setGraphData({startingNode: 1, noOfNodes: 5, randomize: true, flag: 1})
                                                generateEdges(graphData);
                                            }}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {setGraphData({...graphData, flag: 3})}}
                                        >
                                            Go
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="backdrop-blur-sm fixed inset-0 z-40 bg-black/50"></div>*/}
                </>
        </>
    );
}

export default ControlPanel;