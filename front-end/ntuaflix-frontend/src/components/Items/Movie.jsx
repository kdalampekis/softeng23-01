// Movie.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../../styles.css";

const Movie = ({ title, genres, year, imgUrl, onClick }) => {
    const [hover, setHover] = useState(false);
    const fullImageUrl = imgUrl ? imgUrl.replace('{width_variable}', 'w300') : null;
    const hasImage = imgUrl && imgUrl !== "\\N";

    return (
        <div
            className={`movie ${!hasImage ? 'full-width' : ''}`}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {hasImage && (
                <img src={fullImageUrl} alt={title} className="movie-image"/>
            )}
            <div className={`movie-details ${!hasImage ? 'full-width' : ''}`}>
                <h3 className={`movie-title ${hover ? 'hover' : 'dynamic-content'}`}>{title}</h3>
                <p className="movie-genres">{genres.join(', ')}</p>
                <p className="movie-year">{year}</p>
            </div>
        </div>
    );
};

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.number,
    imgUrl: PropTypes.string, // Note that imgUrl is optional
    onClick: PropTypes.func
};

export default Movie;
