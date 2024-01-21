import React from "react";
import {Link} from "react-router-dom";
import "../styles.css";

function Footer({role}) {
    return <footer>
        <p>
            Logged in as {role}.
            <Link className="link" to="/"> Log out?</Link>
        </p>
    </footer>;
}

export default Footer;