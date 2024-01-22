import Header from "../Header";
import Footer from "../Footer";
import React from "react";
import {useNavigate} from "react-router-dom";
import "../../styles.css";


export default function ResetAll() {
    const navigate = useNavigate();

    const handleReset = () => {
        return null;
    }

    return (
        <div>
            <Header/>
            <h1 className="message">Are you sure you want to restore everything?</h1>
            <h2>Your action can <span className="dynamic-content">not</span> be undone</h2>
            {/* Render form or content based on the type */}
            <div className="buttonContainer">
                <button onClick={handleReset}>Reset</button>
                <button onClick={() => navigate(-1)}>
                    Cancel
                </button>
            </div>
            <Footer role="admin"/>
        </div>
    );
}