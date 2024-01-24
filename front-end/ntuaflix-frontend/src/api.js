import axios from 'axios';
import {findByLabelText} from "@testing-library/react";

const BASE_URL = 'http://127.0.0.1:9876/ntuaflix_api';

export const searchNBestRatedGenre = async (genre, number) => {
    try {
        const response = await axios.get(`${BASE_URL}/SearchByGenre/`, {
            params: {
                genre: genre,
                number: number,
                toprated: 'true'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throwing the error to handle it where the function is called
    }
};


export const searchHighestRatedMovieOfActor = async (actorName, number = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/SearchByName/`, {
            params: {
                name: actorName,
                toprated: 'true',
                number: number
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchByActorNewest = async (actorName) => {
    try {
        const response = await axios.get(`${BASE_URL}/SearchByName/`, {
            params: {
                name: actorName,
                newest: 'true',
                number: '1' // maybe change
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchByActorNTopRated = async (actorName, numberOfMovies) => {
    try {
        const response = await axios.get(`${BASE_URL}/SearchByName/`, {
            params: {
                name: actorName,
                toprated: 'true',
                number: numberOfMovies
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchMoviesByActor = async (actorName) => {
    try {
        const response = await axios.get(`${BASE_URL}/SearchByName/`, {
            params: {
                name: actorName
                // No 'toprated' or 'newest' parameter here
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchMoviesByGenre = async (genre, number, toprated) => {
    try {
        const response = await axios.get(`${BASE_URL}/SearchByGenre/`, {
            params: {
                genre: genre,
                number: number,
                toprated: toprated,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchMoviesByYear = async (year) => {
    try {
        const response = await axios.get(`${BASE_URL}/SearchByYear/`, {
            params: {
                year: year
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// api.js
// api.js
export const searchMovieByTitle = async (movieTitle) => {
    try {
        const response = await axios.get(`${BASE_URL}/searchtitle/`, {
            params: {
                title: movieTitle
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


