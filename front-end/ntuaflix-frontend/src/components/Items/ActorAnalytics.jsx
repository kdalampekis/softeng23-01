import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "../../styles.css";
import { searchMovieByTitleID } from "../../api";

const ActorAnalytics = ({ actor, onSearchAgain, onExit }) => {
    const [filmography, setFilmography] = useState([]);
    const fullImageUrl = actor.imgUrl ? actor.imgUrl.replace('{width_variable}', 'w300') : null;
    const hasImage = actor.imgUrl && actor.imgUrl !== "\\N";


    useEffect(() => {
        let isMounted = true; // flag to handle async operations for mounted component only

        const fetchMovieTitles = async () => {
            try {
                const filmographyWithTitles = await Promise.all(
                    actor.nameTitles.map(async (title) => {
                        const response = await searchMovieByTitleID(title.titleID);
                        const movieDetails = response[0]; // Assuming the response is an array
                        console.log("movieDetails: ", movieDetails);
                        return {
                            ...title,
                            movieTitle: movieDetails?.originalTitle || 'Title not found',
                        };
                    })
                );
                if (isMounted) {
                    setFilmography(filmographyWithTitles);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching movie titles:', error);
                }
            }
        };

        fetchMovieTitles();

        // Cleanup function to set isMounted false when the component unmounts
        return () => {
            isMounted = false;
        };
    }, [actor.nameTitles]); // Add the missing dependency array here

    return (
        <div className="actor-analytics-container">
            <div className="actor-analytics-content">
                <h1 className="actor-header">{actor.primaryName}</h1>
                <p><strong className="dynamic-content">Profession:</strong> {actor.primaryProfession.split(',').join(', ')}</p>
                <p><strong className="dynamic-content">Birth Year:</strong> {actor.birthYear}</p>
                <p><strong className="dynamic-content">Death Year:</strong> {actor.deathYear}</p>
                <p className="actor-info">
                    <strong className="dynamic-content">Filmography: </strong>
                    <span>
                        {filmography.map((movie, index) => (
                            <span key={`${movie.titleID}-${index}`}>
                                {index > 0 && ", "}
                                {movie.movieTitle} ({movie.category})
                            </span>
                        ))}
                    </span>
                </p>
            </div>
            {hasImage && (
                <div className="actor-analytics-image-container">
                    <img src={fullImageUrl} alt={actor.primaryName} className="actor-analytics-image"/>
                </div>
            )}
        </div>
    );
};

ActorAnalytics.propTypes = {
    actor: PropTypes.shape({
        primaryName: PropTypes.string.isRequired,
        imgUrl: PropTypes.string,
        birthYear: PropTypes.number,
        deathYear: PropTypes.number,
        primaryProfession: PropTypes.string,
        nameTitles: PropTypes.arrayOf(PropTypes.shape({
            titleID: PropTypes.string,
            category: PropTypes.string
        }))
    }).isRequired,
    onSearchAgain: PropTypes.func,
    onExit: PropTypes.func
};

export default ActorAnalytics;
