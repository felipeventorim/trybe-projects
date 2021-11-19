import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import shareIcon from '../../images/shareIcon.svg';
import { handleShareBtn } from '../helper/index';

const DoneRecipeCard = ({ doneRecipes, filter }) => {
  const history = useHistory();

  const renderRecipes = (recipes) => recipes.map((recipe, index) => (
    <div key={ recipe.id }>
      <button
        type="button"
        onClick={ () => history.push(`${recipe.type}s/${recipe.id}`) }
      >
        <img
          src={ recipe.image }
          alt={ recipe.name }
          width="150px"
          data-testid={ `${index}-horizontal-image` }
        />
      </button>
      { recipe.type === 'comida' ? (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${recipe.area} - ${recipe.category}` }
        </p>
      ) : (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { recipe.alcoholicOrNot }
        </p>
      ) }
      <button
        type="button"
        onClick={ () => history.push(`${recipe.type}s/${recipe.id}`) }
      >
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </p>
      </button>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </p>
      <button
        type="button"
        onClick={ () => handleShareBtn(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
      >
        <img
          src={ shareIcon }
          alt="Icone de compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <p className="share-text" display="hidden">Link copiado!</p>
      { recipe.tags.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      ))}
    </div>
  ));

  if (filter === 'comida') {
    return renderRecipes(doneRecipes.filter(({ type }) => type === filter));
  }

  if (filter === 'bebida') {
    return renderRecipes(doneRecipes.filter(({ type }) => type === filter));
  }

  return (
    <div>
      { renderRecipes(doneRecipes) }
    </div>
  );
};

DoneRecipeCard.propTypes = {
  doneRecipes: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
}.isRequired;

export default DoneRecipeCard;
