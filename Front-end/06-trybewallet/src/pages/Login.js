import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setEmail as setEmailAction } from '../actions';

import Input from '../components/Input';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValidEmail: false,
      isValidPassword: false,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEmail({ target }) {
    const { value } = target;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.setState({
      email: value,
      isValidEmail: validEmail.test(value),
    });
  }

  handlePassword({ target }) {
    const MIN_PASSWORD_LENGTH = 6;

    this.setState({
      password: target.value,
      isValidPassword: target.value.length >= MIN_PASSWORD_LENGTH,
    });
  }

  handleClick() {
    const { history, setEmail } = this.props;
    const { email } = this.state;

    setEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isValidEmail, isValidPassword } = this.state;
    return (
      <div>
        <Input
          label="Email"
          name="email"
          value={ email }
          onChange={ this.handleEmail }
        />
        <Input
          type="password"
          label="Senha"
          name="password"
          value={ password }
          onChange={ this.handlePassword }
        />

        <button
          type="button"
          disabled={ !(isValidEmail && isValidPassword) }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
