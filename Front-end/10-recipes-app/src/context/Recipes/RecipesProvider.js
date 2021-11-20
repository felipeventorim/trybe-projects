import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import fetchApi from '../../services';
// import { fetchFoodsIngredients, fetchDrinksIngredients } from '../../services/requestAPI';

const URL = {
  meals: {
    list: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    categories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    byCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    id: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
  },
  drinks: {
    list: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    categories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    byCategory: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
    id: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
  },
};
const CATEGORIES_TO_SHOW = 5;
const RECIPES_TO_SHOW = 12;
const RECOMMENDEDS_TO_SHOW = 6;

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipesRecommendedList, setRecipesRecommendedList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [foodsIngredients, setFoodsIngredients] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const [byIngredient, setByIngredient] = useState(false);
  const [ingredientByName, setIngredientByName] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});

  const fetchRecipesCategory = useCallback(async (recipeType) => {
    const data = await fetchApi(URL[recipeType].categories);
    const categoriesList = data[recipeType]
      .filter((recipe) => data[recipeType].indexOf(recipe) < CATEGORIES_TO_SHOW)
      .map(({ strCategory }) => strCategory);
    setCategories(categoriesList);
    setType(recipeType);
  }, []);

  const fetchRecipesRecommendedList = useCallback(async (recipeType) => {
    const data = await fetchApi(URL[recipeType].list);
    const recipesList = data[recipeType]
      .filter((recipe) => data[recipeType].indexOf(recipe) < RECOMMENDEDS_TO_SHOW);
    setRecipesRecommendedList(recipesList);
  }, []);

  const fetchRecipesList = useCallback(async (recipeType) => {
    const data = await fetchApi(URL[recipeType].list);
    const recipesList = data[recipeType]
      .filter((recipe) => data[recipeType].indexOf(recipe) < RECIPES_TO_SHOW);
    setRecipes(recipesList);
  }, []);

  const fetchRecipesByCategory = async (endPoint) => {
    const data = await fetchApi(`${URL[type].byCategory}${endPoint}`);
    const recipesList = data[type]
      .filter((recipe) => data[type].indexOf(recipe) < RECIPES_TO_SHOW);
    setRecipes(recipesList);
  };

  const handleClickCategory = ({ target }) => {
    if (target.innerText === category || target.innerText === 'All') {
      fetchRecipesList(type);
    } else fetchRecipesByCategory(target.innerText);
    setCategory(target.innerText);
  };

  const fetchFoodsIngredients = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    return result;
  };

  const fetchDrinksIngredients = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    fetchFoodsIngredients().then((results) => setFoodsIngredients(
      results.meals.slice([0], RECIPES_TO_SHOW),
    ));
  }, []);

  useEffect(() => {
    fetchDrinksIngredients().then((results) => setDrinksIngredients(
      results.drinks.slice([0], RECIPES_TO_SHOW),
    ));
  }, []);

  const fetchRecipeById = useCallback(async (recipeType, id) => {
    const data = await fetchApi(`${URL[recipeType].id}${id}`);
    setRecipeDetails(data[recipeType][0]);
  }, []);

  const context = {
    fetchRecipesCategory,
    handleClickCategory,
    fetchRecipesList,
    fetchRecipeById,
    fetchRecipesRecommendedList,
    categories,
    recipes,
    foodsIngredients,
    setFoodsIngredients,
    drinksIngredients,
    setDrinksIngredients,
    byIngredient,
    setByIngredient,
    ingredientByName,
    setIngredientByName,
    recipeDetails,
    recipesRecommendedList,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipesProvider;
