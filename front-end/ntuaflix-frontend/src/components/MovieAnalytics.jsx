import React from 'react';
import PropTypes from 'prop-types';
import "../styles.css";

const MovieAnalytics = ({ movie, onSearchAgain, onExit }) => {
    return (
        <div className="movie-analytics">
            <div className="movie-header">
                <img src={movie.img_url_asset} alt={movie.originalTitle} className="movie-image"/>
                <div className="movie-details">
                    <h1>{movie.originalTitle} ({movie.startYear})</h1>
                    <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                    <p><strong>Rating:</strong> {movie.rating[0].avRating} ({movie.rating[0].nVotes} votes)</p>
                </div>
            </div>
            <div className="movie-additional-info">
                <div className="aka-titles">
                    <h2>Also Known As</h2>
                    <ul>
                        {movie.titlesAkas.map(aka => (
                            <li key={aka.akaTitle}>{aka.akaTitle} ({aka.regionAbbrev.trim() || 'General'})</li>
                        ))}
                    </ul>
                </div>
                <div className="principal-crew">
                    <h2>Principal Crew</h2>
                    <ul>
                        {movie.principals.map(person => (
                            <li key={person.nameID}>{person.name} - {person.category}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

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
