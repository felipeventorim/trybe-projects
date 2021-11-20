const getEmailFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

export const getFavoriteRecipesFromLocalStorage = () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return favoriteRecipes;
};

export default getEmailFromLocalStorage;
