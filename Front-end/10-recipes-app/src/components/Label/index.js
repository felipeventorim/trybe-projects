import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ dataTest, type, placeholder, text, name, value, onChange, id }) => (
  <label htmlFor={ dataTest }>
    <input
      type={ type }
      id={ id }
      data-testid={ dataTest }
      placeholder={ placeholder }
      name={ name }
      value={ value }
      onChange={ onChange }
    />
    { ' ' }
    { text }
  </label>
);

Label.propTypes = {
  type: PropTypes.string,
  dataTest: PropTypes.string,
  placeholder: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;

export default Label;
