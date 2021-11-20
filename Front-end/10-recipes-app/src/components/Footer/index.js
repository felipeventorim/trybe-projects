import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './index.css';

const Footer = () => {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <input
        type="image"
        src={ drinkIcon }
        alt="Icone de taça"
        onClick={ () => history.push('/bebidas') }
        data-testid="drinks-bottom-btn"
      />
      <input
        type="image"
        src={ exploreIcon }
        alt="Icone de bussola"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="Icone de carne"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/comidas') }
      />
    </footer>
  );
};

export default Footer;
