import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/Recipes/RecipesContext';

function BebidaCard({ drinksIngredients, index }) {
  const { setByIngredient, setIngredientName } = useContext(RecipesContext);
  const { strIngredient1 } = drinksIngredients;
  return (
    <div
      data-testid={ `${index}-ingredient-card` }
    >
      <Link
        onClick={ () => {
          setByIngredient(true);
          setIngredientName(strIngredient1);
        } }
        to="/bebidas/"
        data-testid={ `${index}-main-ingredient-card-link-image` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png ` }
          alt={ strIngredient1 }
        />
      </Link>
      <Link
        to="/bebidas/"
        onClick={ () => {
          setByIngredient(true);
          setIngredientName(strIngredient1);
        } }
        data-testid={ `${index}-main-ingredient-card-link` }
      >
        <p
          data-testid={ `${index}-card-name` }
        >
          {strIngredient1}
        </p>
      </Link>
    </div>
  );
}

BebidaCard.propTypes = {
  drinksIngredients: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default BebidaCard;
// Obrigado Pollyana e Guilherme!!
