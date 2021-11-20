import React from 'react';
import Footer from '../components/Footer/index';
import Header from '../components/Header';
import ButtonExplore from '../components/ButtonExplore';

const ExplorarBebidas = () => (
  <>
    <Header title="Explorar Bebidas" displaySearchBtn={ false } />
    <ButtonExplore type="bebidas" />
    <Footer />
  </>
);

export default ExplorarBebidas;
