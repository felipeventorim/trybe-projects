import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, label, name, value, onChange } = this.props;
    return (
      <label htmlFor={ name } name={ name } value={ value } onChange={ onChange }>
        {label}
        <input
          type={ type }
          id={ name }
          name={ name }
          value={ value }
          onChange={ onChange }
          data-testid={ `${name}-input` }
        />
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
