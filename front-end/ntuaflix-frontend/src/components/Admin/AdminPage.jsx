import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { AdminBasicOptions } from "../../constants/AdminOptions";
import "../../styles.css";
import {useNavigate} from "react-router-dom";

export default function AdminPage() {
    const [selectedFunctionality, setSelectedFunctionality] = useState(null);
    const [message, setMessage] = useState("How can Ntuaflix help you today?");
    const navigate = useNavigate();

    const handleFunctionalityClick = (option) => {
        setSelectedFunctionality(option);

        if (option === "Health Check") {
            navigate('/admin/healthcheck');
        }
        else if (option === "Upload") {
            navigate('/admin/upload');
        }
        else if (option === "Reset All") {
            navigate('/admin/resetall');
        }
    }

    return (
        <div>
            <Header/>
            <h1 className={`message`}>{message}</h1>
            {!selectedFunctionality && (
                <div className="functionalitiesContainer">
                    {AdminBasicOptions.map((option, index) => (
                        <button
                            key={index}
                            className="functionality"
                            onClick={() => handleFunctionalityClick(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
            <Footer role="admin"/>
        </div>
    );
}
