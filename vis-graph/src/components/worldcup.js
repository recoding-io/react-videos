import React from 'react'
import Graph from 'react-vis-network-graph'
import {edges, nodes} from './data'

export default function WorldCup() {

    var options = {
        nodes:{
            shape: "dot",
            scaling: {
                min: 10,
                max: 30,
                label: {
                    min: 8,
                    max: 30,
                    drawThreshold: 12,
                    maxVisible: 20
                }
            },
            font: {
                size: 12,
                face: "Tahoma"
            }
        },
        edges: {
            width: 0.15,
            color: {inherit: "from"},
            smooth: {
                type: "continuous"
            }
        },
        physics: false,
        interaction: {
            navigationButtons: true,
            tooltipDelay: 200,
            hideEdgesOnDrag: true,
            hideEdgesOnZoom: true
        },
        height: "900px"
    }

    var data = {nodes: nodes, edges: edges}
  return (
    <div className='container'>
        <Graph
            graph = {data}
            options={options}
        />
    </div>
  )
}
