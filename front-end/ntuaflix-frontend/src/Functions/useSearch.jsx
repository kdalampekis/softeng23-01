import { useState, useCallback } from 'react';
import {searchNBestRatedGenre } from "../api";
import {searchHighestRatedMovieOfActor} from "../api";
import {searchByActorNewest} from "../api";
import {searchByActorNTopRated} from "../api";
import {searchMoviesByActor} from "../api";
import {searchMoviesByGenre} from "../api";
import {searchMoviesByYear} from "../api";
import {searchMovieByTitle} from "../api";
import {searchByActorName} from "../api";

const useSearch = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [actorsData, setActorsData] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    // Function to update searchPerformed state
    const updateSearchPerformed = (value) => {
        setSearchPerformed(value);
    };

    const handleSearch = useCallback(async (selectedFunctionality, inputValues) => {
        setMoviesData([]);
        setActorsData([]);

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
                const movies = await searchMoviesByYear(inputValues.movieYear);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Movie analytics" || selectedFunctionality === "Add a like/dislike to a movie") {
            try {
                const movie = await searchMovieByTitle(inputValues.movieTitle);
                setMoviesData(movie);
                setSearchPerformed(true);
                console.log("Movie Details:", movie);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        }
        else if (selectedFunctionality === "Actor/cast member profile") {
            try {
                const actors = await searchByActorName(inputValues.actor);
                setActorsData(actors);
                setSearchPerformed(true);
                console.log("Actor Details:", actors);
            } catch (error) {
                console.error("Error fetching actors:", error);
            }
        }
        // ... other functionality cases
    }, []);// Add more cases as needed

    // Return this function along with other values
    return { moviesData, actorsData, searchPerformed, handleSearch, updateSearchPerformed };
};

export default useSearch;
