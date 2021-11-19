import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import CheckoutProducts from './pages/CheckoutProducts';
import CartIcon from './components/CartIcon';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.subProduct = this.subProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.addRate = this.addRate.bind(this);
    this.state = {
      ratings: {},
      cart: this.readCart() ? this.readCart() : [],
    };
  }

  readCart = () => JSON.parse(localStorage.getItem('cart'));

  addToCart = (product) => {
    const {
      id,
      available_quantity: availableQuantity,
      price,
      title,
      thumbnail,
    } = product;
    const newItem = { id, availableQuantity, price, title, thumbnail, quantity: 1 };
    this.setState((prevState) => ({
      cart: [...prevState.cart, newItem],
    }));
  }

  addRate(id, rate) {
    this.setState((prevState) => {
      let value;
      const { ratings } = this.state;
      if (!ratings[id]) value = [rate];
      else value = [...prevState.ratings[id], rate];

      return ({
        ratings: {
          ...prevState.ratings,
          [id]: value,
        },
      });
    });
  }

  subProduct(id) {
    const { cart } = this.state;
    const newCart = (cart.map((product) => {
      if (id === product.id) {
        if (product.quantity === 0) return product;
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    }));
    this.setState({
      cart: newCart,
    });
  }

  addProduct(id) {
    const { cart } = this.state;
    const newCart = (cart.map((product) => {
      if (id === product.id) {
        if (product.quantity >= product.available_quantity) {
          return { ...product, quantity: product.available_quantity };
        }
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    }));
    this.setState({
      cart: newCart,
    });
  }

  render() {
    const { cart, ratings } = this.state;
    return (
      <BrowserRouter>
        <CartIcon cart={ cart } />
        <Switch>
          <Route exact path="/" render={ () => <Home addToCart={ this.addToCart } /> } />
          <Route
            exact
            path="/shopping-cart/checkout-products"
            render={ (props) => (
              <CheckoutProducts
                { ...props }
                cart={ cart }
              />) }
          />
          <Route
            exact
            path="/shopping-cart"
            render={ (props) => (
              <ShoppingCart
                { ...props }
                cart={ cart }
                onSubClick={ this.subProduct }
                onAddClick={ this.addProduct }
              />) }
          />
          <Route
            exact
            path="/product-details/:id"
            render={ (props) => (
              <ProductDetails
                addToCart={ this.addToCart }
                addRate={ this.addRate }
                ratings={ ratings }
                { ...props }
              />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
