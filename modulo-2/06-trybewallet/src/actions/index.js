// Coloque aqui suas actions
const BASE_URL = 'https://economia.awesomeapi.com.br/json/all';

export const ACTIONS = {
  LOGIN: 'LOGIN',
  GET_CURRENCIES: 'GET_CURRENCIES',
  ADD_EXPENSE: 'ADD_EXPENSE',
  EDIT_EXPENSE: 'EDIT_EXPENSE',
  CONFIRM_EDIT_EXPENSE: 'CONFIRM_EDIT_EXPENSE',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
};

export const setEmail = (email) => ({ type: ACTIONS.LOGIN, payload: email });

const getCurrencies = (currencies) => ({
  type: ACTIONS.GET_CURRENCIES,
  payload: currencies,
});

const addExpense = (expense) => ({
  type: ACTIONS.ADD_EXPENSE,
  payload: expense,
});

export const editExpense = (expenseId) => ({
  type: ACTIONS.EDIT_EXPENSE,
  payload: parseInt(expenseId, 10),
});

const confirmEditExpense = (expense) => ({
  type: ACTIONS.CONFIRM_EDIT_EXPENSE,
  payload: expense,
});

export const removeExpense = (expenseId) => ({
  type: ACTIONS.REMOVE_EXPENSE,
  payload: parseInt(expenseId, 10),
});

export const getCurrenciesThunk = () => async (dispatch) => {
  const CODE_CURRENCY_LENGTH = 3;
  const response = await fetch(BASE_URL);
  const data = await response.json();

  const currencies = Object.keys(data)
    .filter((code) => code.length === CODE_CURRENCY_LENGTH);

  dispatch(getCurrencies(currencies));
};

export const addExpenseThunk = (expense) => async (dispatch) => {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  expense.exchangeRates = data;

  dispatch(addExpense(expense));
};

export const confirmEditExpenseThunk = (expense) => (dispatch, getState) => {
  const { wallet: { expenses } } = getState();
  const { exchangeRates } = expenses.find(({ id }) => id === expense.id);

  expense.exchangeRates = exchangeRates;

  dispatch(confirmEditExpense(expense));
};
