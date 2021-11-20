import React, { useContext, useEffect } from 'react';

import MyContext from '../context/MyContext';

const SORT_NUMBER = {
  ASC: 1,
  DESC: -1,
};

const INVERT_ORDER = -1;

function Table() {
  const {
    allPlanets,
    fetchApi,
    filteredPlanets,
    filters: { order },
  } = useContext(MyContext);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  if (!allPlanets.length) return <div className="loading">Carregando...</div>;

  const sortByNumber = (a, b) => {
    if (order.sort === 'ASC') return a[order.column] - b[order.column];
    if (order.sort === 'DESC') return b[order.column] - a[order.column];
    return 0;
  };

  const sortByString = (a, b) => {
    if (a[order.column] > b[order.column]) {
      return SORT_NUMBER[order.sort];
    }
    return SORT_NUMBER[order.sort] * INVERT_ORDER;
  };

  const sortPlanets = (a, b) => (
    a[order.column].match(/^\d/)
      ? sortByNumber(a, b) : sortByString(a, b)
  );

  return (
    <table>
      <thead>
        <tr>
          {
            Object.keys(allPlanets[0])
              .map((key) => <th key={ key }>{ key.replace('_', ' ') }</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          filteredPlanets.sort(sortPlanets).map((planet) => (
            <tr key={ planet.name }>
              {
                Object.values(planet).map((item, i) => (i === 0
                  ? <td key={ item } data-testid="planet-name">{item}</td>
                  : <td key={ item }>{item}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
