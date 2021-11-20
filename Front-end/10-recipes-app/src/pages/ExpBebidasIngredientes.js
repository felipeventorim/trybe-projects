import React, { useContext } from 'react';
import RecipesContext from '../context/Recipes/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BebidaCard from './BebidaCard';

function ExpBebidaIngredientes() {
  const { drinksIngredients } = useContext(RecipesContext);

  return (
    <>
      <Header title="Explorar Ingredientes" displaySearchBtn={ false } />
      <div>
        {
          drinksIngredients.map((ingredient, index) => (
            <BebidaCard
              key={ index }
              drinksIngredients={ ingredient }
              index={ index }
              id={ ingredient.idIngredient }
            />
          ))
        }
      </div>
      <Footer />
    </>
  );
}

export default ExpBebidaIngredientes;
// Obrigado Pollyana e Guilherme!!
