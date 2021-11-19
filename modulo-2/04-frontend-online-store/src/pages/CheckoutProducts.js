import React from 'react';
import PropTypes from 'prop-types';
import BuyerInfos from '../components/BuyerInfos';
import PaymentMethod from '../components/PaymentMethod';

export default class CheckoutProducts extends React.Component {
  totalPrice = (cart) => cart
    .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

  reviewProducts = () => {
    const { cart } = this.props;
    return (
      <div>
        <h4>Revise seus Produtos</h4>
        { cart.map(({ id, title, price, quantity, thumbnail }) => (
          <div key={ id }>
            <img src={ thumbnail } alt="" />
            <span>{title}</span>
            <span>{`R$ ${price * quantity}`}</span>
          </div>
        )) }
        <h4>{`Total: ${this.totalPrice(cart)}`}</h4>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.reviewProducts() }
        <BuyerInfos />
        <PaymentMethod />
        <button type="button">Comprar</button>
      </div>
    );
  }
}

CheckoutProducts.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
