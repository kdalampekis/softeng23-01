import React from 'react';
import PropTypes from 'prop-types';
import "../styles.css";

const MovieAnalytics = ({ movie, onSearchAgain, onExit }) => {
    return (
        <div className="movie-analytics">
            <h1 className="dynamic-content movie-header">{movie.originalTitle} ({movie.startYear})</h1>
            <div className="movie-details">
                <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                <p><strong>Rating:</strong> {movie.rating[0].avRating} ({movie.rating[0].nVotes} votes)</p>
                <p className="movie-info">
                    <strong>Also known as: </strong>
                    <span>
                        {movie.titlesAkas.map((aka, index) => (
                            <span key={aka.akaTitle}>
                                {index > 0 && ", "}
                                {aka.akaTitle} ({aka.regionAbbrev.trim() || 'General'})
                            </span>
                        ))}
                    </span>
                </p>
                <p className="movie-info">
                    <strong>Principal crew: </strong>
                    <span>
                        {movie.principals.map((person, index) => (
                            <span key={index}>
                                {index > 0 && ", "}
                                {person.name} ({person.category})
                            </span>
                        ))}
                    </span>
                </p>
            </div>
            <div className="buttonContainer addLikeButtons">
                <button>Like</button>
                <button>Dislike</button>
            </div>
        </div>
    );
};

// PropTypes and default export are the same as before...


MovieAnalytics.propTypes = {
    movie: PropTypes.shape({
        originalTitle: PropTypes.string.isRequired,
        img_url_asset: PropTypes.string,
        startYear: PropTypes.number,
        genres: PropTypes.arrayOf(PropTypes.string),
        titlesAkas: PropTypes.arrayOf(PropTypes.shape({
            akaTitle: PropTypes.string,
            regionAbbrev: PropTypes.string
        })),
        principals: PropTypes.arrayOf(PropTypes.shape({
            nameID: PropTypes.string, // Updated to string
            name: PropTypes.string,
            category: PropTypes.string,
        })),
        rating: PropTypes.arrayOf(PropTypes.shape({
            avRating: PropTypes.number,
            nVotes: PropTypes.number
        }))
    }).isRequired,
    onSearchAgain: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired
};

export default MovieAnalytics;
