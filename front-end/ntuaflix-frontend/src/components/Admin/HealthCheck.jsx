import React from "react";
import "../../styles.css";
import Header from "../Header";
import Footer from "../Footer";
import axios from 'axios';
import {useEffect, useState} from "react";

const BASE_URL = 'https://localhost:9876/ntuaflix_api/admin';

export default function HealthCheck() {
    const [healthCheckData, setHealthCheckData] = useState({ status: '', dataconnection: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('softeng20bAPI.token');
        // Set up the headers with the auth token
        const headers = {
            'Authorization': `${token}`,
        };
        axios.post(`${BASE_URL}/healthcheck`, {}, {headers : headers})
            .then(response => {
                setHealthCheckData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load health check data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="healthCheck">
            <Header/>
            <h1 className="header">Loading...</h1>
            {/*<Footer role="admin"/>*/}
        </div>;
    }

    if (error) {
        return <div className="healthCheck">
            <Header/>
            <h1 className="header">{error}</h1>
            {/*<Footer role="admin"/>*/}
        </div>;
    }

    return (
        <div className="healthCheck">
            <Header/>
            <div className="healthCheckInfo">
                <h2>Health Check Status</h2>
                <p><strong className="dynamic-content">Status:</strong> {healthCheckData.status}</p>
                <p><strong className="dynamic-content">Data Connection:</strong> {healthCheckData.dataconnection}</p>
            </div>
            {/*<Footer role="admin"/>*/}
        </div>
    )
}