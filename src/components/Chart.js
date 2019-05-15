import React, { Component } from 'react';
import { LineChart } from 'react-chartkick';
import Table from './Table';

class Chart extends Component {
    render() {
        const { data, startDate, endDate } = this.props;

        const dataInRange = data.filter(obj => {
            const time = obj ? obj.timestamp : ' '
            if (time !== ' ') {
                const YMD = time.split('-');
                const actualTime = new Date(YMD[0], YMD[1][1] - 1, YMD[2]);
                if (actualTime.getTime() >= startDate.getTime() && actualTime.getTime() <= endDate.getTime()) {
                    return obj;
                }
            }   
        });

        const game1 = {}, game2 = {};
        dataInRange.forEach(data => {
            if (data.game.includes('Callbreak Multiplier')) {
                game1[data.timestamp] = (data.revenue/data.impressions)*1000;
            }
            if (data.game.includes('World Cricket Championship')) {
                game2[data.timestamp] = (data.revenue/data.impressions)*1000;
            }
        });

        const charData = [
            {"name":"Callbreak Multiplier", "data": game1},
            {"name":"World Cricket Chamionship", "data": game2}
        ];

        return (
            <div>
                <LineChart data={charData} xtitle="Time" ytitle="eCPM" messages={{empty: "No data in given range"}}/>
                <div>
                    <h1>Tabular Representation of Data</h1>
                    <Table data={dataInRange} />
                </div>
            </div>
        );
    }
}

export default Chart;