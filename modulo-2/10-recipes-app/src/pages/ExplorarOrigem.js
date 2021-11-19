import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer/index';
import Header from '../components/Header';
import { fetchMealsCountries, fetchSearchMealByCountry } from '../services/requestAPI';

function ExplorarOrigem() {
  const [countriesList, setCountriesList] = useState([]);
  const [foodListByCountry, setFoodListByCountry] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchMealsCountries()
      .then((res) => setCountriesList([{ strArea: 'All' }, ...res]));
  }, []);

  useEffect(() => {
    fetchSearchMealByCountry('British')
      .then((res) => setFoodListByCountry(res));
  }, []);

  const filterMealByCountry = async ({ target: { value } }) => {
    const foodCountry = await fetchSearchMealByCountry(value);
    setFoodListByCountry(foodCountry);
  };

  const TWELVE = 12;

  return (
    <>
      <Header />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ filterMealByCountry }
      >
        { countriesList.map((area, index) => (
          <option
            data-testid={ `${area.strArea}-option` }
            key={ index }
          >
            { area.strArea }
          </option>
        ))}
      </select>
      { foodListByCountry.length > 0 && foodListByCountry
        .slice(0, TWELVE).map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <button
              type="button"
              onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
            >
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h4 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h4>
            </button>
          </div>
        ))}
      <Footer />
    </>
  );
}

export default ExplorarOrigem;

// const ExplorarOrigem = () => (
//   <>
//     <Header title="Explorar Origem" displaySearchBtn={ false } />
//     <div>
//       Sou a página de explorar
//     </div>
//     <Footer />
//   </>
// );

// export default ExplorarOrigem;
