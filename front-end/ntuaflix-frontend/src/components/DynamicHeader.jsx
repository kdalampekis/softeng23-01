import React from 'react';
import PropTypes from 'prop-types';

const DynamicHeader = ({ selectedFunctionality, numberOfMovies, genre, actor, movieTitle, movieYear }) => {

    return (
        <h1 className={`message ${!selectedFunctionality ? 'home' : ''}`}>
            {!selectedFunctionality && "How can Ntuaflix help you today?"}

            {selectedFunctionality === "The N highest rated movies in a genre" &&
                <span>
                        Find the <span className="dynamic-content">{numberOfMovies} </span>
                        highest rated movies in <span className="dynamic-content">{genre}</span>
                    </span>
            }

            {selectedFunctionality === "Highest rated movie of an actor/cast member" && (
                <span>
                        Highest rated movie of <span className="dynamic-content">{actor}</span>
                    </span>
            )}


            {selectedFunctionality === "Most recent movie of an actor/cast member" && (
                <span>
                        Most recent movie of <span className="dynamic-content">{actor}</span>
                    </span>
            )}

            {selectedFunctionality === "The N highest rated movies of an actor/cast member" && (
                <span>
                        Find the <span className="dynamic-content">{numberOfMovies} </span>
                        highest rated movies of <span className="dynamic-content">{actor}</span>
                    </span>
            )}

            {selectedFunctionality === "Search movies by actor/cast member" && (
                <span>
                        Search movies with <span className="dynamic-content">{actor}</span>
                    </span>
            )}

            {selectedFunctionality === "Search movies by genre" && (
                <span>
                        Search <span className="dynamic-content">{genre}</span> movies
                    </span>
            )}

            {selectedFunctionality === "Search movie by title" && (
                <span>
                    Search movie by title <span className="dynamic-content">{movieTitle}</span>
                </span>
            )}

            {selectedFunctionality === "Search movies by year" && (
                <span>
                        Search movies published in <span className="dynamic-content">{movieYear}</span>
                    </span>
            )}

            {selectedFunctionality === "Actor/cast member profile" && (
                <span>
                    Dive into the profile of <span className="dynamic-content">{actor}</span>
                </span>
            )}

        </h1>
    );
};

DynamicHeader.propTypes = {
    selectedFunctionality: PropTypes.string,
    numberOfMovies: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    genre: PropTypes.string,
    actor: PropTypes.string,
    movieYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};


export default DynamicHeader;