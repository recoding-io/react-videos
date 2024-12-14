import React, { Component } from 'react'
import Plot from 'react-plotly.js'

export default class TimePlot extends Component {
    render() {
        return (
            <div>
                <Plot
                    data={[{
                        x: ['2021-10-10 22:20:00', '2021-10-16 22:45:00','2021-12-13 15:30:00'],
                        y: [1,3,6],
                        type: 'scatter'
                    }]}
                />
            </div>
        )
    }
}
