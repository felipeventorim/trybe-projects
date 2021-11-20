import React from 'react';

import favoriteWhite from '../../images/whiteHeartIcon.svg';
import favoriteBlack from '../../images/blackHeartIcon.svg';
import { getFavoriteRecipesFromLocalStorage } from '../../services/getLocalStorage';

const FavoriteBtn = (isFavorited, setIsFavorited, details) => {
  const handleAddFavoriteBtn = () => {
    const favoriteRecipesFromLocalStorage = getFavoriteRecipesFromLocalStorage() || [];
    favoriteRecipesFromLocalStorage.push(details);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesFromLocalStorage),
    );
    setIsFavorited(true);
  };

  const handleRemoveFavoriteBtn = () => {
    const favoriteRecipesFromLocalStorage = getFavoriteRecipesFromLocalStorage();
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesFromLocalStorage
        .filter((recipe) => recipe.id !== details.id)),
    );
    setIsFavorited(false);
  };

  return isFavorited ? (
    <input
      type="image"
      className="favorite-btn"
      data-testid="favorite-btn"
      onClick={ handleRemoveFavoriteBtn }
      src={ favoriteBlack }
      alt="favorite"
    />
  )
    : (
      <input
        type="image"
        className="favorite-btn"
        data-testid="favorite-btn"
        onClick={ handleAddFavoriteBtn }
        src={ favoriteWhite }
        alt="favorite"
      />
    );
};

export default FavoriteBtn;
