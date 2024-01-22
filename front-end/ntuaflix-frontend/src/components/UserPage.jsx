import React, {useState} from "react";
import Header from "./Header";
import "../styles.css";
import RenderOptionContent from "../Functions/RenderOptionContent";
import Footer from "./Footer";
import UserOptions from "../constants/UserOptions";



export default function UserPage() {
    const [selectedFunctionality, setSelectedFunctionality] = useState(null);
    const [inputValues, setInputValues] = useState({}); // Object to hold values for multiple inputs

    const [genre, setGenre] = useState('a genre');
    const [numberOfMovies, setNumberOfMovies] = useState('N');
    const [actor, setActor] = useState('actor/cast member');
    const [movieTitle, setMovieTitle] = useState("movie");
    const [movieYear, setMovieYear] = useState("year");

    const [searchButtonText, setSearchButtonText] = useState("Search");


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
        // setInputValues({});
        if (option === "Add a like/dislike to a movie") {
            setSearchButtonText("Add");
        }
        else if (option === "Movie analytics" || option === "Actor/cast member profile") {
            setSearchButtonText("Dive")
        }
        else setSearchButtonText("Search");
    };

    const handleBackToOptions = () => {
        setSelectedFunctionality(null);
        setActor("actor/cast member")
        setGenre("genre");
        setNumberOfMovies("N");
        setMovieYear("year");
        setSearchButtonText("Search");
    };



    return(
        <div>
            <Header />
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

                {selectedFunctionality === "Add a like/dislike to a movie" && (
                    <span>
                        Add a like/dislike to <span className="dynamic-content">{movieTitle}</span>
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

                {selectedFunctionality === "Movie analytics" && (
                    <span>
                        Dive into the analytics of <span className="dynamic-content">{movieTitle}</span>
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
                    {RenderOptionContent(selectedFunctionality, inputValues, handleInputChange)}
                    <button>{searchButtonText}</button>
                    <button onClick={handleBackToOptions}>Go Back</button>
                </div>
            )}

            <Footer role="user" />
        </div>
    );
}


// export default UserPage;