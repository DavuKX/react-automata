export const mainColor = "#1976D2";
export const secondaryColor = "#b40006";
export const styleSheet = [
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
            "control-point-step-size": 300,
            "control-point-weight": 0.5,
            "control-point-distances": 200,
            "loop-direction": "0deg",
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

export const layout = {
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