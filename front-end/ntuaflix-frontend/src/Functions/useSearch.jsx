import { useState, useCallback } from 'react';
import {searchNBestRatedGenre } from "../api";
import {searchHighestRatedMovieOfActor} from "../api";
import {searchByActorNewest} from "../api";
import {searchByActorNTopRated} from "../api";
import {searchMoviesByActor} from "../api";
import {searchMoviesByGenre} from "../api";
import {searchMoviesByYear} from "../api";
import {searchMovieByTitle} from "../api";

const useSearch = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    // Function to update searchPerformed state
    const updateSearchPerformed = (value) => {
        setSearchPerformed(value);
    };

    const handleSearch = useCallback(async (selectedFunctionality, inputValues) => {
        if (selectedFunctionality === "The N highest rated movies in a genre") {
            try {
                const movies = await searchNBestRatedGenre(inputValues.genre, inputValues.numberOfMovies);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Highest rated movie of an actor/cast member") {
            try {
                const movies = await searchHighestRatedMovieOfActor(inputValues.actor);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Most recent movie of an actor/cast member") {
            try {
                const movies = await searchByActorNewest(inputValues.actor);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "The N highest rated movies of an actor/cast member") {
            try {
                const movies = await searchByActorNTopRated(inputValues.actor, inputValues.numberOfMovies);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Search movies by actor/cast member") {
            try {
                const movies = await searchMoviesByActor(inputValues.actor);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Search movies by genre") {
            try {
                const movies = await searchMoviesByGenre(inputValues.genre);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Search movies by year") {
            try {
                const movies = await searchMoviesByYear(inputValues.year);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Movie analytics" || selectedFunctionality === "Add a like/dislike to a movie") {
            try {
                const movieDetails = await searchMovieByTitle(inputValues.movieTitle);
                setMoviesData(movieDetails); // Adjust this according to the expected response format
                setSearchPerformed(true);
                console.log("Movie Details:", movieDetails);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        }
        // Add more cases as needed
    }, []);

    // Return this function along with other values
    return { moviesData, searchPerformed, handleSearch, updateSearchPerformed };
};

export default useSearch;
