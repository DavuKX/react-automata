"use client"
import React, {useState} from 'react';
import CytoscapeComponent from "react-cytoscapejs";

interface AutomatonGraphProps {

}

export default function AutomatonGraph(): React.FC<AutomatonGraphProps> {
    const [width, setWith] = useState("100%");
    const [height, setHeight] = useState("400px");
    const [graphData, setGraphData] = useState({
        nodes: [
            {data: {id: "0", label: "q0"}},
            {data: {id: "1", label: "q1"}},
            {data: {id: "2", label: "q2"}},
            {data: {id: "3", label: "q3"}},
            {data: {id: "4", label: "q4"}},
            {data: {id: "5", label: "q5"}},
            {data: {id: "6", label: "q6"}},
            {data: {id: "7", label: "q7"}},
            {data: {id: "8", label: "q8"}},
            {data: {id: "9", label: "q9"}},
            {data: {id: "10", label: "q10"}},
            {data: {id: "11", label: "q11"}},
            {data: {id: "12", label: "q12"}},
            {data: {id: "13", label: "q13"}},
            {data: {id: "14", label: "q14"}}
        ],
        edges: [
            {
                data: {source: "0", target: "1", label: "B"}
            },
            {
                data: {source: "0", target: "2", label: "A"}
            },
            {
                data: {source: "2", target: "3", label: "A"}
            },
            {
                data: {source: "2", target: "4", label: "B"}
            },
            {
                data: {source: "3", target: "5", label: "A"}
            },
            {
                data: {source: "4", target: "5", label: "A"}
            },
            {
                data: {source: "3", target: "14", label: "B"}
            },
            {
                data: {source: "4", target: "14", label: "B"}
            },
            {
                data: {source: "5", target: "7", label: "B"}
            },
            {
                data: {source: "7", target: "14", label: "B"}
            },
            {
                data: {source: "5", target: "6", label: "A"}
            },
            {
                data: {source: "7", target: "8", label: "A"}
            },
            {
                data: {source: "8", target: "9", label: "A"}
            },
            {
                data: {source: "9", target: "14", label: "B"}
            },
            {
                data: {source: "6", target: "14", label: "B"}
            },
            {
                data: {source: "6", target: "7", label: "A"}
            },
            {
                data: {source: "8", target: "10", label: "B"}
            },
            {
                data: {source: "10", target: "14", label: "B"}
            },
            {
                data: {source: "10", target: "11", label: "A"}
            },
            {
                data: {source: "9", target: "11", label: "A"}
            },
            {
                data: {source: "11", target: "12", label: "A"}
            },
            {
                data: {source: "11", target: "13", label: "B"}
            }
        ]
    });

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
        <>
            <div>
                <h1>Cytoscape example</h1>
                <div
                    style={{
                        border: "1px solid",
                        backgroundColor: "#f5f6fe"
                    }}
                >
                    <CytoscapeComponent
                        elements={CytoscapeComponent.normalizeElements(graphData)}
                        style={{width: width, height: height}}
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
        </>
    );
}
