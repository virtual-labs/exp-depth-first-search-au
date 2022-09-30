import cytoscape from "cytoscape";

export const option = {

    minZoom: 0.5,
    maxZoom: 4,
    boxSelectionEnabled: false,
    autounselectify: true,
    randomize: true,

    style: cytoscape.stylesheet()
        .selector('node')
        .style({
            'content': 'data(id)',
            'width': '50',
            'height': '50',
            'font-size': '20',
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'font-weight': 'bolder',
            'text-halign': "center",
            'text-valign': "center",
        })
        .selector('edge')
        .style({
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'width': 4,
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
        })
        .selector('.highlighted')
        .style({
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.5s'
        })
        .selector('.selected')
        .style({
            'background-color': '#ffffff',
            'line-color': '#ffffff',
            'target-arrow-color': '#ffffff',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.5s'
        })
        .selector('.active')
        .style({
            'border': '10px solid #0b2638',
            'line-color': '#0b2638'
        }),

    elements: {
        nodes: [
            { data: { id: '1' } }
        ],
        edges: []
    },

    layout: {
        name: 'breadthfirst',
        directed: true,
        roots: '#1',
        padding: 10
    }
}
