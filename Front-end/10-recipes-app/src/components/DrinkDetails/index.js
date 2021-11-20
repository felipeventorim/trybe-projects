import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import RecipesContext from '../../context/Recipes/RecipesContext';
import {
  getFavoriteRecipesFromLocalStorage as getFavoriteRecipes,
} from '../../services/getLocalStorage';

import {
  renderIngredients,
  renderRecomendationList,
  handleStartRecipe,
  handleShareBtn,
} from '../helper';
import FavoriteBtn from '../FavoriteBtn';

import './style.css';
import share from '../../images/shareIcon.svg';

function DrinkDetails() {
  const {
    fetchRecipeById,
    recipeDetails,
    recipesRecommendedList,
    fetchRecipesRecommendedList,
  } = useContext(RecipesContext);

  const [pageId, setPageId] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const startedRecipes = useSelector(({ foods }) => foods.startedRecipes);
  const dispatch = useDispatch();

  const history = useHistory();

  const { href } = window.location;

  useEffect(() => {
    const [type, id] = history.location.pathname.split('/').splice(1);
    const recipeType = type === 'comidas' ? 'meals' : 'drinks';
    const recommendedType = type === 'comidas' ? 'drinks' : 'meals';
    setPageId(id);
    fetchRecipeById(recipeType, id);
    fetchRecipesRecommendedList(recommendedType);
  }, [history, fetchRecipeById, fetchRecipesRecommendedList]);

  useEffect(() => {
    const [id] = history.location.pathname.split('/').splice(2);
    if (startedRecipes.length) {
      startedRecipes
        .find((recipe) => recipe.id === id && recipe.startedRecipe);
      setIsStarted(true);
      startedRecipes
        .find((recipe) => recipe.id === id && !recipe.startedRecipe);
      setIsCompleted(true);
    }
  }, [history, startedRecipes]);

  useEffect(() => {
    if (getFavoriteRecipes()) {
      const favorited = getFavoriteRecipes()
        .find((recipe) => recipe.id === pageId);
      setIsFavorited(!!favorited);
    }
  }, [pageId]);

  if (!Object.keys(recipeDetails).length) return <div />;

  const {
    idDrink,
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strInstructions,
  } = recipeDetails;

  return (
    <div>
      <img
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <div>
        <input
          type="image"
          data-testid="share-btn"
          onClick={ () => handleShareBtn(href) }
          src={ share }
          alt="share"
        />

        { FavoriteBtn(
          isFavorited,
          setIsFavorited,
          { id: idDrink,
            type: 'bebida',
            area: '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic,
            name: strDrink,
            image: strDrinkThumb },
        ) }

        <div className="share-text">Link copiado!</div>
      </div>
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <ul>
        { renderIngredients(recipeDetails) }
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <div className="recomendation-list">
        {
          recipesRecommendedList
            .map((card, index) => renderRecomendationList(card, index, 'Meal'))
        }
      </div>
      {
        !isCompleted && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={
              () => handleStartRecipe(history, href, recipeDetails, dispatch)
            }
          >
            { isStarted ? 'Iniciar receita' : 'Continuar Receita'}
          </button>
        )
      }
    </div>
  );
}

export default DrinkDetails;
