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
                // Clear the token from localStorage or sessionStorage
                localStorage.removeItem('softeng20bAPI.token');
                // Alternatively, you can use sessionStorage:
                // sessionStorage.removeItem('softeng20bAPI.token');
                // Redirect to the home page or any other desired page
                navigate('/');
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
            <Link className="link" onClick={handleLogout} to="/"> Log out?</Link>
        </p>
    </footer>;
}

export default Footer;