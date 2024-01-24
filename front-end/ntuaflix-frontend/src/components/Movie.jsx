import React from 'react';
import PropTypes from 'prop-types';
import "../styles.css";

const Movie = ({ title, genres, year, image }) => {
    return (
        <div className="functionality movie">
            <img src={image} alt={title} className="movie-image" />
            <div className="movie-info">
                <h3 className="movie-title">{title}</h3>
                <p className="movie-genres">{genres.join(', ')}</p>
                <p className="movie-year">{year}</p>
            </div>
        </div>
    );
};

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.number, // Updated to expect a number
    image: PropTypes.string
};

export default Movie;
