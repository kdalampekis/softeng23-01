import React from 'react';
import PropTypes from 'prop-types';
import "../../styles.css";

const Actor = ({ name, knownFor, profession, onClick }) => {
    return (
        <div className="functionality movie" onClick={onClick}>
            <h3 className="actor-name">{name}</h3>
            <p className="actor-known-for">Known for: {knownFor}</p>
            <p className="actor-profession">Profession: {profession.join(', ')}</p>
        </div>
    );
};

Actor.propTypes = {
    name: PropTypes.string.isRequired,
    knownFor: PropTypes.string,
    profession: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func
};

export default Actor;
