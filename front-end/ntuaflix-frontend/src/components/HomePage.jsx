import React, {useState} from "react";
import Header from "./Header";
import "../styles.css"
import Options from "../constants/Options";
import {useNavigate} from "react-router-dom";
import Button from "./Button";



function HomePage() {
    const [message, setMessage] = useState("How can Ntuaflix help you today?");
    const [selectedFunctionality, setSelectedFunctionality] = useState(null);
    const [inputValues, setInputValues] = useState({}); // Object to hold values for multiple inputs

    const handleInputChange = (name, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleFunctionalityClick = (option) => {
        setSelectedFunctionality(option);
        setMessage(option);
        setInputValues({});
    };

    const handleBackToOptions = () => {
        setSelectedFunctionality(null);
        setMessage("How can Ntuaflix help you today?");
        setInputValues({}); // Reset the input value when going back
    };

    const renderOptionContent = (option) => {
        switch(option) {
            case "N highest rated movies in a genre":
                return (
                    <div className="inputContainer query">
                        <input
                            type="text"
                            value={inputValues.genre || ""}
                            onChange={(e) => handleInputChange('genre', e.target.value)}
                            placeholder="Enter genre"
                        />
                        <input
                            type="number"
                            value={inputValues.numberOfMovies || ""}
                            onChange={(e) => handleInputChange('numberOfMovies', e.target.value)}
                            placeholder="Enter no. of movies"
                        />
                        <div>Content for N highest rated movies in a genre</div>
                    </div>
                );
            case "Highest rated movie of an actor/cast member":
                return (
                    <div className= "query">
                        <input
                            type="text"
                            value={inputValues.actor || ""}
                            onChange={(e) => handleInputChange('actor', e.target.value)}
                            placeholder="Enter actor/cast member"
                        />
                        <div>Content for Highest rated movie of an actor/cast member</div>
                    </div>
                );
            case "Add a like/dislike to a movie":
                return (
                    <div className= "query">
                        <input
                            type="text"
                            value={inputValues.movieTitle || ""}
                            onChange={(e) => handleInputChange('movieTitle', e.target.value)}
                            placeholder="Enter movie title"
                        />
                        <div>Content for like/dislike to a movie</div>
                    </div>
                );
            case "Most recent movie of an actor/cast member":
                return (
                    <div className= "query">
                        <input
                            type="text"
                            value={inputValues.actor || ""}
                            onChange={(e) => handleInputChange('actor', e.target.value)}
                            placeholder="Enter actor/cast member"
                        />
                        <div>Content for Most recent movie of an actor/cast member</div>
                    </div>
                );
            case "N highest rated movies of an actor/cast member":
                return (
                    <div className="inputContainer query">
                        <input
                            type="text"
                            value={inputValues.actor || ""}
                            onChange={(e) => handleInputChange('actor', e.target.value)}
                            placeholder="Enter actor/cast member"
                        />
                        <input
                            type="number"
                            value={inputValues.numberOfMovies || ""}
                            onChange={(e) => handleInputChange('numberOfMovies', e.target.value)}
                            placeholder="Enter number of movies"
                        />
                        <div>Content for N highest rated movies by actor/cast member</div>
                    </div>
                );
            case "Search movie by actor/cast member":
                return (
                    <div className= "query">
                        <input
                            type="text"
                            value={inputValues.actor || ""}
                            onChange={(e) => handleInputChange('actor', e.target.value)}
                            placeholder="Enter actor/cast member"
                        />
                        <div>Content for movie by actor/cast member</div>
                    </div>
                );
            case "Search movie by genre":
                return (
                    <div className= "query">
                        <input
                            type="text"
                            value={inputValues.genre || ""}
                            onChange={(e) => handleInputChange('genre', e.target.value)}
                            placeholder="Enter genre"
                        />
                        <div>Content for movie by genre</div>
                    </div>
                );
            case "Movie analytics":
                return (
                    <div className= "query">
                        <input
                            type="text"
                            value={inputValues.movieTitle || ""}
                            onChange={(e) => handleInputChange('movieTitle', e.target.value)}
                            placeholder="Enter movie title"
                        />
                        <div>Content for Movie analytics</div>
                    </div>
                );
            case "Search movie by year":
                return (
                    <div className= "query">
                        <input
                            type="number"
                            value={inputValues.year || ""}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                            placeholder="Enter year"
                        />
                        <div>Content for movie by year</div>
                    </div>
                );
            case "Actor/cast member profile":
                return (
                    <div className= "query">
                        <input
                            type="text"
                            value={inputValues.actor || ""}
                            onChange={(e) => handleInputChange('actor', e.target.value)}
                            placeholder="Enter actor/cast member"
                        />
                        <div>Content for Actor/cast member profile</div>
                    </div>
                );
            // Add cases for other options
            default:
                return null;
        }
    };




    return(
        <div>
            <Header />
            <h1 className={`message ${!selectedFunctionality ? 'message home' : 'message'}`}>{message}</h1>

            {!selectedFunctionality && (
                <div className="functionalitiesContainer">
                    {Options.map((option, index) => (
                        <button key={index} className="functionality" onClick={() => handleFunctionalityClick(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {selectedFunctionality && (
                <div className="buttonContainer">
                    {renderOptionContent(selectedFunctionality)}
                    <button>Search</button>
                    <button onClick={handleBackToOptions}>Go Back</button>
                </div>
            )}
        </div>
    )
}


export default HomePage;