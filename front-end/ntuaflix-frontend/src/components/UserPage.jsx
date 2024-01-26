import React, { useState } from "react";
import Header from "./Header";
import "../styles.css";
import renderOptionContent from "../Functions/RenderOptionContent";
import Footer from "./Footer";
import UserOptions from "../constants/UserOptions";
import DynamicHeader from "./DynamicHeader";
import MoviesDisplay from "../Functions/MoviesDisplay";
import useSearch from "../Functions/useSearch";
import MovieAnalytics from "./Items/MovieAnalytics";
import ActorsDisplay from "../Functions/ActorsDisplay";
import ActorAnalytics from "./Items/ActorAnalytics"; // Import ActorAnalytics if you've created it

export default function UserPage() {
    const [selectedFunctionality, setSelectedFunctionality] = useState(null);
    const [inputValues, setInputValues] = useState({
        genre: '',
        numberOfMovies: '',
        actor: '',
        movieTitle: '',
        movieYear: ''
    });
    const [genre, setGenre] = useState('a genre');
    const [numberOfMovies, setNumberOfMovies] = useState('N');
    const [actor, setActor] = useState('actor/cast member');
    const [movieTitle, setMovieTitle] = useState("movie");
    const [movieYear, setMovieYear] = useState("year");
    const [searchButtonText, setSearchButtonText] = useState("Search");

    const { moviesData, actorsData, searchPerformed, handleSearch, updateSearchPerformed } = useSearch();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedActor, setSelectedActor] = useState(null);

    const functionalityInputRequirements = {
        "The N highest rated movies in a genre": ['numberOfMovies', 'genre'],
        "Highest rated movie of an actor/cast member": ['actor'],
        "Add a like/dislike to a movie": ['movieTitle'],
        "Most recent movie of an actor/cast member": ['actor'],
        "The N highest rated movies of an actor/cast member": ['numberOfMovies', 'actor'],
        "Search movies by actor/cast member": ['actor'],
        "Search movies by genre": ['genre'],
        "Movie analytics": ['movieTitle'],
        "Search movies by year": ['movieYear'],
        "Actor/cast member profile": ['actor'],
    };
    const isSearchButtonDisabled = () => {
        if (!selectedFunctionality) return true;

        const requiredInputs = functionalityInputRequirements[selectedFunctionality];
        if (!requiredInputs) return true;

        return requiredInputs.some(input => !inputValues[input]);
    };




    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

    const handleActorSelect = (actor) => {
        setSelectedActor(actor);
    };

    const resetInputFields = () => {
        setInputValues({
            genre: '',
            numberOfMovies: '',
            actor: '',
            movieTitle: '',
            movieYear: ''
        });
        setGenre('a genre');
        setNumberOfMovies('N');
        setActor('actor/cast member');
        setMovieTitle('movie');
        setMovieYear('year');
    };

    const handleInputChange = (name, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
        if (name === 'genre') setGenre(value || 'genre');
        else if (name === 'numberOfMovies') setNumberOfMovies(value || 'N');
        else if (name === 'actor') setActor(value || "actor/cast member");
        else if (name === 'movieTitle') setMovieTitle(value || "movie");
        else if (name === 'movieYear') setMovieYear(value || "year");
    };

    const handleFunctionalityClick = (option) => {
        setSelectedFunctionality(option);
        setSearchButtonText(option === "Add a like/dislike to a movie" ? "Add" : "Search");
    };

    const handleExit = () => {
        setSearchButtonText("Search");
        setSelectedFunctionality(null);
        updateSearchPerformed(false);
        resetInputFields();
        setSelectedMovie(null);
        setSelectedActor(null);
    };

    const handleSearchAgain = () => {
        updateSearchPerformed(false);
        resetInputFields();
        setSelectedMovie(null);
        setSelectedActor(null);
    };

    const handleGoBack = () => {
        setSelectedMovie(null);
        setSelectedActor(null);
    };


    return (
        <div className="body">
            <Header />
            {!selectedMovie && !selectedActor && (
                <DynamicHeader
                    selectedFunctionality={selectedFunctionality}
                    numberOfMovies={numberOfMovies}
                    genre={genre}
                    actor={actor}
                    movieTitle={movieTitle}
                    movieYear={movieYear}
                />
            )}

            {(!selectedActor && !selectedMovie) ? (
                searchPerformed && (
                    selectedFunctionality === "Actor/cast member profile" ? (
                        <ActorsDisplay
                            actorsData={actorsData}
                            onSelectActor={handleActorSelect}
                        />
                    ) : (
                        <MoviesDisplay
                            moviesData={moviesData}
                            onSearchAgain={handleSearchAgain}
                            onExit={handleExit}
                            onSelectMovie={handleMovieSelect}
                        />
                    )
                )
            ) : selectedActor ? (
                <ActorAnalytics actor={selectedActor} onSearchAgain={handleSearchAgain} onExit={handleExit} />
            ) : (
                <MovieAnalytics movie={selectedMovie} onSearchAgain={handleSearchAgain} onExit={handleExit} />
            )}

            {!searchPerformed && (
                <>
                    {!selectedFunctionality && (
                        <div className="functionalitiesContainer">
                            {UserOptions.map((option, index) => (
                                <button key={index} className="functionality" onClick={() => handleFunctionalityClick(option)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                    {selectedFunctionality && (
                        <div className="buttonContainer">
                            {renderOptionContent(selectedFunctionality, inputValues, handleInputChange)}
                            <button onClick={() => handleSearch(selectedFunctionality, inputValues)}
                                    disabled={isSearchButtonDisabled()}>{searchButtonText}</button>
                            <button onClick={handleExit}>Go Back</button>
                        </div>
                    )}
                </>
            )}

            {searchPerformed && (
                <div className="buttonContainer">
                    <button onClick={handleSearchAgain}>Search Again</button>
                    {(selectedMovie || selectedActor) && (
                        <button onClick={handleGoBack}>Go Back</button>
                    )}
                    <button onClick={handleExit}>Exit</button>
                </div>
            )}

            <Footer role="user" />
        </div>
    );
}
