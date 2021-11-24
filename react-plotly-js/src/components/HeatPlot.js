import React, { Component } from 'react'
import Plot from 'react-plotly.js'
export default class HeatPlot extends Component {
    render() {
        return (
            <div>
                <Plot 
                    data= {[{
                        z:[[1,null,20,25,1],[45,46,67,13,85],[26,null,90,52,32]],
                        x: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
                        y: ['Week1','Week2','Week3'],
                        type: 'heatmap',
                        hoverongaps: false
                    }]}
                />
            </div>
        )
    }
}
