import React from 'react';
import PropTypes from 'prop-types';

function Input({ type, name, value, onchange, placeholder }) {
  return (
    <label htmlFor={ name }>
      <input
        className={ `input input-${name}` }
        type={ type }
        name={ name }
        id={ name }
        value={ value }
        onChange={ onchange }
        autoComplete="off"
        placeholder={ placeholder }
        data-testid={ `${name}-filter` }
      />
    </label>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onchange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
