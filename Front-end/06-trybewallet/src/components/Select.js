import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const { label, name, options, value, onChange } = this.props;
    return (
      <label htmlFor={ name }>
        {label}
        <select id={ name } name={ name } value={ value } onChange={ onChange }>
          { options.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          )) }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  options: [],
};

export default Select;
