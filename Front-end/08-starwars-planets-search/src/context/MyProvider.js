import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import MyContext from './MyContext';
import fetchPlanets from '../services';
import { OPTION_COMPARISON } from '../data';

const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
const INITIAL_FILTER_STATE = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

function MyProvider({ children }) {
  const [filters, setFilter] = useState(INITIAL_FILTER_STATE);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);

  const fetchApi = useCallback(async () => {
    const response = await fetchPlanets(URL);
    response.results.forEach((element) => delete element.residents);

    setFilteredPlanets(response.results);
    setAllPlanets(response.results);
  }, []);

  const addFilterByName = ({ target }) => {
    setFilter({
      ...filters,
      filterByName: { name: target.value },
    });
  };

  const addFilterByNumericValues = (filter) => {
    setFilter({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, filter],
    });
  };

  const removeFilterByNumericValues = (value) => {
    setFilter({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues
        .filter((filter) => filter.column !== value),
    });
  };

  const handleSort = (column, sort) => {
    setFilter({
      ...filters,
      order: {
        column,
        sort,
      },
    });
  };

  useEffect(() => {
    const filterPlanets = () => {
      const { filterByName: { name = '' }, filterByNumericValues } = filters;
      const regexName = new RegExp(name, 'i');

      if (!filterByNumericValues.length) {
        return allPlanets.filter((planet) => planet.name.match(regexName));
      }

      return filterByNumericValues.reduce((acc, { column, comparison, value }) => (
        acc.filter((planet) => {
          switch (comparison) {
          case OPTION_COMPARISON[0]:
            return Number(planet[column]) > Number(value);
          case OPTION_COMPARISON[1]:
            return Number(planet[column]) < Number(value);
          case OPTION_COMPARISON[2]:
            return Number(planet[column]) === Number(value);
          default:
            return false;
          }
        })
      ), allPlanets)
        .filter((planet) => planet.name.match(regexName));
    };

    setFilteredPlanets(filterPlanets());
  }, [allPlanets, filters]);

  const context = {
    allPlanets,
    fetchApi,
    filters,
    filteredPlanets,
    addFilterByName,
    addFilterByNumericValues,
    removeFilterByNumericValues,
    handleSort,
  };

  return (
    <div>
      <MyContext.Provider value={ context }>
        {children}
      </MyContext.Provider>
    </div>
  );
}

MyProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MyProvider;
