"use client"
import React, {useState} from 'react';
import CytoscapeComponent from "react-cytoscapejs";
import {Paper} from "@mui/material";

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
            }
        },
        {
            selector: "edge[label]",
            style: {
                label: "data(label)",
                "curve-style": "bezier",
                "target-arrow-shape": "triangle",
            }
        }
    ];

    return (
        <Paper elevation={4}>
            <div className="p-4">
                <div
                    style={{
                        border: "1px solid",
                        backgroundColor: "#f5f6fe"
                    }}
                >
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
            </div>
        </Paper>
    );
}

export default AutomatonGraph;