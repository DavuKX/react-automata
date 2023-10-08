"use client"
import React from 'react';
// @ts-ignore
import CytoscapeComponent from "react-cytoscapejs";
import {Paper} from "@mui/material";

interface AutomatonGraphProps {
    graphData: GraphData;
    state: {
        currentState: string,
        newState: string
    }
}

const AutomatonGraph: React.FC<AutomatonGraphProps> = ({graphData, state}) => {

    const layout = {
        name: "breadthfirst",
        fit: true,
        directed: true,
        padding: 50,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false
    };

    const styleSheet = [
        {
            selector: "node[label]",
            style: {
                label: "data(label)",
                "text-halign": "center",
                "text-valign": "center",
                "border-color": "#1976D2",
                "border-width": 2,
                "background-color": "#FFFFFF",
                "size": "50px"
            }
        },
        {
            selector: "edge[label]",
            style: {
                label: "data(label)",
                "curve-style": "unbundled-bezier(multiple)",
                "target-arrow-shape": "triangle",
                "line-color": "#1976D2",
            }
        },
    ];

    return (
        <Paper elevation={4}>
            <div className="p-4">
                    <CytoscapeComponent
                        elements={CytoscapeComponent.normalizeElements(graphData)}
                        style={{width: "100%", height: "400px"}}
                        zoomingEnabled={true}
                        maxZoom={3}
                        minZoom={0.1}
                        autounselectify={false}
                        boxSelectionEnabled={true}
                        layout={layout}
                        stylesheet={styleSheet}
                    />
            </div>
        </Paper>
    );
}

export default AutomatonGraph;