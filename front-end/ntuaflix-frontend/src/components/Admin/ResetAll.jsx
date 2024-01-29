import Header from "../Header";
import Footer from "../Footer";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles.css";
import axios from "axios";

const BASE_URL = 'http://127.0.0.1:9876/ntuaflix_api/admin';


export default function ResetAll() {
    const navigate = useNavigate();
    const [resetDone, setResetDone] = useState(false);

    const handleReset = () => {
        const token = localStorage.getItem('softeng20bAPI.token');
        axios.post(`${BASE_URL}/resetall/`, {}, {headers : {
                'Authorization': `${token}`,
            }})
            .then(response => {
                // Handle success
                console.log(response.data);
                setResetDone(true);
                alert("Reset successful!");
                navigate(-1);
            })
            .catch(error => {
                // Handle error
                console.error("Reset failed:", error);
                alert("Reset failed!");
            });
    }

    return (
            <div>
                <Header />

                {!resetDone ? (
                    <div>
                        <h1 className="message">Are you sure you want to restore everything?</h1>
                        <h2>Your action can <span className="dynamic-content">not</span> be undone</h2>
                        <div className="buttonContainer">
                            <button onClick={handleReset}>Reset</button>
                            <button onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Reset complete!</h2>
                    </div>
                )}

                <Footer role="admin"/>
            </div>
    );
}