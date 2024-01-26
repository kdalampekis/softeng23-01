import React from 'react';
import PropTypes from 'prop-types';
import "../../styles.css";

const MovieAnalytics = ({ movie, onSearchAgain, onExit }) => {
    const fullImageUrl = movie.img_url_asset ? movie.img_url_asset.replace('{width_variable}', 'w300') : null;
    const hasImage = movie.img_url_asset && movie.img_url_asset !== "\\N";

    return (
        <div className="movie-analytics-container">
            <div className={`movie-analytics-content ${!hasImage ? 'full-width' : ''}`}>
                <h1 className=" movie-header">{movie.originalTitle} ({movie.startYear})</h1>
                <p><strong className="dynamic-content">Genres:</strong> {movie.genres.join(', ')}</p>
                <p><strong
                    className="dynamic-content">Rating:</strong> {movie.rating[0].avRating} ({movie.rating[0].nVotes} votes)
                </p>
                <p className="movie-info">
                    <strong className="dynamic-content">Also known as: </strong>
                    <span>
                        {movie.titlesAkas.map((aka, index) => (
                            <span key={`${aka.akaTitle}-${index}`}>
                                {index > 0 && ", "}
                                {aka.akaTitle} ({aka.regionAbbrev.trim() || 'General'})
                            </span>
                        ))}
                    </span>
                </p>
                <p className="movie-info">
                    <strong className="dynamic-content">Principal crew: </strong>
                    <span>
                        {movie.principals.map((person, index) => (
                            <span key={`${person.nameID}-${index}`}>
                                {index > 0 && ", "}
                                {person.name} ({person.category})
                            </span>
                        ))}
                    </span>
                </p>
                {!hasImage && (
                    <div className="buttonContainer addLikeButtons noImage">
                        <button>Like</button>
                        <button>Dislike</button>
                    </div>
                )}
            </div>
            {hasImage && (
                <div>
                    <div className="movie-analytics-image-container">
                        <img src={fullImageUrl} alt={movie.originalTitle} className="movie-analytics-image"/>
                    </div>
                    <div className="buttonContainer addLikeButtons">
                        <button>Like</button>
                        <button>Dislike</button>
                    </div>
                </div>
            )}
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
