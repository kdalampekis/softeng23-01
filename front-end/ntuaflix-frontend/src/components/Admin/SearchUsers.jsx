import React, {useState} from "react";
import Header from "../Header";
import Footer from "../Footer";
import {useNavigate} from "react-router-dom";
import "../../styles.css";
import {searchUserByUsername} from "../../api";

export default function SearchUsers() {
    const initial_message = "Which user do would you like to see?";

    const navigate = useNavigate();
    const [searched, setSearched] = useState(false);
    const [message, setMessage] = useState(initial_message);
    const [username, setUsername] = useState("");

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    }

    const handleSearch = async () => {
        if(username) {
            setSearched(true);
            try {
                const userData = await searchUserByUsername(username);
                console.log(userData);
                navigate(`/admin/users/${username}`, {state: { user: userData} });
            } catch (error) {
                // Handle the error
                console.error("Error fetching user data: ", error);

                // Check if the error is a 404 (Not Found)
                if (error.response && error.response.status === 404) {
                    // Set a message indicating the user was not found
                    setMessage("User not found, try another username");
                } else {
                    // For other types of errors, set a different message or handle differently
                    setMessage("An error occurred. Please try again later");
                }
            }
        }
    }

    const handleSearchAgain = () => {
        setMessage(initial_message);
        setSearched(false);
        setUsername("");
    }

    return (
        <div>
            <Header />
            <h1 className="message">{message}</h1>

            <div>
                <div className="inputContainer new">
                    <input
                        type="text"
                        onChange={handleInputChange}
                        value={username}
                        placeholder="Username"
                        required
                    />
                </div>

                <div className="buttonContainer">
                    <button
                        onClick={searched ? handleSearchAgain : handleSearch}
                        disabled={!username}
                    >
                        {searched ? "Search again" : "Search"}
                    </button>
                    <button onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </div>

            {/*<Footer role="admin"/>*/}
        </div>
    );
}