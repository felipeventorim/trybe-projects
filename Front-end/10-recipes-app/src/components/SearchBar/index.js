import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  requestByFirstLetter,
  requestByIngredient,
  requestByName,
} from '../../services/requestAPI';
import Label from '../Label';
import { saveFoods } from '../../redux/actions';

const SearchBar = () => {
  const alertMessage = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const history = useHistory();
  const { location: { pathname } } = history;
  const [searchWord, setSearchWord] = useState('');
  const [radioFilter, setFilter] = useState('');
  const [domain, setDomain] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname === '/comidas') {
      setDomain('themealdb');
    }
    if (pathname === '/bebidas') {
      setDomain('thecocktaildb');
    }
  }, [pathname]);

  const validateSearchWord = async () => {
    if (searchWord.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      const dataByFirstLetter = await requestByFirstLetter(searchWord, domain);
      if (dataByFirstLetter) {
        dispatch(saveFoods(dataByFirstLetter));
      } else {
        global.alert(alertMessage);
      }
    }
  };

  const requestOnClick = async () => {
    const targetId = pathname === '/comidas' ? 'idMeal' : 'idDrink';
    const dataKey = pathname === '/comidas' ? 'meals' : 'drinks';
    if (radioFilter === 'ingredient') {
      const dataByIngredients = await requestByIngredient(searchWord, domain);
      if (dataByIngredients) {
        dispatch(saveFoods(dataByIngredients));
      } else {
        global.alert(alertMessage);
      }
    }
    if (radioFilter === 'name') {
      const dataByName = await requestByName(searchWord, domain);
      if (dataByName[dataKey]) {
        if (dataByName[dataKey].length === 1) {
          history.push(`${pathname.split('/')[1]}/${dataByName[dataKey][0][targetId]}`);
        } else {
          dispatch(saveFoods(dataByName));
        }
      } else {
        global.alert(alertMessage);
      }
    }
    if (radioFilter === 'firstLetter') {
      validateSearchWord();
    }
  };

  return (
    <>
      <Label
        type="text"
        placeholder="Buscar receita"
        dataTest="search-input"
        value={ searchWord }
        onChange={ (event) => setSearchWord(event.target.value) }
      />
      <Label
        type="radio"
        dataTest="ingredient-search-radio"
        text="Ingrediente"
        onChange={ (event) => {
          setFilter(event.target.value);
        } }
        value="ingredient"
        name="search-radio"
      />
      <Label
        type="radio"
        dataTest="name-search-radio"
        name="search-radio"
        onChange={ (event) => {
          setFilter(event.target.value);
        } }
        value="name"
        text="Nome"
      />
      <Label
        type="radio"
        dataTest="first-letter-search-radio"
        onChange={ (event) => setFilter(event.target.value) }
        name="search-radio"
        value="firstLetter"
        text="Primeira letra"
      />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ requestOnClick }
      >
        Buscar
      </button>
    </>
  );
};

export default SearchBar;
