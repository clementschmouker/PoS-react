import uuid from 'react-uuid';
import React, { Component } from 'react';
import './App.scss';

import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';

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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      totalPrice: 0,
    };
    this.removeFromCart = this.removeFromCart.bind(this);
  }


  // Handlers
  addToCart = (data) => {
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

  emptyCart = () => {
    const selected = this.state;
    selected.cart = [];
    selected.totalPrice = 0;
    this.setState(selected);
  }


  // Render
  render() {
    const selected = this.state;
    return (
      <div className="App">
        <div className="App__product-list">
          <h1 className="App__title">Choisissez un produit</h1>
          <div className="App__main__product-list">
            {elements.map((value) => <Product key={uuid()} name={value.name} price={value.price} onClick={(() => this.addToCart(value))} />)}
          </div>
        </div>
        <Cart datas={selected.cart} totalPrice={selected.totalPrice} onElementClick={this.removeFromCart} />
      </div>
    );
  }
}
