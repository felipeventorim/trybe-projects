import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  render() {
    const { name, type = 'text', value, placeholder, handleInput } = this.props;
    return (
      <label htmlFor={ name }>
        <input
          name={ name }
          type={ type }
          placeholder={ placeholder }
          value={ value }
          onChange={ handleInput }
          data-testid={ `checkout-${name}` }
        />
      </label>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
};
