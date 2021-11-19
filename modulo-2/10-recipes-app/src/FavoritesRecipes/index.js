import React from 'react';
import { handleShareBtn } from '../components/helper';
import { getFavoriteRecipesFromLocalStorage } from '../services/getLocalStorage';
import Button from '../components/Button';
import share from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoritesRe() {
  const favoriteRecipes = getFavoriteRecipesFromLocalStorage() || [];
  console.log(favoriteRecipes);

  const handleRemoveFavoriteBtn = (id) => {
    const favoriteRecipesFromLocalStorage = getFavoriteRecipesFromLocalStorage();
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesFromLocalStorage
        .filter((recipe) => recipe.id !== id)),
    );
  };

  return (
    <div>
      <p>Receitas Favoritas</p>

      <Button
        dataTest="filter-by-all-btn"
        // onClick={ () => setFilter('') }
        text="All"
      />
      <Button
        dataTest="filter-by-food-btn"
        text="Food"
        // onClick={ () => setFilter('comida') }
      />
      <Button
        dataTest="filter-by-drink-btn"
        text="Drink"
        // onClick={ () => setFilter('bebida') }
      />

      { favoriteRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt={ recipe.name }
          />

          <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {' '}
            { recipe.category }
          </p>
          { recipe.type === 'comida' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.area} - ${recipe.category}` }
            </p>

          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot }
            </p>
          ) }

          {/* // requisito 63  */}
          <button type="button" onClick={ () => handleShareBtn(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }>
            <img
              src={ share }
              data-testid={ `${index}-horizontal-share-btn` }
              alt="Icone de compartilhar"
            />
          </button>
          <p className="share-text" display="none">
            Link copiado!
          </p>

          <input
            type="image"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="teste"
            onClick={ () => handleRemoveFavoriteBtn(recipe.id) }
          />
        </div>
      ))}

    </div>
  );
}

export default FavoritesRe;
