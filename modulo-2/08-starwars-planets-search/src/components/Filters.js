import React, { useContext, useState } from 'react';

import MyContext from '../context/MyContext';

import { OPTIONS_COLUMN, OPTION_COMPARISON } from '../data';
import Input from './Input';
import Select from './Select';

function Filters() {
  const {
    filters: { filterByName: { name } },
    filters: { filterByNumericValues },
    addFilterByName,
    addFilterByNumericValues,
    removeFilterByNumericValues,
    handleSort,
    allPlanets,
  } = useContext(MyContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState(OPTION_COMPARISON[0]);
  const [value, setValue] = useState(0);
  const [orderColumn, setOrderColumn] = useState('name');
  const [orderSort, setOrderSort] = useState('ASC');

  const columnsList = () => {
    const filters = filterByNumericValues.map((filter) => filter.column);
    return filterByNumericValues.length
      ? OPTIONS_COLUMN
        .filter((opt) => !filters.includes(opt))
      : OPTIONS_COLUMN;
  };

  if (!allPlanets.length) return <div />;

  return (
    <div className="form">
      <Input
        type="text"
        name="name"
        value={ name }
        placeholder="Search name"
        onchange={ addFilterByName }
      />
      <div>
        <Select
          name="column"
          onChange={ ({ target }) => setColumn(target.value) }
          options={ columnsList() }
          testid="column-filter"
        />
        <Select
          name="comparison"
          onChange={ ({ target }) => setComparison(target.value) }
          options={ OPTION_COMPARISON }
          testid="comparison-filter"
        />
        <Input
          type="number"
          name="value"
          value={ value }
          placeholder="0"
          onchange={ ({ target }) => setValue(target.value) }
        />
        <button
          className="btn"
          type="button"
          data-testid="button-filter"
          onClick={ () => addFilterByNumericValues({ column, comparison, value }) }
        >
          Filter
        </button>
        { filterByNumericValues.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            {filter.column}
            <button
              name={ filter.column }
              type="button"
              onClick={ ({ target }) => removeFilterByNumericValues(target.name) }
            >
              X
            </button>
          </div>
        )) }
      </div>
      <div className="sort">
        <Select
          name="sort"
          onChange={ ({ target }) => setOrderColumn(target.value) }
          options={ Object.keys(allPlanets[0]) }
          testid="column-sort"
        />
        <label htmlFor="ASC">
          <input
            type="radio"
            name="sort"
            id="ASC"
            value="ASC"
            checked={ orderSort === 'ASC' }
            onClick={ ({ target }) => setOrderSort(target.value) }
            data-testid="column-sort-input-asc"
          />
          ASC
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            name="sort"
            id="DESC"
            value="DESC"
            checked={ orderSort === 'DESC' }
            onClick={ ({ target }) => setOrderSort(target.value) }
            data-testid="column-sort-input-desc"
          />
          DESC
        </label>
        <button
          className="btn"
          type="button"
          onClick={ () => handleSort(orderColumn, orderSort) }
          data-testid="column-sort-button"
        >
          Sort
        </button>
      </div>
    </div>
  );
}

export default Filters;
