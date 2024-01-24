import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/ntuaflix_api';

export const searchByGenre = async (genre, number) => {
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
