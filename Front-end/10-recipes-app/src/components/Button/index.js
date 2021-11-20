import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, dataTest, onClick }) => (
  <button
    type="button"
    data-testid={ dataTest }
    onClick={ onClick }
  >
    { text }
  </button>
);

Button.propTypes = {
  text: PropTypes.string,
  dataTest: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;

export default Button;
