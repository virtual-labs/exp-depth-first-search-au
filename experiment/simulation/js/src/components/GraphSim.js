import React, {useEffect, useRef} from "react";
import cytoscape from "cytoscape";
import {option} from "../assets/option";
import QueueSim from "./QueueSim";

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateEdges = (graphData) => {
    option.elements.edges = [];

    for(let i = 0; i < graphData.noOfNodes+randomNumber(0,4); i++) {
        const a = randomNumber(1, graphData.noOfNodes);
        const b = randomNumber(1, graphData.noOfNodes);
        if (a !== b && !option.elements.edges.some(edge => {
            return edge.data.source === a && edge.data.target === b
        }))
        {
            option.elements.edges = [
                ...option.elements.edges,
                {
                    data: {
                        id: `${a}${b}`, weight: randomNumber(0, graphData.noOfNodes+4), source: `${a}`, target: `${b}`
                    }
                }
            ]
        }
    }
}

const GraphSim = ({graphData, setGraphData}) => {
    const graphRef = useRef(null)
    const [edge, setEdge] = React.useState([])
    const [prevGraphData, setPrevGraphData] = React.useState({...graphData, noOfNodes: 3});
    const [queue, setQueue] = React.useState([]);
    const [statusMessage, setStatusMessage] = React.useState({action: null, node: null});
    const [options, setOptions] = React.useState({});
    const [spaceComplexity, setSpaceComplexity] = React.useState(0);

    const drawGraph = () => {
        option.container = graphRef.current;
        setOptions(option);
        let cy;
        try {
            cy = cytoscape(option);
        } catch (e) {
            console.log(e)
        }
        cy.on('tap', 'node', function(evt) {
            cy.$(`#${evt.target.id()}`).toggleClass('selected');
            setEdge(prev =>[...prev, evt.target.id()]);
        })

        let tempQ = [];

        if (graphData.flag === 3) {
            const _actions = []
            const dfs = cy.elements().dfs({
                root: `#${graphData.startingNode}`,
                visit: (v, e, u, i, _depth) => {
                    if (_depth>spaceComplexity)
                        setSpaceComplexity(_depth);
                    if (u && tempQ.length && tempQ[0]===u.id()) {
                        tempQ.shift()
                        _actions.push({"action": "POP", "node": u.id()})
                    }

                    tempQ.push(v.id());
                    _actions.push({"action": "PUSH", "node": v.id()})
                },
                directed: true
            });

            let i = 0;

            let queued = dfs.path.filter(path => path.group() === 'nodes').map(node => {return {node: node.id(), state: "PUSHED"}})
            console.log(queued)

            const highlightNextElm = () => {
                if (i < dfs.path.length) {
                    dfs.path[i].addClass('highlighted');
                    i++;

                    let _queue = []
                    let status = ''

                    console.log(_actions)

                    for(let j=0; j<i; j++){
                        let a = _actions[j]

                        if (a && a.action === "PUSH") {
                            status = {action:'PUSHED', node:a.node}
                            _queue.push({node: a.node, state: "PUSHED"})
                        }

                        if (a && a.action === "POP"){
                            status = {action:'POPPED', node:a.node}
                            _queue.map((elm, k) => {
                                if (elm.node === a.node) {
                                    _queue[k].state = "POPPED"
                                } return null;
                            })
                        }
                    }

                    setTimeout(() => {
                        setQueue(_queue)
                        setStatusMessage(status)
                        // setQueue(queued.slice(0, i));
                        // bfs.path[i-1].source()?.id()?.removeClass('active');
                        highlightNextElm()
                    }, 1000);
                } else {
                    setStatusMessage({action:'COMPLETE', node: null})
                }
                // setQueue([])
            }

            highlightNextElm()
            // setGraphData({...graphData, flag: 1})
        }
        setQueue([])
    }

    const generateNodes = () => {
        option.elements.nodes = [{ data: { id: `1` }}];

        if (graphData.noOfNodes > 1 && option.elements.nodes.length < graphData.noOfNodes)
            for(let i = 2; i <= graphData.noOfNodes; i++)
                option.elements.nodes = [...option.elements.nodes, { data: { id: `${i}` }}]

        setGraphData({...graphData, flag: 1})
    }

    useEffect(() => {
        setStatusMessage({action: null, node: null})
        if (prevGraphData.noOfNodes !== graphData.noOfNodes)
            generateNodes();

        if (graphData.flag !== 3 && graphData.flag !== 5 && !graphData.randomize)
            option.elements.edges = [];

        if (graphData.randomize && prevGraphData.noOfNodes !== graphData.noOfNodes)
            generateEdges(graphData);

        drawGraph()

        setPrevGraphData(graphData)

    }, [graphData])

    useEffect(() => {
        if (edge.length === 2){
            option.elements.edges = [
                ...option.elements.edges,
                {
                    data: {
                        id: `${edge[0]}${edge[1]}`,
                        weight: randomNumber(0, graphData.noOfNodes+4),
                        source: `${edge[0]}`,
                        target: `${edge[1]}`
                    }
                }]
            drawGraph();
            setEdge([])
            setGraphData({...graphData, flag: 5})
        }
    },[edge])

    return(
        <>
            <div ref={graphRef} style={{width: '80%', height: '100vh'}} className="p-16 pr-32"/>
            <QueueSim queue={queue} current={statusMessage.node}/>
            {(statusMessage.action !== null) && (
                <div className="absolute rounded font-mono p-4 bottom-10 right-10 bg-gray-800 shadow text-white">
                    {statusMessage.action === 'COMPLETE' && (
                        <>
                            Traversal Path -&nbsp;
                            {queue.map((elm, i) => (elm.node+" "))}
                            <br/>
                            Time Complexity - {options?.elements?.edges?.length + options?.elements?.nodes?.length}
                            <br/>
                            Space Complexity - {spaceComplexity}
                            <br/>
                        </>
                    )}
                    {statusMessage.action !== 'COMPLETE' ?
                        `Node ${statusMessage.node} is ${statusMessage.action.toLowerCase()}` :
                        'Traversal Completed'
                    }
                </div>
            )}
        </>
    )
}

export default GraphSim;