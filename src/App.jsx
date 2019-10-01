import uuid from 'react-uuid';
import React, { Component } from 'react';
import './App.scss';

import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';

import Header from './components/Header/Header';
import ChooseProduct from './components/ChooseProduct/ChooseProduct';

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
        <ChooseProduct elements={elements} 
                       state={selected}
                       addToCart={this.addToCart}
                       emptyCartClick={this.emptyCartClick}
        />
        {/* Conditionnal popup */}
        {selected.validateEmptyCart && (
          <div className="empty-validate">
            <div className="empty-validate__wrapper">
              <p>Êtes-vous sûr de vouloir tout annuler ?</p>
              <button type="button" onClick={this.emptyCart}>Oui</button>
              <button type="button" onClick={this.emptyCartClick}>Non</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
