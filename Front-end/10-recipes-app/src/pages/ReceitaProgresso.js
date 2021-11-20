import React from 'react';
import { useHistory } from 'react-router';

const ReceitaProgresso = () => {
  const history = useHistory();
  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      onClick={ () => history.push('/receitas-feitas') }
    >
      Finalizar receita
    </button>
  );
};

export default ReceitaProgresso;
