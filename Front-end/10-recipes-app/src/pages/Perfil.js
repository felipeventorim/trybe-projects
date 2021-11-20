import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import getEmailFromLocalStorage from '../services/getLocalStorage';

const Perfil = () => {
  const history = useHistory();
  // substito para mapStateToProps
  const user = getEmailFromLocalStorage() || '';
  return (
    <>
      <Header title="Perfil" displaySearchBtn={ false } />
      <div>
        <p data-testid="profile-email">{ user.email }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Sair
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Perfil;
