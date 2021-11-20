import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Footer from '../Footer';

function RenderFilteredRecipes() {
  const location = useLocation();
  const TWELVE = 12;
  const mealsOrDrinks = useSelector(({ foods }) => foods.mealsOrDrinks);

  if (location.pathname === '/comidas' && Object.keys(mealsOrDrinks).length > 0) {
    const { meals } = mealsOrDrinks;
    return (
      <>
        <div>
          { meals.map((meal, index) => (
            index < TWELVE ? (
              <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                  width="150px"
                />
                <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
              </div>
            ) : ''
          ))}
        </div>
        <Footer />
      </>
    );
  }

  if (location.pathname === '/bebidas' && Object.keys(mealsOrDrinks).length > 0) {
    const { drinks } = mealsOrDrinks;

    return (
      <>
        <div>
          { drinks.map((drink, index) => (
            index < TWELVE ? (
              <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                  width="150px"
                />
                <span data-testid={ `${index}-card-name` }>{ drink.strDrink }</span>
              </div>
            ) : ''
          ))}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div />
  );
}

export default RenderFilteredRecipes;
