import React, {useState} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import "../../styles.css";
import {useNavigate, useParams} from "react-router-dom";
import {AdminUploadOptions} from "../../constants/AdminOptions";

const UploadComponent = () => {
    const navigate = useNavigate();
    const { type } = useParams();
    const message = AdminUploadOptions[type];

    // Logic to handle different types of uploads
    const handleUpload = ({type}) => {
        return null;
    }

    return (
        <div>
            <Header />
            <h1 className="message">Upload {message}</h1>
            {/* Render form or content based on the type */}
            <div className="buttonContainer">
                <button onClick={handleUpload}>Upload</button>
                <button onClick={() => navigate(-1) }>
                    Cancel
                </button>
            </div>
            <Footer role="admin"/>
        </div>
    );
};

export default UploadComponent;