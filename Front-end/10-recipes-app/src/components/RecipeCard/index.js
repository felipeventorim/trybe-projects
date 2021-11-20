import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

function RecipeCard({ recipe, index, type }) {
  const name = `str${type}`;
  const src = `str${type}Thumb`;
  const pathname = type === 'Meal' ? '/comidas' : '/bebidas';
  const id = `id${type}`;

  return (
    <Link
      to={ `${pathname}/${recipe[id]}` }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        className="card-image"
        data-testid={ `${index}-card-img` }
        src={ recipe[src] }
        alt={ recipe[name] }
      />
      <p className="card-name" data-testid={ `${index}-card-name` }>{recipe[name]}</p>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeCard;
