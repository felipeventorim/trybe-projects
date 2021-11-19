export const allActions = {
  ADD_FOODS: 'ADD_FOODS',
  ADD_STARTED_RECIPES: 'ADD_STARTED_RECIPES',
  SAVE_EMAIL: 'SAVE_EMAIL',
};

export const saveFoods = (foods) => ({
  type: allActions.ADD_FOODS,
  payload: foods,
});

export const addStartedRecipes = (recipe) => ({
  type: allActions.ADD_STARTED_RECIPES,
  payload: recipe,
});

export const saveEmail = (email) => ({
  type: allActions.SAVE_EMAIL,
  payload: email,
});
