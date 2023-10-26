"use client"
import React from 'react';
// @ts-ignore
import CytoscapeComponent from "react-cytoscapejs";
import {Paper} from "@mui/material";
import {layout, mainColor, secondaryColor, styleSheet} from "@/components/automatonGraph/graphStyles";

interface AutomatonGraphProps {
    graphData: GraphData;
}

const AutomatonGraph: React.FC<AutomatonGraphProps> = ({graphData}) => {
    const graphRef = React.useRef<any>(null);

    const applyStylesToNodes = (nodes: any, state: any) => {
        nodes.forEach((node: any) => {
            if (node.data().label === state.currentState || node.data().label === state.newState) {
                node.style({
                    "border-color": secondaryColor,
                    "border-width": "6px",
                });
            } else {
                node.style({
                    "border-color": mainColor,
                    "border-width": "3px",
                });
            }
        });
    };

    const applyStylesToEdges = (edges: any, state: any) => {
        edges.forEach((edge: any) => {
            const connectedNodes = edge.connectedNodes();
            if (connectedNodes[0].data().label === state.currentState && connectedNodes[1].data().label === state.newState) {
                edge.style({
                    "line-color": secondaryColor,
                    "target-arrow-color": secondaryColor,
                });
            } else {
                edge.style({
                    "line-color": mainColor,
                    "target-arrow-color": mainColor,
                });
            }
        });
    };

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
                    cy={(cy: any) => {
                        graphRef.current = cy;
                    }}
                />
            </div>
        </Paper>
    );
}

export default AutomatonGraph;