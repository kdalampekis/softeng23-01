import React from "react";
import {Link} from "react-router-dom";
import "../styles.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Footer({role}) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('softeng20bAPI.token');
            // Set up the headers with the auth token
            const headers = {
                'Authorization': `${token}`,
            };
            const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/logout/', {}, {headers : headers});

            if (response.status === 200) {
                localStorage.removeItem('softeng20bAPI.token');

                window.location.replace('/');

            } else {
                console.log('Logout failed');
            }
        } catch (error) {
            console.error('Error:', error.message);

        }
    };



    return <footer>
        <p>
            Logged in as {role}.
            {/* Use a button or span for logout to directly call handleLogout */}
            <button className="link" onClick={handleLogout}>
                Log out?
            </button>
        </p>
    </footer>
}

export default Footer;