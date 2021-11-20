import React from 'react';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';

class CartIcon extends React.Component {
  quantityItems = () => {
    const { cart } = this.props;
    if (cart.length > 0) {
      return cart.reduce((acc, currItem) => acc + currItem.quantity, 0);
    }
  }

  saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

  render() {
    const { cart } = this.props;
    this.saveCart(cart);
    return (
      <Link to="/shopping-cart" data-testid="shopping-cart-button">
        <Badge
          data-testid="shopping-cart-size"
          badgeContent={ this.quantityItems() }
          color="secondary"
        >
          <ShoppingCartIcon style={ { fontSize: 70 } } />
        </Badge>
      </Link>
    );
  }
}

CartIcon.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CartIcon;
