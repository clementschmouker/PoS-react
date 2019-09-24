import uuid from 'react-uuid';
import React, { Component } from 'react';
import './App.scss';

import Product from './components/Product';

const elements = [
  {
    id: 0,
    name: 't-shirt',
    price: 2,
  },
  {
    id: 1,
    name: 'robe',
    price: 4,
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      totalPrice: 0,
    };
  }


  // Handlers
  addToCart = (e, data) => {
    // handle click
    const selected = this.state;
    selected.cart.push(data);
    selected.totalPrice += data.price;
    this.setState(selected);
  }

  removeFromCart = (index, data) => {
    const selected = this.state;
    selected.cart.splice(index, 1);
    selected.totalPrice -= data.price;
    this.setState(selected);
  }


  // Render
  render() {
    const selected = this.state;
    return (
      <div className="App">
        <h1>Choisissez un produit</h1>
        <ul className="product-list">
          {elements.map((value) => <Product key={uuid()} name={value.name} price={value.price} onClick={((e) => this.addToCart(e, value))} />)}
        </ul>
        <h2>Produits sélectionnés</h2>
        <p>Prix Total: {selected.totalPrice} €</p>
        <ul className="product-list">
          {selected.cart.map((value, index) => <Product key={uuid()} name={value.name} price={value.price} onClick={(() => this.removeFromCart(index, value))} />)}
        </ul>
      </div>
    );
  }
}

export default App;
