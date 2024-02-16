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

// Utility function to convert CSV to JSON
function csvToJson(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
    });
}


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
                const movies = await searchNBestRatedGenre(inputValues.genre, inputValues.numberOfMovies, inputValues.format);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Highest rated movie of an actor/cast member") {
            try {
                const movies = await searchHighestRatedMovieOfActor(inputValues.actor, inputValues.format);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Most recent movie of an actor/cast member") {
            try {
                const movies = await searchByActorNewest(inputValues.actor, inputValues.format);
                console.log(inputValues.format);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "The N highest rated movies of an actor/cast member") {
            try {
                const movies = await searchByActorNTopRated(inputValues.actor, inputValues.numberOfMovies, inputValues.format);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Search movies by actor/cast member") {
            try {
                const movies = await searchMoviesByActor(inputValues.actor, inputValues.format);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Search movies by genre") {
            try {
                const movies = await searchMoviesByGenre(inputValues.genre, inputValues.format);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Search movies by year") {
            try {
                const movies = await searchMoviesByYear(inputValues.movieYear, inputValues.format);
                setMoviesData(movies);
                setSearchPerformed(true);
                console.log("Movies:", movies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        else if (selectedFunctionality === "Search movie by title") {
            try {
                const movie = await searchMovieByTitle(inputValues.movieTitle, inputValues.format);
                setMoviesData(movie);
                setSearchPerformed(true);
                console.log("Movie Details:", movie);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        }
        else if (selectedFunctionality === "Actor/cast member profile") {
            try {
                const actors = await searchByActorName(inputValues.actor, inputValues.format);
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
