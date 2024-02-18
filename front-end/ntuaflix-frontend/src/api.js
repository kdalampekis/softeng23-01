import axios from 'axios';


const BASE_URL = 'https://127.0.0.1:9876/ntuaflix_api';

export const searchNBestRatedGenre = async (genre, number, format) => {
    format = format || 'json'; // If format is not provided, default to 'json'
    try {
        const response = await axios.get(`${BASE_URL}/SearchByGenre?format=${format}`, {
            params: {
                genre: genre,
                number: number,
                toprated: 'true',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throwing the error to handle it where the function is called
    }
};


export const searchHighestRatedMovieOfActor = async (actorName, number = 1, format) => {
    format = format || 'json'; // If format is not provided, default to 'json'
    try {
        const response = await axios.get(`${BASE_URL}/SearchByName/?format=${format}`, {
            params: {
                name: actorName,
                toprated: 'true',
                number: number,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchByActorNewest = async (actorName, format) => {
    format = format || 'json'; // If format is not provided, default to 'json'
    try {
        const response = await axios.get(`${BASE_URL}/SearchByName/?format=${format}`, {
            params: {
                name: actorName,
                newest: 'true',
                number: '1', // maybe change
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchByActorNTopRated = async (actorName, numberOfMovies, format) => {
    format = format || 'json'; // If format is not provided, default to 'json'
    try {
        const response = await axios.get(`${BASE_URL}/SearchByName/?format=${format}`, {
            params: {
                name: actorName,
                toprated: 'true',
                number: numberOfMovies,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchMoviesByActor = async (actorName, format) => {
    format = format || 'json'; // If format is not provided, default to 'json'
    try {
        const response = await axios.get(`${BASE_URL}/SearchByName/?format=${format}`, {
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

export const searchMoviesByGenre = async (genre, number, toprated, format) => {
    format = format || 'json'; // If format is not provided, default to 'json'
    try {
        let url = `${BASE_URL}/SearchByGenre`;
        const token = localStorage.getItem('softeng20bAPI.token');
        // Set up the headers with the auth token
        const headers = {
            'Authorization': `${token}`,
        };
        if (format === 'json') {
            headers['Content-Type'] = 'application/json';
            headers['Accept'] = 'application/json';
        } else if (format === 'csv') {
            headers['Content-Type'] = 'text/csv';
            headers['Accept'] = 'text/csv';
        } else {
            console.error('Invalid format specified:', format);
            return;
        }
        url += `&?format=${format}`;
        const response = await axios.get(`${url}`, {
            params: {
                genre: genre,
                number: number,
                toprated: toprated,
                // format: format
            },
            headers : headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchMoviesByYear = async (movieYear, format) => {
    format = format || 'json'; // If format is not provided, default to 'json'
    try {
        const token = localStorage.getItem('softeng20bAPI.token');
        // Set up the headers with the auth token
        const headers = {
            'Authorization': `${token}`,
        };
        const response = await axios.get(`${BASE_URL}/SearchByYear/?format=${format}`, {
            params: {
                year: movieYear,
            },
            headers : headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchMovieByTitle = async (movieTitle, format) => {
    format = format || 'json'; // If format is not provided, default to 'json'
    try {
        const token = localStorage.getItem('softeng20bAPI.token');
        // Set up the headers with the auth token
        const headers = {
            'Authorization': `${token}`,
        };

        const response = await axios.get(`${BASE_URL}/searchtitle/?format=${format}`, {
            params: {
                title: movieTitle,
            },
            headers: headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchByActorName = async (actorName, format) => {
    format = format || 'json'; // If format is not provided, default to 'json'
    try {
        const token = localStorage.getItem('softeng20bAPI.token');
        // Set up the headers with the auth token
        const headers = {
            'Authorization': `${token}`,
        };
        const response = await axios.get(`${BASE_URL}/searchname/?format=${format}`, {
            params: {
                name: actorName,
            },
            headers : headers,
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchMovieByTitleID = async (titleID) => {
    try {
        const token = localStorage.getItem('softeng20bAPI.token');
        // Set up the headers with the auth token
        const headers = {
            'Authorization': `${token}`,
        };
        const response = await axios.get(`${BASE_URL}/title/${titleID.toString()}/`,{headers : headers});
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const searchUserByUsername = async (username) => {
    try {
        const token = localStorage.getItem('softeng20bAPI.token');
        // Set up the headers with the auth token
        const headers = {
            'Authorization': `${token}`,
        };
        const response = await axios.get(`${BASE_URL}/admin/users/${username}/`, { headers: headers });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};