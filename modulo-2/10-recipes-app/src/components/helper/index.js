import React from 'react';

import { addStartedRecipes } from '../../redux/actions';

const copy = require('clipboard-copy');

export const handleShareBtn = (pathname) => {
  const text = document.querySelector('.share-text');
  text.style.display = 'block';
  copy(pathname);
};

export const renderIngredients = (recipeDetails) => {
  const ingredientsList = Object.entries(recipeDetails)
    .filter((e) => (e[0].includes('Ingredient') && e[1]));
  const measuresList = Object.entries(recipeDetails)
    .filter((e) => (e[0].includes('Measure') && e[1]));
  return ingredientsList.map((ingredient, i) => (
    <li
      key={ ingredient[0] }
      data-testid={ `${i}-ingredient-name-and-measure` }
    >
      {`${ingredient[1]} - ${measuresList[i][1]}`}
    </li>));
};

export const renderIngredientsCheck = (recipeDetails) => {
  const ingredientsList = Object.entries(recipeDetails)
    .filter((e) => (e[0].includes('Ingredient') && e[1]));
  const measuresList = Object.entries(recipeDetails)
    .filter((e) => (e[0].includes('Measure') && e[1]));
  return ingredientsList.map((ingredient, index) => (
    <div key={ ingredient[0] }>
      <label
        htmlFor="checkbox"
        data-testid={ `${index}-ingredient-step` }
      >
        <input type="checkbox" name="checkbox" />
        {`${ingredient[1]} - ${measuresList[index][1]}`}
      </label>
    </div>));
};

export const renderRecomendationList = (card, index, type) => (
  <div
    key={ index }
    data-testid={ `${index}-recomendation-card` }
    className="polaroid recomendation-card"
  >
    <img src={ card[`str${type}Thumb`] } alt={ card[`str${type}`] } />
    <div data-testid={ `${index}-recomendation-title` }>{card[`str${type}`]}</div>
  </div>
);

export const handleStartRecipe = (history, url, recipe, dispatch) => {
  const { pathname } = history.location;
  const arrUrl = url.split('/');
  const startedRecipe = {
    id: Number(arrUrl[arrUrl.length - 1]),
    type: arrUrl[arrUrl.length - 2],
    recipe,
    url,
    startedRecipe: true,
  };
  dispatch(addStartedRecipes(startedRecipe));
  console.log(startedRecipe);
  history.push(`${pathname}/in-progress`);
};

export const getLocalStorage = () => JSON.parse(localStorage.getItem('doneRecipes'));

export const handleDoneRecipes = (recipeDetails, type) => {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const doneDate = `${date}-${month}-${year}`;
  let takeTags = '';

  if (recipeDetails.strTags !== null) {
    takeTags = (recipeDetails.strTags).split(',');
  }
  let prevDoneRecipes = [];
  if (localStorage.getItem('doneRecipes') !== null) {
    prevDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(prevDoneRecipes);
  }

  if (type === 'comidas') {
    const {
      idMeal, strArea, strCategory, strMeal, strMealThumb } = recipeDetails;
    const doneRecipes = {
      id: idMeal,
      type,
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate,
      tags: takeTags,
    };
    const jsonDoneRecipes = JSON.stringify([...prevDoneRecipes, doneRecipes]);
    localStorage.setItem('doneRecipes', jsonDoneRecipes);
  } else {
    const
      { idDrink, strCategory, strDrink, strDrinkThumb, strAlcoholic, strTags,
      } = recipeDetails;
    const doneRecipes = {
      id: idDrink,
      type,
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate,
      tags: strTags,
    };
    const jsonDoneRecipes = JSON.stringify([...prevDoneRecipes, doneRecipes]);
    localStorage.setItem('doneRecipes', jsonDoneRecipes);
  }
};
