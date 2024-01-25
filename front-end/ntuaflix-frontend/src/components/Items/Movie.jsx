import React from 'react';
import PropTypes from 'prop-types';
import "../../styles.css";
import {useState} from "react";

const Movie = ({ title, genres, year, onClick }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="functionality movie"
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <h3 className={`movie-title ${hover ? '' : 'dynamic-content'}`}>{title}</h3>
            <p className="movie-genres">{genres.join(', ')}</p>
            <p className="movie-year">{year}</p>
        </div>
    );
};

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.number,
    onClick: PropTypes.func
};

export default Movie;
