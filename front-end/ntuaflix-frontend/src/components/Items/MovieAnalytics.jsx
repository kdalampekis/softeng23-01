import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import "../../styles.css";
import axios from "axios";

const BASE_URL = 'https://localhost:9876/ntuaflix_api';


const MovieAnalytics = ({ movie, onSearchAgain, onExit }) => {
    const fullImageUrl = movie.img_url_asset ? movie.img_url_asset.replace('{width_variable}', 'w300') : null;
    const hasImage = movie.img_url_asset && movie.img_url_asset !== "\\N";

    const [likesDislikes, setLikesDislikes] = useState({
        likes: -1,
        dislikes: -1,
        hasLiked: null,
        hasDisliked: null,
    });


    const fetchLikesDislikes = async () => {
        try {
            const token = localStorage.getItem('softeng20bAPI.token');
            // Set up the headers with the auth token
            const headers = {
                'Authorization': `${token}`,
            };
            const response = await axios.get(`${BASE_URL}/title_likes/${movie.tconst}/`, {
                headers: headers,
            });
            setLikesDislikes({
                likes: response.data.likes,
                dislikes: response.data.dislikes,
                hasLiked: response.data.hasLiked,
                hasDisliked: response.data.hasDisliked,
            });
        } catch (error) {
            console.error("Error fetching likes/dislikes", error);
        }
    };

    // useEffect hook for fetching movie likes and dislikes
    useEffect(() => {
        fetchLikesDislikes().then(r => {
            console.log(likesDislikes);
        });
    }, [movie.tconst]);


    const pressLike = async () => {
        if (likesDislikes.hasLiked) {
            alert("You have already liked this movie. Your like has now been removed.");
        }
        try {
            const token = localStorage.getItem('softeng20bAPI.token');
            // Set up the headers with the auth token
            const headers = {
                'Authorization': `${token}`,
            };
            const response = await axios.post(`${BASE_URL}/title_likes/press_like/${movie.tconst}/`, {}, {
                headers: headers,
            });
            await fetchLikesDislikes(); // Refresh likes/dislikes count
        } catch (error) {
            console.error("Error pressing like", error);
        }
    };



    const pressDislike = async () => {
        if (likesDislikes.hasDisliked) {
            alert("You have already disliked this movie. Your dislike has now been removed.");
        }
        try {
            const token = localStorage.getItem('softeng20bAPI.token');
            // Set up the headers with the auth token
            const headers = {
                'Authorization': `${token}`,
            };
            const response = await axios.post(`${BASE_URL}/title_likes/press_dislike/${movie.tconst}/`, {}, {
                headers: headers,
            });
            await fetchLikesDislikes(); // Refresh likes/dislikes count
        } catch (error) {
            console.error("Error pressing dislike", error);
        }
    };



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
                <p className="movie-info">
                    <strong className="dynamic-content">Likes: </strong>
                    <span>
                        {likesDislikes.likes}
                    </span>
                </p>
                <p className="movie-info">
                    <strong className="dynamic-content">Dislikes: </strong>
                    <span>
                        {likesDislikes.dislikes}
                    </span>
                </p>
                {!hasImage && (
                    <div className="buttonContainer addLikeButtons noImage">
                        <button onClick={pressLike}>Like</button>
                        <button onClick={pressDislike}>Dislike</button>
                    </div>
                )}
            </div>
            {hasImage && (
                <div>
                    <div className="movie-analytics-image-container">
                        <img src={fullImageUrl} alt={movie.originalTitle} className="movie-analytics-image"/>
                    </div>
                    <div className="buttonContainer addLikeButtons">
                        <button onClick={pressLike}>Like</button>
                        <button onClick={pressDislike}>Dislike</button>
                    </div>
                </div>
            )}
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
