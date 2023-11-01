"use client"
import React, {useState, useEffect} from 'react';
// @ts-ignore
import CytoscapeComponent from "react-cytoscapejs";
import {List, Paper} from "@mui/material";
import {layout, mainColor, secondaryColor, styleSheet} from "@/components/automatonGraph/graphStyles";
import {validationResultType} from "@/types/validationResultType";
import {speak} from "@/components/validateSection/helpers";
import {useTranslation} from "react-i18next";

interface AutomatonGraphProps {
    graphData: GraphData;
    validationResult: validationResultType;
    automatonSpeed: number;
}

interface AnimatedStackProps {
    path: { stack: string[] }[];
    automatonSpeed: number;
}

const AutomatonGraph: React.FC<AutomatonGraphProps> = ({graphData, validationResult, automatonSpeed}) => {
    const graphRef = React.useRef<any>(null);
    const getValidationSpeed = () => 500 / (automatonSpeed / 100);
    const {t} = useTranslation();
    const [currentStack, setCurrentStack] = useState<string[]>([]);
    
    useEffect(() => {
        if (validationResult.word) {
            const nodes = graphRef.current.nodes();
            const edges = graphRef.current.edges();

            const applyStylesWithDelay = async () => {
                for (const state of validationResult.path) {
                    applyStylesToNodes(nodes, state.initial_state, state.final_state);
                    applyStylesToEdges(edges, state.initial_state, state.final_state, state.char, state.stack);
                    setCurrentStack(state.stack.reverse());

                    await new Promise((resolve) => {
                        setTimeout(resolve, getValidationSpeed());
                    });
                }
            };

            applyStylesWithDelay().then(() => speak(t(validationResult.result ? 'accept' : 'reject')));
        }
    }, [validationResult]);

    useEffect(() => {
        graphRef.current.layout(layout).run();
    }, [graphData])


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

    const applyStylesToEdges = (edges: any, initialState: string, finalState: string, char: string, stack:Array<string> ) => {
        edges.forEach((edge: any) => {
            const sourceNode = edge.source();
            const targetNode = edge.target();

            if (
                ( edge.data().source === initialState && edge.data().target === finalState 
                && (char === edge.data().label[0] || char === null && edge.data().label[0] === "λ" && stack[stack.length - 1] === edge.data().label[2])
                )
            ) {
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
                    style={{width: "90%", height: "400px"}}
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
            {currentStack && (
                <List>
                    {currentStack.map((stackItem, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center">
                                <span className="text-sm">{stackItem}</span>
                            </div>
                        </div>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default AutomatonGraph;