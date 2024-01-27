import React from "react";
import {Link} from "react-router-dom";
import "../styles.css";
import {useNavigate} from "react-router-dom";

function Footer({role}) {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear the token from localStorage or sessionStorage
        localStorage.removeItem('softeng20bAPI.token');
        // Alternatively, you can use sessionStorage:
        // sessionStorage.removeItem('softeng20bAPI.token');
        // Redirect to the home page or any other desired page
        navigate('/StartPages');
    };

    return <footer>
        <p>
            Logged in as {role}.
            <Link className="link" onClick={handleLogout} to="/"> Log out?</Link>
        </p>
    </footer>;
}

export default Footer;