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
        // Update state based on input name
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

    const isSearchButtonDisabled = () => {
        // Logic to determine if the search button should be disabled
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

            {!selectedActor && !selectedMovie ? (
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
                    <button onClick={handleExit}>Exit</button>
                </div>
            )}

            <Footer role="user" />
        </div>
    );
}
