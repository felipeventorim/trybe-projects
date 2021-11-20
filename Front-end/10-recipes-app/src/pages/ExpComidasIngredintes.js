import React, { useContext } from 'react';
import RecipesContext from '../context/Recipes/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ComidaCard from './ComidaCard';

function ExpComidaIngredientes() {
  const { foodsIngredients } = useContext(RecipesContext);

  return (
    <>
      <Header title="Explorar Ingredientes" displaySearchBtn={ false } />
      <div>
        {
          foodsIngredients.map((ingredient, index) => (
            <ComidaCard
              key={ index }
              foodsIngredients={ ingredient }
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

export default ExpComidaIngredientes;
// Obrigado Pollyana e Guilherme!!
