import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, type = 'button', className = '' }) => {
    return (
        <button
            type={type}
            className={`custom-button ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
};

export default Button;
