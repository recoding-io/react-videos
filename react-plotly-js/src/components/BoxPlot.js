import React, { Component } from 'react'
import Plot from 'react-plotly.js';
export default class BoxPlot extends Component {
    constructor(props){
        super(props)
        var boxPlotly0 = [];
        var boxPlotly1 = [];
        for (var i = 0;i<50;i++){
            boxPlotly0[i] = Math.random();
            boxPlotly1[i] = Math.random() + 1;
        }
        var data_BoxPlot_0 = {
            y: boxPlotly0,
            type: 'box'
        }

        var data_BoxPlot_1 = {
            y: boxPlotly1,
            type: 'box'
        }

        this.state = {data: [data_BoxPlot_0,data_BoxPlot_1]}
    }
    render() {
        return (
            <div>
                <Plot
                    data={this.state.data}
                />
            </div>
        )
    }
}
