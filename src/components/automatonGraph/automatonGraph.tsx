"use client"
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Graph} from "react-d3-graph";
import {Paper} from "@mui/material";

class AutomatonGraph extends Component {
    render() {
        const myConfig = {
            nodeHighlightBehavior: true,
            node: {
                color: 'purple',
                size: 120,
                highlightStrokeColor: 'blue'
            },
            link: {
                highlightColor: 'lightblue'
            },
            staticGraph: false,
            d3: {
                alphaTarget: 0.05,
                gravity: -150,
                linkLength: 120,
                linkStrength: 2,
            },
        };

        const data = {
            nodes: [
                {id: "start"},
                {id: "s0"},
                {id: "s1"},
                {id: "s2"},
                {id: "s3"},
                {id: "s4"},
                {id: "s5"},
                {id: "s6"},
                {id: "s7"},
                {id: "s8"},
                {id: "s9"},
                {id: "s10"},
                {id: "s11"},
                {id: "s12"},
                {id: "s13"},
            ],
            links: [
                {source: "start", target: "s0"},
                {source: "start", target: "s1"},
                {source: "s1", target: "s2"},
                {source: "s1", target: "s3"},
                {source: "s2", target: "s4"},
                {source: "s2", target: "s13"},
                {source: "s3", target: "s4"},
                {source: "s3", target: "s13"},
                {source: "s4", target: "s5"},
                {source: "s4", target: "s6"},
                {source: "s5", target: "s7"},
                {source: "s6", target: "s13"},
                {source: "s7", target: "s8"},
                {source: "s7", target: "s9"},
                {source: "s8", target: "s10"},
                {source: "s8", target: "s13"},
                {source: "s9", target: "s13"},
                {source: "s9", target: "s10"},
                {source: "s10", target: "s12"},
                {source: "s10", target: "s11"},
            ]
        }

        return (
            <Paper elevation={4}>
                <Graph
                    id='id'
                    data={data}
                    config={myConfig}
                />
            </Paper>
        );
    }
}

export default AutomatonGraph;