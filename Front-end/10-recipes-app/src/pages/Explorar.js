import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/index';
import Header from '../components/Header';

function Explorar() {
  return (
    <>
      <Header title="Explorar" displaySearchBtn={ false } />
      <Link to="explorar/comidas">
        <button
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Explorar;
