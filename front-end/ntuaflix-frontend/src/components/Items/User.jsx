import React from 'react';
import PropTypes from 'prop-types';
import "../../styles.css";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const User = () => {
    const location = useLocation();
    const user = location.state?.user;

    const navigate = useNavigate();

    return (
        <div>
            <Header/>
            <div className="user-container">
                <div className="user-content">
                    <h1 className="user-header">{user.username}</h1>
                    <p><strong className="dynamic-content">Username:</strong> {user.username}</p>
                    <p><strong className="dynamic-content">Email:</strong> {user.email}</p>
                    <p><strong className="dynamic-content">First Name:</strong> {user.first_name}</p>
                    <p><strong className="dynamic-content">Last Name:</strong> {user.last_name}</p>
                </div>
            </div>
            <div className="buttonContainer">
                <button onClick={() => navigate(-1)}>Go Back</button>
                <button onClick={() => navigate(-2)}>Exit</button>
            </div>
            {/*<Footer/>*/}
        </div>
    );
};

User.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired
    })
};

export default User;
