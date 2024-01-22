import React from "react";
import "../../styles.css";
import Header from "../Header";
import Footer from "../Footer";
import axios from 'axios';
import {useEffect, useState} from "react";

export default function HealthCheck() {
    const [healthCheckData, setHealthCheckData] = useState({ status: '', dataconnection: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/admin/healthcheck')
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
        return <div>
            <Header/>
            <h1 className="header">Loading...</h1>
            <Footer role="admin"/>
        </div>;
    }

    if (error) {
        return <div>
            <Header/>
            <h1 className="header">{error}</h1>
            <Footer role="admin"/>
        </div>;
    }

    return (
        <div>
            <Header/>
            <h2>Health Check Status</h2>
            <p>Status: {healthCheckData.status}</p>
            <p>Data Connection: {healthCheckData.dataconnection}</p>
            <Footer role="admin"/>
        </div>
    )
}