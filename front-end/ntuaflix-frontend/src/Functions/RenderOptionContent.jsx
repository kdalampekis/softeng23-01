import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const renderOptionContent = (option, inputValues, handleInputChange) => {
    switch(option) {
        case "The N highest rated movies in a genre":
            return (
                <div className="inputContainer query">
                    <input
                        type="number"
                        value={inputValues.numberOfMovies || ""}
                        onChange={(e) => handleInputChange('numberOfMovies', e.target.value)}
                        placeholder="Enter number of movies"
                        required
                    />
                    <input
                        type="text"
                        value={inputValues.genre || ""}
                        onChange={(e) => handleInputChange('genre', e.target.value)}
                        placeholder="Enter genre"
                        required
                    />
                </div>
            );
        case "Highest rated movie of an actor/cast member":
            return (
                <div className="query">
                    <input
                        type="text"
                        value={inputValues.actor || ""}
                        onChange={(e) => handleInputChange('actor', e.target.value)}
                        placeholder="Enter actor/cast member"
                        required
                    />
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
                        required
                    />
                </div>
            );
        case "The N highest rated movies of an actor/cast member":
            return (
                <div className="inputContainer query">
                    <input
                        type="number"
                        value={inputValues.numberOfMovies || ""}
                        onChange={(e) => handleInputChange('numberOfMovies', e.target.value)}
                        placeholder="Enter number of movies"
                        required
                    />
                    <input
                        type="text"
                        value={inputValues.actor || ""}
                        onChange={(e) => handleInputChange('actor', e.target.value)}
                        placeholder="Enter actor/cast member"
                        required
                    />
                </div>
            );
        case "Search movies by actor/cast member":
            return (
                <div className="query">
                    <input
                        type="text"
                        value={inputValues.actor || ""}
                        onChange={(e) => handleInputChange('actor', e.target.value)}
                        placeholder="Enter actor/cast member"
                        required
                    />
                </div>
            );
        case "Search movies by genre":
            return (
                <div className= "query">
                    <input
                        type="text"
                        value={inputValues.genre || ""}
                        onChange={(e) => handleInputChange('genre', e.target.value)}
                        placeholder="Enter genre"
                        required
                    />
                </div>
            );
        case "Search movie by title":
            return (
                <div className= "query">
                    <input
                        type="text"
                        value={inputValues.movieTitle || ""}
                        onChange={(e) => handleInputChange('movieTitle', e.target.value)}
                        placeholder="Enter movie title"
                        required
                    />
                </div>
            );
        case "Search movies by year":
            return (
                <div className= "query">
                    <input
                        type="number"
                        value={inputValues.movieYear || ""}
                        onChange={(e) => handleInputChange('movieYear', e.target.value)}
                        placeholder="Enter year"
                        required
                    />
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
                        required
                    />
                </div>
            );
        // Add cases for other options
        default:
            return null;
    }
};

export default renderOptionContent;