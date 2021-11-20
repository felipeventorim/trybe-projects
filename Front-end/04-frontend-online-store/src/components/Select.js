import React from 'react';
import PropTypes from 'prop-types';
import states from '../dataStates';

export default class Select extends React.Component {
  render() {
    const { value, handleInput } = this.props;
    return (
      <select name="state" value={ value } onChange={ handleInput }>
        { states.map((state) => {
          const [sigla] = Object.keys(state);
          const [estado] = Object.values(state);
          return (
            <option
              key={ sigla }
              value={ sigla }
            >
              {estado}
            </option>
          );
        }) }
      </select>
    );
  }
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
};
