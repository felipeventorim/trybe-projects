import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { value, onClick, text, testId } = this.props;
    return (
      <button
        type="button"
        value={ value }
        onClick={ onClick }
        data-testid={ testId }
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

Button.defaultProps = {
  value: 0,
  testId: '',
};

export default Button;
