export const requestByIngredient = async (ingredient, domain) => {
  try {
    const ingredientURL = `https://www.${domain}.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(ingredientURL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const requestByName = async (name, domain) => {
  try {
    const nameURL = `https://www.${domain}.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(nameURL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const requestByFirstLetter = async (firstLetter, domain) => {
  try {
    const firstLetterURL = `https://www.${domain}.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(firstLetterURL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// AREA //

export async function fetchMealsCountries() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const { meals } = await response.json();
  return meals;
}

export async function fetchSearchMealByCountry(country) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
  const { meals } = await response.json();
  console.log(meals);
  return meals;
}
