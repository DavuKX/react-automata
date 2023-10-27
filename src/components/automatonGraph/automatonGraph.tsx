"use client"
import React, {useEffect} from 'react';
// @ts-ignore
import CytoscapeComponent from "react-cytoscapejs";
import {Paper} from "@mui/material";
import {layout, mainColor, secondaryColor, styleSheet} from "@/components/automatonGraph/graphStyles";
import {validationResultType} from "@/types/validationResultType";
import {speak} from "@/components/validateSection/helpers";
import {useTranslation} from "react-i18next";

interface AutomatonGraphProps {
    graphData: GraphData;
    validationResult: validationResultType;
    automatonSpeed: number;
}

const AutomatonGraph: React.FC<AutomatonGraphProps> = ({graphData, validationResult, automatonSpeed}) => {
    const graphRef = React.useRef<any>(null);
    const getValidationSpeed = () => 500 / (automatonSpeed / 100);
    const {t} = useTranslation();

    useEffect(() => {
        if (validationResult.word) {
            const nodes = graphRef.current.nodes();
            const edges = graphRef.current.edges();

            const applyStylesWithDelay = async () => {
                for (const state of validationResult.path) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, getValidationSpeed());
                    });

                    applyStylesToNodes(nodes, state.initial_state, state.final_state);
                    applyStylesToEdges(edges, state.initial_state, state.final_state)
                }
            };

            applyStylesWithDelay().then(() => speak(t(validationResult.result ? 'accept' : 'reject')));
        }
    }, [validationResult]);


    const applyStylesToNodes = (nodes: any, initialState: string, finalState: string) => {
        nodes.forEach((node: any) => {
            if (node.data().label === initialState || node.data().label === finalState) {
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

    const applyStylesToEdges = (edges: any, initialState: string, finalState: string) => {
        edges.forEach((edge: any) => {
            const connectedNodes = edge.connectedNodes();
            if (connectedNodes[0].data().label === initialState && connectedNodes[1].data().label === finalState) {
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