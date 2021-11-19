import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

function FoodDetails() {
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
      const started = startedRecipes
        .find((recipe) => recipe.id === id && recipe.startedRecipe);
      setIsStarted(!!started);
      const completed = startedRecipes
        .find((recipe) => recipe.id === id && !recipe.startedRecipe);
      setIsCompleted(!!completed);
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
    idMeal,
    strMeal,
    strMealThumb,
    strArea,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipeDetails;

  return (
    <main className="main-details">
      <div className="polaroid">
        <img
          className="recipe-photo"
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
        />
        <div className="title-line">
          <div className="recipe-title-category">
            <h2 className="recipe-title" data-testid="recipe-title">{strMeal}</h2>
            <p className="recipe-category" data-testid="recipe-category">{strCategory}</p>
          </div>
          <input
            type="image"
            className="share-btn"
            data-testid="share-btn"
            onClick={ () => handleShareBtn(href) }
            src={ share }
            alt="share"
          />

          { FavoriteBtn(
            isFavorited,
            setIsFavorited,
            { id: idMeal,
              type: 'comida',
              area: strArea,
              category: strCategory,
              alcoholicOrNot: '',
              name: strMeal,
              image: strMealThumb },
          ) }

          <div className="share-text">Link copiado!</div>
        </div>
      </div>
      <ul className="subtitle ingredients-list" aria-label="Ingredients">
        { renderIngredients(recipeDetails) }
      </ul>
      <section className="subtitle instructions" aria-label="Instructions">
        <p data-testid="instructions">{strInstructions}</p>
      </section>
      <iframe
        width="360"
        height="200"
        src={ `https://www.youtube.com/embed/${strYoutube.split('=')[1]}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        data-testid="video"
      />
      <div className="recomendation-list">
        {
          recipesRecommendedList
            .map((card, index) => renderRecomendationList(card, index, 'Drink'))
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
    </main>
  );
}

export default FoodDetails;
