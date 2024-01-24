import React, {useState} from "react";
import Header from "./Header";
import "../styles.css";
import renderOptionContent from "../Functions/RenderOptionContent";
import Footer from "./Footer";
import UserOptions from "../constants/UserOptions";
import DynamicHeader from "./DynamicHeader";
import MoviesDisplay from "../Functions/MoviesDisplay";
import useSearch from "../Functions/useSearch";


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

    const { moviesData, searchPerformed, handleSearch, updateSearchPerformed } = useSearch();


    // Function to reset input fields
    const resetInputFields = () => {
        setInputValues({
            genre: '',
            numberOfMovies: '',
            actor: '',
            movieTitle: '',
            movieYear: ''
        });
        // Reset additional state if necessary
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

    // Changes the search-button text depending on the functionality
    const handleFunctionalityClick = (option) => {
        setSelectedFunctionality(option);
        if (option === "Add a like/dislike to a movie") {
            setSearchButtonText("Add");
        }
        else if (option === "Movie analytics" || option === "Actor/cast member profile") {
            setSearchButtonText("Dive")
        }
        else setSearchButtonText("Search");
    };

    // Function to handle "Exit" button click
    const handleExit = () => {
        setSearchButtonText("Search");
        setSelectedFunctionality(null);
        updateSearchPerformed(false);
        resetInputFields();
    };

    // Function to handle "Search Again" button click
    const handleSearchAgain = () => {
        updateSearchPerformed(false);
        resetInputFields();
    };

    // Disables the search-button if the user has not filled all the inputs
    const isSearchButtonDisabled = () => {
        // return !inputValues.genre.trim() || !inputValues.numberOfMovies.trim();
    };



    return (
        <div className="body">
            <Header/>
            <DynamicHeader
                selectedFunctionality={selectedFunctionality}
                numberOfMovies={numberOfMovies}
                genre={genre}
                actor={actor}
                movieTitle={movieTitle}
                movieYear={movieYear}
            />

            {searchPerformed && (
                <MoviesDisplay
                    moviesData={moviesData}
                    onSearchAgain={handleSearchAgain}
                    onExit={handleExit}
                />
            )}

            {/* If a search has NOT been performed, render options and search controls */}
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

            <Footer role="user"/>
        </div>
    );
}