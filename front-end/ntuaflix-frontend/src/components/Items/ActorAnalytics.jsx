import React from 'react';
import PropTypes from 'prop-types';
import "../../styles.css";
const ActorAnalytics = ({ actor, onSearchAgain, onExit }) => {
    // Function to handle converting 'knownForTitles' array to a string
    const knownForTitlesString = (titles) => {
        return titles.map(title => title.trim()).join(', ');
    };

    return (
        <div className="actor-analytics">
            <div className="actor-header">
                <h1 className="dynamic-content">{actor.primaryName}</h1>
                <div className="actor-details">
                    <p><strong>Profession:</strong> {actor.primaryProfession.join(', ')}</p>
                    <p><strong>Known For:</strong> {knownForTitlesString(actor.knownForTitles)}</p>
                </div>
            </div>
            <div className="actor-additional-info">
                <p><strong>Birth Year:</strong> {actor.birthYear}</p>
                {actor.deathYear && <p><strong>Death Year:</strong> {actor.deathYear}</p>}
            </div>
            <div className="buttonContainer">
                <button onClick={onSearchAgain}>Search Again</button>
                <button onClick={onExit}>Exit</button>
            </div>
        </div>
    );
};

ActorAnalytics.propTypes = {
    actor: PropTypes.shape({
        nconst: PropTypes.string.isRequired,
        primaryName: PropTypes.string.isRequired,
        birthYear: PropTypes.number,
        deathYear: PropTypes.number,
        primaryProfession: PropTypes.arrayOf(PropTypes.string),
        knownForTitles: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    onSearchAgain: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired
};

export default ActorAnalytics;
