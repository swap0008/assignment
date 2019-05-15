import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Chart from './Chart'
import "../react-datepicker/dist/react-datepicker.css";

class App extends Component {
	state = {
		endpoint: 'http://www.mocky.io/v2/5cd04a20320000442200fc10',
		data: [],
		startDate: new Date(2019, 3, 10),
		endDate: new Date(2019, 3, 19)
	}

	componentDidMount() {
		fetch(this.state.endpoint)
            .then(data => data.text())
            .then(res => {
                res = JSON.parse(res);
                this.setState(() => ({data: res}));
            });
	}

	handleChangeStart = (date) => {
		if(date.getTime() > this.state.endDate.getTime()) {
			return alert('start date cannot extend end data');
		}

		this.setState({
			startDate: date
		});
	}

	handleChangeEnd = (date) => {
		if (new Date().getTime() < date.getTime()) {
			return alert('Date cannot extend to future');
		}

		if (date.getTime() < this.state.startDate.getTime()) {
			return alert('End date cannot reduce start date.');
		}

		this.setState({
			endDate: date
		});
	}

	render() {
		const { data, startDate, endDate } = this.state;

		return (
			<div>
				<div className='date-range-picker'>
					<h1>Date Range Picker</h1>
					<DatePicker
						selected={startDate}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						onChange={this.handleChangeStart}
					/>

					<DatePicker
						selected={endDate}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						onChange={this.handleChangeEnd}
					/>
				</div>
				
				<div className="graphical">
					<h1>Graphical Representation of Data</h1>
					<Chart data={data} startDate={startDate} endDate={endDate} />
				</div>
			</div>
		);
	}
}

export default App;
