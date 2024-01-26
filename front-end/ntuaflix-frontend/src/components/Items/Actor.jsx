// Actor.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../../styles.css";

const Actor = ({ actor, onClick }) => {
    const [hover, setHover] = useState(false);
    const { primaryName, primaryProfession, imgUrl } = actor;
    const professions = primaryProfession.split(',');

    // Check if imgUrl exists, and replace {width_variable} with a valid width if it does
    const fullImageUrl = imgUrl ? imgUrl.replace('{width_variable}', 'w300') : '';
    const hasImage = imgUrl && imgUrl !== "\\N";

    return (
        <div
            className={`actor ${!hasImage ? 'full-width' : ''}`}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {hasImage && (
                <img src={fullImageUrl} alt={primaryName} className="actor-image" />
            )}
            <div className={`actor-details ${!hasImage ? 'full-width' : ''}`}>
                <h3 className={`actor-name ${hover ? 'hover' : 'dynamic-content'}`}>{primaryName}</h3>
                <p className="actor-profession">{professions.join(', ')}</p>
            </div>
        </div>
    );
};

Actor.propTypes = {
    actor: PropTypes.shape({
        primaryName: PropTypes.string.isRequired,
        primaryProfession: PropTypes.string,
        imgUrl: PropTypes.string, // imgUrl can be null, so the component should handle that case
        titleID: PropTypes.string
    }),
    onClick: PropTypes.func
};

export default Actor;
