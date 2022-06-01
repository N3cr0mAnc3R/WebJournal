import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], teachers: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
        //this.getTeachers();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        let token = await authService.getAccessToken();
        let response = await fetch('weatherforecast', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        let data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
    getTeachers() {
        authService.getAccessToken().then(token => {
            console.log(token);
            fetch('http://localhost:7232/api/teacher/getteachers', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
                method: 'POST'
            }).then(data => {
                console.log(data);
            });
        });
        //this.setState({ teachers: data, loading: false });
    }
}
