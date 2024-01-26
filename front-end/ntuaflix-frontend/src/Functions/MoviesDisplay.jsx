// MoviesDisplay.js

import React from 'react';
import PropTypes from 'prop-types';
import Movie from "../components/Items/Movie"; // Make sure this path is correct

const MoviesDisplay = ({ moviesData, onSelectMovie }) => {
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
                        imgUrl={movie.img_url_asset}
                        onClick={() => onSelectMovie(movie)}
                    />
                ))
            }
        </div>
    );
};

MoviesDisplay.propTypes = {
    moviesData: PropTypes.array.isRequired,
    onSelectMovie: PropTypes.func.isRequired
    // Removed the unused onSearchAgain and onExit functions from propTypes
};

export default MoviesDisplay;
