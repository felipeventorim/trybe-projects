import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/Recipes/RecipesProvider';
import RecipesList from './components/RecipeList';
import FoodDetails from './components/FoodDetails';
import DrinkDetails from './components/DrinkDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarOrigem from './pages/ExplorarOrigem';
import ExplorarBebidas from './pages/ExplorarBebidas';
import NotFound from './pages/NotFound';
import ExpBebidaIngredientes from './pages/ExpBebidasIngredientes';
import ExpComidaIngredientes from './pages/ExpComidasIngredintes';
import ReceitasFeitas from './pages/ReceitasFeitas';
import InProgress from './components/InProgress';
import FavoritesRe from './FavoritesRecipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/comidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/comidas/:id" component={ FoodDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/comidas" component={ RecipesList } />
        <Route exact path="/bebidas" component={ RecipesList } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExpComidaIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarOrigem } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExpBebidaIngredientes }
        />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ FavoritesRe } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
