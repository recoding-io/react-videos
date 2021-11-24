import React, { Component } from 'react'
import Plot from 'react-plotly.js'
export default class PiePlot extends Component {
    render() {
        return (
            <div>
                <Plot
                    data={[{
                        values: [33,33,34],
                        labels: ['React','VUE','Angular'],
                        type: 'pie'
                    }]}
                    layout={{width: 500,height: 500,title: 'Simple Pie Chart'}}
                />
            </div>
        )
    }
}
