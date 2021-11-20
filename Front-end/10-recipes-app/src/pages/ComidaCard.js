import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/Recipes/RecipesContext';

function ComidaCard({ foodsIngredients, index }) {
  const { setByIngredient, setIngredientByName } = useContext(RecipesContext);
  const { strIngredient } = foodsIngredients;

  return (
    <div>
      <div
        src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
        data-testid={ `${index}-ingredient-card` }
      >
        <Link
          onClick={ () => {
            setByIngredient(true);
            setIngredientByName(strIngredient);
          } }
          to="/comidas"
          data-testid={ `${index}-main-ingredient-card-link-image` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
          />
        </Link>
        <Link
          onClick={ () => {
            setByIngredient(true);
            setIngredientByName(strIngredient);
          } }
          to="/comidas"
          data-testid={ `${index}-main-ingredient-card-link` }
        >
          <p
            data-testid={ `${index}-card-name` }
          >
            {strIngredient}
          </p>
        </Link>
      </div>
    </div>
  );
}

ComidaCard.propTypes = {
  foodsIngredients: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default ComidaCard;
// Obrigado Pollyana e Guilherme!!
