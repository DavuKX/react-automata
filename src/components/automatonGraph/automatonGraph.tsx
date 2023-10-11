"use client"
import React, {useEffect} from 'react';
// @ts-ignore
import CytoscapeComponent from "react-cytoscapejs";
import {Paper, hexToRgb} from "@mui/material";

interface AutomatonGraphProps {
    graphData: GraphData;
    state: {
        currentState: string,
        newState: string
    }
}

const AutomatonGraph: React.FC<AutomatonGraphProps> = ({graphData, state}) => {
    const graphRef = React.useRef<any>(null);
    const mainColor = "#1976D2";
    const secondaryColor = "#6400b4";

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


    useEffect(() => {
        if (graphRef.current) {
            applyStylesToNodes(graphRef.current.nodes(), state);
            applyStylesToEdges(graphRef.current.edges(), state);
        }
    }, [state])

    const layout = {
        name: "breadthfirst",
        padding: 10,
        spacingFactor: 3.5,
        animate: true,
        animationDuration: 1000,
        animationEasing: "ease-in-out",
        fit: true,
        nodeDimensionsIncludeLabels: true,
        avoidOverlap: true,
    };

    const styleSheet = [
        {
            selector: "node[label]",
            style: {
                label: "data(label)",
                "text-halign": "center",
                "text-valign": "center",
                "border-color": mainColor,
                "border-width": 3,
                "background-color": "#FFFFFF",
                "width": "120px",
                "height": "120px",
                "font-size": "40px",
                "font-weight": "bold",
                "shape": "ellipse",
            }
        },
        {
            selector: "edge[label]",
            style: {
                label: "data(label)",
                "curve-style": "bezier",
                "target-arrow-shape": "triangle",
                "line-color": mainColor,
                "target-arrow-color": mainColor,
                "font-size": 60,
                "width": 4,
                "arrow-scale": 4,
            }
        },
        {
            selector: 'node[final]',
            style: {
                "border-color": mainColor,
                "border-width": 3,
                "border-style": "double",
                "background-color": "#C0E0FF",
            }
        },
        {
            selector: "node#start",
            style: {
                "background-color": "#d9ff8d",
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
                        cy={(cy: any) => {
                            graphRef.current = cy;
                        }}
                    />
            </div>
        </Paper>
    );
}

export default AutomatonGraph;