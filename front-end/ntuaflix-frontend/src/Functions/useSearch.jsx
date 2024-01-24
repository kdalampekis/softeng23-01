import { useState, useCallback } from 'react';
import { searchByGenre } from "../api";
import {searchHighestRatedMovieOfActor} from "../api";
import {searchByActorNewest} from "../api";

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
                const movies = await searchByGenre(inputValues.genre, inputValues.numberOfMovies);
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
        // Add more cases as needed
    }, []);

    // Return this function along with other values
    return { moviesData, searchPerformed, handleSearch, updateSearchPerformed };
};

export default useSearch;