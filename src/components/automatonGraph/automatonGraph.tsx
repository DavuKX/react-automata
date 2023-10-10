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
    const secondaryColor = "#d21919";
    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.nodes().forEach((node: any) => {
                if (node.data().label === state.currentState || node.data().label === state.newState) {
                    node.style({
                        "border-color": secondaryColor,
                    })
                } else {
                    node.style({
                        "border-color": mainColor,
                    })
                }

                node.connectedEdges().forEach((edge: any) => {
                    const connectedNodes = edge.connectedNodes();
                    if (connectedNodes[0].data().label === state.currentState && connectedNodes[1].data().label === state.newState) {
                        edge.style({
                            "line-color": secondaryColor,
                            "target-arrow-color": secondaryColor,
                        })
                    } else {
                        edge.style({
                            "line-color": mainColor,
                            "target-arrow-color": mainColor,
                        })
                    }
                })
            })
        }
    }, [state])

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
                "border-color": mainColor,
                "border-width": 3,
                "background-color": "#FFFFFF",
                "width": "100px",
                "height": "100px",
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
                "font-size": "40px",
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
        }
        
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