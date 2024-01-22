import React from "react";
import {Link} from "react-router-dom";
import "../styles.css";
import {useNavigate} from "react-router-dom";

function Footer({role}) {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Perform any logout logic here (like clearing tokens, user data, etc.)

        // Replace the current entry in the history stack with the login route
        navigate('/', { replace: true });
    };

    return <footer>
        <p>
            Logged in as {role}.
            <Link className="link" onClick={handleLogout} to="/"> Log out?</Link>
        </p>
    </footer>;
}

export default Footer;