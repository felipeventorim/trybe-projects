import React from 'react';
import Footer from '../components/Footer/index';
import Header from '../components/Header';
import ButtonExplore from '../components/ButtonExplore';

const ExplorarComidas = () => (
  <>
    <Header title="Explorar Comidas" displaySearchBtn={ false } />
    <ButtonExplore type="comidas" />
    <Footer />
  </>
);

export default ExplorarComidas;
