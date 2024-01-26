// ActorsDisplay.js

import React from 'react';
import PropTypes from 'prop-types';
import Actor from '../components/Items/Actor';

const ActorsDisplay = ({ actorsData, onSelectActor }) => {
    return (
        <div className="actorsContainer">
            {actorsData.length === 0
                ? <p>No actors found.</p>
                : actorsData.map((actor, index) => (
                    <Actor
                        key={`${actor.nconst}-${index}`}
                        actor={actor}
                        onClick={() => onSelectActor(actor)}
                    />
                ))
            }
        </div>
    );
};

ActorsDisplay.propTypes = {
    actorsData: PropTypes.array.isRequired,
    onSelectActor: PropTypes.func.isRequired
};

export default ActorsDisplay;
