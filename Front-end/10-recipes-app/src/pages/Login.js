import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { saveEmail } from '../redux/actions';
// import PropTypes from 'prop-types';

function Login() {
  const history = useHistory();
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  // substito para mapDispatchToProps
  const dispatch = useDispatch();

  // caso precisem pegar algo no local storage;
  // const mealisAuthenticated = () => localStorage.getItem(mealsToken) !== null;
  // const cockisAuthenticated = () => localStorage.getItem(cocktailsToken) !== null;
  // const getMealsToken = () => localStorage.getItem(mealsToken);
  // const getCockToken = () => localStorage.getItem(cocktailsToken);

  const loginmeals = (token) => {
    localStorage.setItem('mealsToken', JSON.stringify(token));
  };
  const loginCock = (token) => {
    localStorage.setItem('cocktailsToken', JSON.stringify(token));
  };
  const emailStorage = (userEmail) => {
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
  };
  // caso precisem remover do storage
  // const logout = () => {
  //   localStorage.removeItem(meals, cocktail);
  // };

  const handleChange = ({ target }) => {
    setUserEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const redirectToTarget = () => {
    loginmeals(1);
    loginCock(1);
    emailStorage(email);
    dispatch(saveEmail(email));
    history.push('/comidas');
  };

  const validaPassword = () => {
    const passwordLength = 7;
    if (password.length >= passwordLength) {
      return true;
    }
    return false;
  };

  const validaLogin = () => {
    const emailIsValid = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    const enable = emailIsValid.test(email);
    if (enable) {
      return true;
    }
    return false;
  };

  return (
    <main className="login">
      <h1>Recipes App</h1>
      <form className="form">
        <div className="login-cadastrar">
          <p>Login</p>
          <p>Cadastrar</p>
        </div>
        <div className="form-login">
          <label htmlFor="email">
            <input
              className="em-input"
              type="email"
              placeholder="email"
              autoComplete="off"
              data-testid="email-input"
              name="email"
              onChange={ handleChange }
              value={ email }
            />
          </label>

          <label htmlFor="password">
            <input
              className="em-input"
              type="password"
              placeholder="password"
              data-testid="password-input"
              name="password"
              onChange={ handlePassword }
              value={ password }
            />
          </label>

          <button
            className="login-btn"
            type="submit"
            data-testid="login-submit-btn"
            onClick={ redirectToTarget }
            disabled={ !(validaLogin() && validaPassword()) }
          >
            Entrar
          </button>
        </div>
      </form>
    </main>
  );
}

// Login.propTypes = {
//   // history: PropTypes.objectOf(PropTypes.any).isRequired,
//   // userEmail: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   // userEmail: (email) => dispatch(userAction(email)),

// });

export default Login;
