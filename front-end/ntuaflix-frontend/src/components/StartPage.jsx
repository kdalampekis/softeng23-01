import React, {useState} from "react";
import Header from "./Header";
import "../styles.css"
import Button from "./Button";
import Countries from "../constants/Countries";
import {useNavigate} from "react-router-dom";

function StartPage() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [message, setMessage] = useState("Welcome to Ntuaflix");
    const [signupStep, setSignupStep] = useState(1);

    const navigate = useNavigate();

    const handleContinueClick = () => {
        setSignupStep(2); // Move to the next step of signup
    };
    const handleLoginClick = () => {
        setShowLogin(true);
        setShowSignUp(false);
        setMessage("Log in to your account");
    };

    const handleSignUpClick = () => {
        setShowSignUp(true);
        setShowLogin(false);
        setMessage("Create your account");
    };

    const handleBackToHome = () => {
        setShowLogin(false);
        setShowSignUp(false);
        setMessage("Welcome to Ntuaflix");
    };

    const handleLogin = () => {
        console.log("Logging in...");
        // Add login logic here

        // Navigate to the home page after the login logic
        navigate('/admin');
    };

    const handleSignUp = () => {
        console.log("Signing up...");
        // Add signup logic here
    };

    const handleFinalSignUp = () => {
        console.log("Final signup details submitted");
        // Add logic to handle final signup submission

        //Reset states to initial values
        setShowLogin(false);
        setShowSignUp(false);
        setSignupStep(1);
        setMessage("Welcome to Ntuaflix");
    };


    return (
        <div>
            <Header />
            <h1 className={`message`}>{message}</h1>

            {showLogin && (
                <div className="inputContainer">
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <Button text="Log In" onClick={handleLogin} />
                    {/* Add login form elements here */}
                </div>
            )}

            {showSignUp && signupStep === 1 && (
                <div className="inputContainer">
                    <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password"/>
                    <input type="email" placeholder="Email"/>
                    <Button text="Continue" onClick={handleContinueClick}/>
                </div>
            )}

            {showSignUp && signupStep === 2 && (
                <div className="inputContainer">
                    {/* Additional input fields for final signup */}
                    <input type="date" placeholder="Date of Birth"/>
                    <select className="styled-select">
                        <option value="">Select Country</option>
                        {Countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>

                    {/* Gender input as a dropdown */}
                    <select className="styled-select">
                        <option value="">Choose Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <Button text="Sign Up" onClick={handleFinalSignUp}/>
                </div>
            )}


            {!showLogin && !showSignUp && (
                <div className="buttonContainer">
                    <Button text="Login" onClick={handleLoginClick}/>
                    <Button text="Signup" onClick={handleSignUpClick}/>
                </div>
            )}
        </div>
    );
}

export default StartPage;