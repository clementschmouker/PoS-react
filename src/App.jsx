import React, { Component } from 'react';
import './App.scss';

import Header from './components/Header/Header';
import ChooseProduct from './components/ChooseProduct/ChooseProduct';
import Cashout from './components/Cashout/Cashout';

const elements = require('./products.json');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      cartOrder: [],
      totalPrice: 0,
      validateEmptyCart: false,
      cashout: false,
      date: new Date(),
      address: "240 Rue de Linthout 1040 Bruxelles",
    };
  }


  // Handlers
  addToCart = (data) => {
    // handle click
    const selected = this.state;
    selected.cartOrder.push(data.id);
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


  removeFromCart = (data) => {
    const selected = this.state;
    selected.cartOrder.pop();
    const toRemoveEl = selected.cart.find(el => el.id === data.id);
    if (toRemoveEl) {
      toRemoveEl.quantity -=1;
      if (toRemoveEl.quantity === 0) {
        selected.cart.pop();
      }
    }
    selected.totalPrice -= toRemoveEl.price;
    this.setState(selected);
  }

  emptyCartClick = () => { // show the "are you sure" popup
    const selected = this.state;
    // selected.validateEmptyCart = !selected.validateEmptyCart;
    if (selected.cartOrder.length > 0) {
      const toRemove = selected.cart.find(el => el.id === selected.cartOrder[selected.cartOrder.length - 1]);
      this.removeFromCart(toRemove);
    }
    this.setState(selected);
  }

  proceedToCashout = () => {
    const selected = this.state;
    selected.cashout = true;
    this.setState(selected);
  }
  
  returnToProductChoice = () => {
    const selected = this.state;
    selected.cashout = false;
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
        <Header name="5 à sec" state={selected}/>
        {selected.cashout === false && (
          <ChooseProduct elements={elements} 
                         state={selected}
                         addToCart={this.addToCart}
                         emptyCartClick={this.emptyCartClick}
                         proceedToCashout={this.proceedToCashout}
          />
        )}
        {/* Cashout */}
        {selected.cashout && (
          <Cashout state={selected}
                   returnToProductChoice={this.returnToProductChoice}
          />
        )}
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
