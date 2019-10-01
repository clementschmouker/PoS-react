import uuid from 'react-uuid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Cart.scss';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.datas = props.datas;
    this.removeStack = props.removeStack;
    this.emptyCartClick = props.emptyCartClick;
    this.decreaseFromCart = props.decreaseFromCart;
    this.addToCart = props.addToCart;
  }

  render() {
    const { totalPrice } = this.props;
    return (
      <div className="cart">
        <div className="cart__wrapper">
          <div className="cart__infos">
            <h2 className="cart__infos__title">Produits sélectionnés</h2>
            <p className="cart__infos__price">Prix Total: {totalPrice} €</p>
          </div>
          <ul className="cart__list">
            {this.datas.map((value, index) => {
              return (
                <li key={uuid()} className="cart__list__el">
                  <div className="cart__list__el__text">
                    <h3>{value.name} x {value.quantity}</h3>
                    <span>{value.price * value.quantity}€</span>
                  </div>
                  <div className="cart__list__el__actions button-list">
                    <div className="button-list__manipulate">
                      <button type="button" onClick={(() => this.addToCart(value))}>+1</button>
                      <button type="button" onClick={(() => this.decreaseFromCart(index, value))}>-1</button>
                    </div>
                    <button type="button" onClick={(() => this.removeStack(index, value))}>Retirer</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart__actions">
            <button className="cart__actions__cancel" type="button" onClick={(() => this.emptyCartClick())}>Tout supprimer</button>
            <button className="cart__actions__proceed" type="button">Procéder au paiement</button>
          </div>
        </div>
      </div>
    );
  }
}


Cart.propTypes = {
  datas: PropTypes.array,
  totalPrice: PropTypes.number,
  onElementClick: PropTypes.func,
  emptyCartClick: PropTypes.func,
};

Cart.defaultProps = {
  datas: '',
  totalPrice: 0,
  onElementClick: () => {},
  emptyCartClick: () => {},
};
