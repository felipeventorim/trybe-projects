import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button/index';
import DoneRecipeCard from '../components/DoneRecipeCard/index';
import { getLocalStorage } from '../components/helper';

const ReceitasFeitas = () => {
  const doneRecipes = getLocalStorage() || [];

  const [filter, setFilter] = useState('');

  return (
    <>
      <Header title="Receitas Feitas" displaySearchBtn={ false } />
      <Button
        dataTest="filter-by-all-btn"
        onClick={ () => setFilter('') }
        text="All"
      />
      <Button
        dataTest="filter-by-food-btn"
        text="Food"
        onClick={ () => setFilter('comida') }
      />
      <Button
        dataTest="filter-by-drink-btn"
        text="Drink"
        onClick={ () => setFilter('bebida') }
      />
      <DoneRecipeCard
        doneRecipes={ doneRecipes }
        filter={ filter }
      />
    </>
  );
};

export default ReceitasFeitas;
