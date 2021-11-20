const { species, employees, hours, prices } = require('./data');

// getSpeciesByIds
function getSpeciesByIds(...ids) {
  return ids.map((id) => species.find((specie) => specie.id === id));
}

// getAnimalsOlderThan
function getAnimalsOlderThan(animal, age) {
  return species.find((specie) =>
    specie.name === animal).residents.every((resident) =>
    resident.age >= age);
}

// getEmployeeByName
function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((employee) =>
    employee.firstName === employeeName
    || employee.lastName === employeeName);
}

// createEmployee
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// isManager
function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

// addEmployee
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// countAnimals
function countAnimals(animalSpecies) {
  const counter = {};
  species.forEach((specie) => {
    counter[specie.name] = specie.residents.length;
  });
  if (!animalSpecies) {
    return counter;
  }
  return counter[animalSpecies];
}

// calculateEntry
function calculateEntry(entrants) {
  if (!entrants || !Object.keys(entrants).length) {
    return 0;
  }

  return Object.entries(prices).reduce((acc, priceType) => {
    const entryType = priceType[0];
    const price = priceType[1];
    if (entrants[entryType]) {
      return acc + (price * entrants[entryType]);
    }
    return acc;
  }, 0);
}
/* Forma reduzida:
return Object.entries(prices).reduce((acc, priceType) =>
    ((entrants[priceType[0]]) ? acc + (priceType[1] * entrants[priceType[0]]) : acc), 0);
*/
/* Tipos de entrada fixos:
let { Adult = 0, Child = 0, Senior = 0 } = entrants;
Adult *= prices.Adult;
Child *= prices.Child;
Senior *= prices.Senior;

return Adult + Child + Senior;
*/

// getAnimalMap
function byLocation(name) {
  return name;
}

function filtredBySex(residents, sex) {
  let filtredResidents = residents;
  filtredResidents = filtredResidents.filter((resident) => resident.sex === sex);
  return filtredResidents;
}

function sortResidents(animals) {
  let sortAnimals = animals;
  sortAnimals = sortAnimals.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return sortAnimals;
}

function byName(name, residents, sex = false, sort = false) {
  let filtredResidents = [...residents];

  if (sex) filtredResidents = filtredBySex(filtredResidents, sex);
  if (sort) filtredResidents = sortResidents(filtredResidents);

  return { [name]: filtredResidents.reduce((acc, resident) => {
    acc.push(resident.name);
    return acc;
  }, []) };
}

function categorized(callback, sex, sort) {
  const listAnimals = {};
  species.forEach((specie) => {
    const { name, location, residents } = specie;
    if (Object.keys(listAnimals).includes(location)) {
      listAnimals[location].push(callback(name, residents, sex, sort));
    } else {
      listAnimals[location] = [callback(name, residents, sex, sort)];
    }
  });
  return listAnimals;
}

function getAnimalMap(options) {
  if (!options || !options.includeNames) {
    return categorized(byLocation);
  }
  const { sex, sorted } = options;
  return categorized(byName, sex, sorted);
}

// getSchedule
function message(open, close) {
  let tempClose = close;
  if (tempClose) {
    tempClose -= 12;
  }
  if (open && tempClose) {
    return `Open from ${open}am until ${tempClose}pm`;
  }
  return 'CLOSED';
}

function getSchedule(dayName) {
  const schedule = {};
  Object.keys(hours).forEach((day) => {
    schedule[day] = message(hours[day].open, hours[day].close);
  });

  if (!dayName) {
    return schedule;
  }

  return Object.keys(schedule).reduce((acc, day) => {
    if (day === dayName) {
      acc[day] = schedule[day];
    }
    return acc;
  }, {});
}

// getOldestFromFirstSpecies
function getOldestFromFirstSpecies(id) {
  const animalID = employees.find((employee) =>
    employee.id === id).responsibleFor[0];
  const oldAnimal = species.find((specie) =>
    specie.id === animalID).residents.reduce((acc, resident) =>
    ((resident.age > acc.age) ? resident : acc));
  return Object.values(oldAnimal);
}

// increasePrices
function calculateNewPrice(price, percentage) {
  return Math.round((price * 100) + (price * percentage)) / 100;
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((price) => {
    prices[price] = calculateNewPrice(prices[price], percentage);
  });
}

// getEmployeeCoverage
function createListOfEmployees() {
  const listEmployees = {};
  employees.forEach((employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    const name = `${firstName} ${lastName}`;
    const animal = getSpeciesByIds(...responsibleFor).map((animals) =>
      animals.name);
    listEmployees[name] = animal;
  });
  return listEmployees;
}

function fullNameEmployee(idOrName) {
  const objEmployee = employees.find((employee) =>
    employee.id === idOrName
    || employee.firstName === idOrName
    || employee.lastName === idOrName);
  return `${objEmployee.firstName} ${objEmployee.lastName}`;
}

function getEmployeeCoverage(idOrName) {
  const listEmployees = createListOfEmployees();

  if (!idOrName) {
    return listEmployees;
  }

  const nameOfEmployee = fullNameEmployee(idOrName);
  return Object.keys(listEmployees).reduce((acc, name) => {
    if (name === nameOfEmployee) {
      acc[name] = listEmployees[name];
    }
    return acc;
  }, {});
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
