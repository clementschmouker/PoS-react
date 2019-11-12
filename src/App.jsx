import React, { Component } from 'react';
import './App.scss';

import Header from './components/Header/Header';
import ChooseProduct from './components/ChooseProduct/ChooseProduct';
import Cashout from './components/Cashout/Cashout';
import Receipt from './components/Receipt/Receipt';

const elements = require('./products.json');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      cartOrder: [],
      totalPrice: 0,
      receivedMoney: 0,
      receivedMoneyDisplay: 0,
      conveyorNumber: 0,
      conveyorNumberDisplay: 0,
      validateEmptyCart: false,
      cashout: false,
      cashoutConveyor: false,
      cashbackCalculated: false,
      showTicket: false,
      bancontact: false,
      cashback: 0,
      date: new Date(),
      ticketDate: new Date(),
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

  emptyCartClick = () => {
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
    selected.cashoutConveyor = false;
    this.setState(selected);
  }

  updateReceivedMoney = (newAmount) => {
    const selected = this.state;
    selected.receivedMoney = newAmount;
    this.setState(selected);
  }

  updateConveyorNumber = (newNumber) => {
    const selected = this.state;
    selected.conveyorNumber = newNumber;
    this.setState(selected);
  }

  calculateCashback = () => {
    const selected = this.state;
    selected.cashbackCalculated = true;
    selected.receivedMoneyDisplay = selected.receivedMoney;
    if (selected.receivedMoney - selected.totalPrice >= 0) {
      selected.cashback = selected.receivedMoney - selected.totalPrice;
    } else {
      selected.cashback = 0;
    }
    this.setState(selected);
    this.switchToConveyor();
  }

  switchToConveyor = () => {
    const selected = this.state;
    selected.cashoutConveyor = true;
    this.setState(selected);
  }

  showTicketPage = () => {
    const selected = this.state;
    selected.cashout = false;
    selected.showTicket = true;
    selected.ticketDate = new Date();
    this.setState(selected);
  }

  useBancontact = (bool) => {
    const selected = this.state;
    selected.bancontact = bool;
    this.setState(selected);
  }


  // Render
  render() {
    const selected = this.state;

    return (
      <div className="App">
        <Header name="5 à sec" state={selected}/>
        {/* Product choice */}
        {selected.cashout === false && selected.showTicket === false && (
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
                   updateReceivedMoney={this.updateReceivedMoney}
                   updateConveyorNumber= {this.updateConveyorNumber}
                   calculateCashback={this.calculateCashback}
                   useBancontact={this.useBancontact}
                   showTicketPage={this.showTicketPage}
          />
        )}
        {/* Ticket Page */}
        {selected.showTicket && (
          <Receipt state={selected}/>
        )}
      </div>
    );
  }
}
