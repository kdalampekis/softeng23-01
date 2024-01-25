import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Movie from "../components/Items/Movie"; // Adjust the path as necessary

const MoviesDisplay = ({ moviesData, onSearchAgain, onExit, onSelectMovie }) => {
    return (
        <div className="functionalitiesContainer moviesContainer">
            {moviesData.length === 0
                ? <p>No movies found.</p>
                : moviesData.map((movie, index) => (
                    <Movie
                        key={`${movie.tconst}-${index}`}
                        title={movie.originalTitle}
                        genres={movie.genres}
                        year={movie.startYear}
                        onClick={() => onSelectMovie(movie)}
                    />
                ))
            }
        </div>
    );
};

MoviesDisplay.propTypes = {
    moviesData: PropTypes.array.isRequired,
    onSearchAgain: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    onSelectMovie: PropTypes.func.isRequired
};

export default MoviesDisplay;
