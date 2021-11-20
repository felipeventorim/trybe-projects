import React from 'react';
import PropTypes from 'prop-types';
import ProductRates from '../components/ProductRates';
import RateForm from '../components/RateForm';

export default class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchProduct(id);
  }

  async getProduct(id) {
    const fetched = await fetch(`https://api.mercadolibre.com/items?ids=${id}`);
    const product = await fetched.json();
    return product[0].body;
  }

  async fetchProduct(id) {
    this.getProduct(id).then((response) => this.setState({ product: response }));
  }

  render() {
    const { product } = this.state;
    if (!product) return <div>Loading...</div>;

    const { match: { params: { id } } } = this.props;

    const { addToCart, addRate, ratings } = this.props;
    const {
      title,
      price,
      thumbnail,
      attributes,
      shipping: { free_shipping: freeShipping },
    } = product;
    return (
      <div>
        <h4 data-testid="product-detail-name">{title}</h4>
        <h4>{`R$ ${price}`}</h4>
        <img src={ thumbnail } alt="" />
        <div>
          { freeShipping && <span data-testid="free-shipping">Frete Grátis</span> }
        </div>
        <ul>
          {attributes.map((attribute) => (
            <li key={ attribute.id }>{`${attribute.name}: ${attribute.value_name}`}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={ () => addToCart(product) }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>

        <RateForm addRate={ addRate } id={ id } />

        <ProductRates rating={ ratings[id] } />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  addRate: PropTypes.func.isRequired,
  ratings: PropTypes.objectOf(PropTypes.object).isRequired,
};
