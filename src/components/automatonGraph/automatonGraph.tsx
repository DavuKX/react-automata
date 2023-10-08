"use client"
import React from 'react';
// @ts-ignore
import CytoscapeComponent from "react-cytoscapejs";
import {Paper, hexToRgb} from "@mui/material";

interface AutomatonGraphProps {
    graphData: GraphData
}

const AutomatonGraph: React.FC<AutomatonGraphProps> = ({graphData}) => {

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
                "border-width": 3,
                "background-color": "#FFFFFF",
                "width": "100px",
                "height": "100px",
                "font-size": "40px",
                "font-weight": "bold",
            }
        },
        {
            selector: "edge[label]",
            style: {
                label: "data(label)",
                "curve-style": "bezier",
                "target-arrow-shape": "triangle",
                "line-color": "#1976D2",
                "target-arrow-color": "#1976D2",
                "font-size": "40px",
            }
        },
        {
            selector: 'node[id = "1","2","6","5","9","8","11","12"]',
            style: {
                "border-style": "double",
                "border-spacing": 30,
                "border-width": 5,
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