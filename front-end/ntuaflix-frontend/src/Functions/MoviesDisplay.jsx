import React from 'react';
import PropTypes from 'prop-types';
import Movie from "../components/Movie"; // Adjust the path as necessary

const MoviesDisplay = ({ moviesData, onSearchAgain, onExit }) => {
    return (
        <div>
            <div className="functionalitiesContainer moviesContainer">
                {moviesData.length === 0
                    ? <p>No movies found.</p>
                    : moviesData.map((movie, index) => (
                        <Movie
                            key={index}
                            title={movie.originalTitle}
                            genres={movie.genres}
                            year={movie.startYear}
                        />
                    ))
                }
            </div>
            <div className="buttonContainer">
                <button onClick={onSearchAgain}>Search Again</button>
                <button onClick={onExit}>Exit</button>
            </div>
        </div>
    );
};

MoviesDisplay.propTypes = {
    moviesData: PropTypes.array.isRequired,
    onSearchAgain: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired
};

export default MoviesDisplay;
