import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { product, addToCart } = this.props;
    const {
      title,
      price,
      thumbnail,
      id,
      shipping: { free_shipping: freeShipping },
    } = product;
    return (
      <div>
        <Link
          to={ { pathname: `/product-details/${id}`, product } }
          data-testid="product-detail-link"
        >
          <div data-testid="product">
            <div>
              <img src={ thumbnail } alt="product" />
            </div>
            <div>
              { freeShipping && <span data-testid="free-shipping">Frete Grátis</span> }
            </div>
            <div>
              { title }
            </div>
            <div>
              { price }
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={ () => addToCart(product) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Card;
