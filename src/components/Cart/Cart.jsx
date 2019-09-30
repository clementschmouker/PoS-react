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
  }

  render() {
    const { totalPrice } = this.props;
    return (
      <div className="cart">
        <div className="cart__wrapper">
          <h2 className="cart__title">Produits sélectionnés</h2>
          <p className="cart__price">Prix Total: {totalPrice} €</p>
          <button type="button" onClick={(() => this.emptyCartClick())}>Tout supprimer</button>
          <ul className="cart__list">
            {this.datas.map((value, index) => {
              return (
                <li key={uuid()} className="cart__list__el">
                  <div className="cart__list__el__text">
                    <h3>{value.name} x {value.quantity}</h3>
                    <span>{value.price * value.quantity}€</span>
                  </div>
                  <button type="button" onClick={(() => this.removeStack(index, value))}>Retirer</button>
                </li>
              );
            })}
          </ul>
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
