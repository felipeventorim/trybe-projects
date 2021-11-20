import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

function Perfil() {
  const history = useHistory();
  // equivalente a mapstate to props
  const email = useSelector(({ user }) => user.email);

  const redirectToFeitas = () => {
    history.push('/receitas/feitas');
  };
  const redirectToFavoritas = () => {
    history.push('/receitas/favoritas');
  };
  const limpaStorage = () => {
    localStorage.clear();
  };
  const redirectToSair = () => {
    limpaStorage();
    history.push('/');
  };
  return (
    <div>
      <p data-testid="profile-email">{ email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ redirectToFeitas }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ redirectToFavoritas }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ redirectToSair }
      >
        Sair
      </button>
    </div>
  );
}

export default Perfil;
