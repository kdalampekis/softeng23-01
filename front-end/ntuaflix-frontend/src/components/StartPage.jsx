import React, {useState} from "react";
import Header from "./Header";
import "../styles.css"
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function StartPage() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [message, setMessage] = useState("Welcome to Ntuaflix");
    const [signupStep, setSignupStep] = useState(1);

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [firstname, setFirstName] = useState('');
    const [lastname,setLastName ] = useState('');


    const navigate = useNavigate();

    const handleFinalSignUp = async () => {
        // Object containing form data
        const formData = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password,
            username: username,
            // Include other form data here
        };
        console.log(formData);
        try {
            // Sending data to the backend using axios
            const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/signup/', formData);

            // Handle response data
            console.log(response.data);
        } catch (error) {
            console.error('There was a problem with the axios operation:', error);
        }
        console.log("Final signup details submitted");
        // Add logic to handle final signup submission

        //Reset states to initial values
        setShowLogin(false);
        setShowSignUp(false);
        setSignupStep(1);
        setMessage("Welcome to Ntuaflix");
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

    const handleLogin = async () => {
        console.log("Logging in...");
        const formData = {
            password: password,
            username: username,
        };

        try {
            const response = await axios.post('http://127.0.0.1:9876/ntuaflix_api/login/', formData);

            if (response.status === 200) {
                const token = response.data.token;
                const isSuperuser = response.data.is_superuser;

                localStorage.setItem('softeng20bAPI.token', token);

                console.log('Login successful');

                if (isSuperuser) {
                    // Redirect to admin page if the user is a superuser
                    navigate('/admin');
                } else {
                    // Redirect to user page if the user is not a superuser
                    navigate('/');
                }
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setShowLogin(true);
            setShowSignUp(false);
            setMessage('Log in to your account');
        }
    };




    return (
        <div>
            <Header />
            <h1 className={`message`}>{message}</h1>

            {showLogin && (
                <div className="inputContainer">
                    <input
                        type="text" placeholder="Username" value={username} required
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="password" placeholder="Password" value={password} required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button text="Log In" onClick={handleLogin} />
                    {/* Add login form elements here */}
                </div>
            )}

            {showSignUp && signupStep === 1 && (
                <div className="inputContainer">
                    <input
                        type="text" placeholder="Username" value={username} required
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="password" placeholder="Password" value={password} required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="email" placeholder="Email" value={email} required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text" placeholder="Firstname" value={firstname} required
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text" placeholder="Lastname" value={lastname} required
                        onChange={(e) => setLastName(e.target.value)}
                    />
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