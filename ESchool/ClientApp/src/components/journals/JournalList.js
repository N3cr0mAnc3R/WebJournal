import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { journals: [], loading: true };
    }

    componentDidMount() {
        this.getJournals();
    }

    static renderJournals(journals) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Дисциплина</th>
                        <th>День недели</th>
                        <th>Класс</th>
                    </tr>
                </thead>
                <tbody>
                    {journals.map(journal =>
                        <tr key={journal.id}>
                            <td>{journal.discipline}</td>
                            <td>{journal.day}</td>
                            <td>{journal.className}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderJournals(this.state.journals);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    getJournals() {
        authService.getAccessToken().then(token => {
            console.log(token);
            fetch('http://localhost:7232/api/teacher/getJournals', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
                method: 'POST'
            }).then(data => {
                console.log(data);
            });
        });
    }
}
