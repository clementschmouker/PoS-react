import uuid from 'react-uuid';
import React, { Component } from 'react';

import './Receipt.scss';


export default class Receipt extends Component {
  constructor(props) {
    super(props);

    this.date = new Date();
    this.datas = this.props.cart;
    
  }

  componentDidMount() { // returns to homepage after printing
    // TODO store datas in sales table
    window.print();
    window.location.href = '/';
  }

  render() {
    const selected = this.props.state;
    
    let day = this.date.getDate();
    if (day.toString().length < 2) { // Format day with leading 0
      day = '0' + this.date.getDate();
    }
    let month = this.date.getMonth() + 1;
    if (month.toString().length < 2) { // Format Month with leading 0
      month = '0' + (this.date.getMonth() + 1);
    }
    const year = this.date.getFullYear();

    return (
      <div className="receipt">
        <p>Ticket créé le :
          <span>{day}/{month}/{year} à {this.date.toLocaleTimeString('FR-fr')}</span>
        </p>
        <div>Pour:
          <ul className="receipt__list">
            {selected.cart.map((value) => {
              return (
                <li key={uuid()} className="receipt__list__el">
                  <div className="receipt__list__el__text">
                    <h3>{value.quantity} x {value.name}</h3>
                    <span>{value.price * value.quantity}€</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
          <div>Payé par {selected.bancontact ? 'Bancontact' : 'Cash'}</div>
          <div>Prix: {selected.totalPrice} €</div>
          <div>Reçu: {selected.receivedMoney} €</div>
          {selected.cashback !== 0 && (
            <p>Rendu: {selected.cashback} €</p>
          )}
          <div>Numéro de convoyeur: {selected.conveyorNumber}</div>
      </div>
    );
  }
}
