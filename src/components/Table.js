import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import '../bootstrap-css-only/css/bootstrap.min.css';
import '../mdbreact/dist/css/mdb.css';

class Table extends Component {
    render() {
        let { data } = this.props;
        data = data
            .map(obj => ({
                ...obj,
                eCPM: (obj.revenue/obj.impressions)*1000
            }))
            .sort((a, b) => b.timestamp.split('-').join('') - a.timestamp.split('-').join(''));

        const tableData = {
            columns: [
                {
                    label: 'Timestamp',
                    field: 'timestamp',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Game',
                    field: 'game',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Revenue',
                    field: 'revenue',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Impressions',
                    field: 'impressions',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'eCPM',
                    field: 'eCPM',
                    sort: 'asc',
                    width: 150
                }
            ],
            rows: data
        }

        return (
            <div>
                <MDBDataTable
                    striped
                    bordered
                    small
                    entries={5}
                    entriesOptions={[5, 10]}
                    data={tableData}
                />
            </div>
        );
    }
}

export default Table;