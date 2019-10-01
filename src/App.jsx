import uuid from 'react-uuid';
import React, { Component } from 'react';
import './App.scss';

import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';

import Header from './components/Header/Header';

const elements = require('./products.json');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      totalPrice: 0,
      validateEmptyCart: false,
      date: new Date(),
      address: "240 Rue de Linthout 1040 Bruxelles",
    };
    this.removeFromCart = this.removeFromCart.bind(this);
  }


  // Handlers
  addToCart = (data) => {
    // handle click
    const selected = this.state;
    // if product has no set quantity
    if (!data.quantity) {
      data.quantity = 1;
    }
    const exists = selected.cart.find(el => el.id === data.id); // check if product already is in cart
    if (exists) {
      // increase quantity of existing product
      exists.quantity += 1;
    } else {
      // create new entry for product if needed
      selected.cart.push(data);
    }
    // update cart total price
    selected.totalPrice += data.price;
    this.setState(selected);
  }

  decreaseFromCart = (index, data) => { // remove one instance of product from cart
    const selected = this.state;
    const exists = selected.cart.find(el => el.id === data.id);
    if (exists) {
      exists.quantity -= 1;
    }
    if (exists.quantity <= 0) {
      selected.cart.splice(index, 1);
    }
    selected.totalPrice -= data.price;
    this.setState(selected);
  }

  removeFromCart = (index, data) => { // remove product stack from cart
    const selected = this.state;
    selected.cart.splice(index, 1);
    selected.totalPrice -= data.price * data.quantity;
    this.setState(selected);
  }

  emptyCartClick = () => { // show the "are you sure" popup
    const selected = this.state;
    selected.validateEmptyCart = !selected.validateEmptyCart;
    this.setState(selected);
  }

  emptyCart = () => { // remove all items from the cart
    const selected = this.state;
    selected.cart.splice(0, selected.cart.length);
    selected.totalPrice = 0;
    this.setState(selected);
    this.emptyCartClick();
  }


  // Render
  render() {
    const selected = this.state;

    return (
      <div className="App">
        <Header name="5 à sec" state={this.state}/>
        <div className="App__wrapper">
          <div className="App__product-list">
            <div className="App__main__product-list">
              {elements.map((value) => <Product key={uuid()} name={value.name} price={value.price} onClick={(() => this.addToCart(value))} />)}
            </div>
          </div>
          <Cart datas={selected.cart}
                totalPrice={selected.totalPrice}
                removeStack={this.removeFromCart}
                emptyCartClick={this.emptyCartClick}
                decreaseFromCart={this.decreaseFromCart}
                addToCart={this.addToCart}
          />
          {/* Conditionnal popup */}
        </div>
        {selected.validateEmptyCart && (
          <div className="empty-validate">
            <div className="empty-validate__wrapper">
              <p>Êtes-vous sûr de vouloir tout supprimer ?</p>
              <button type="button" onClick={this.emptyCart}>Oui</button>
              <button type="button" onClick={this.emptyCartClick}>Non</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
