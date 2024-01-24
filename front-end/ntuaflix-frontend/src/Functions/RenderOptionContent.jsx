import React from "react";

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
                    />
                    <input
                        type="text"
                        value={inputValues.genre || ""}
                        onChange={(e) => handleInputChange('genre', e.target.value)}
                        placeholder="Enter genre"
                    />
                    <div>Content for N highest rated movies in a genre</div>
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
        case "The N highest rated movies of an actor/cast member":
            return (
                <div className="inputContainer query">
                    <input
                        type="number"
                        value={inputValues.numberOfMovies || ""}
                        onChange={(e) => handleInputChange('numberOfMovies', e.target.value)}
                        placeholder="Enter number of movies"
                    />
                    <input
                        type="text"
                        value={inputValues.actor || ""}
                        onChange={(e) => handleInputChange('actor', e.target.value)}
                        placeholder="Enter actor/cast member"
                    />
                    <div>Content for N highest rated movies by actor/cast member</div>
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
                    />
                    <div>Content for movie by actor/cast member</div>
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
        case "Search movies by year":
            return (
                <div className= "query">
                    <input
                        type="number"
                        value={inputValues.movieYear || ""}
                        onChange={(e) => handleInputChange('movieYear', e.target.value)}
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

export default renderOptionContent;