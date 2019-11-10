import uuid from 'react-uuid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Cart.scss';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.datas = props.datas;
    this.emptyCartClick = props.emptyCartClick;
    this.proceedToCashout = props.proceedToCashout;
    this.calculateCashback = props.calculateCashback;
  }


  render() {
    const { totalPrice } = this.props;
    const { isCashout } = this.props;
    let proceedContent;

    if (isCashout === true) {
      proceedContent = <button className="cart__actions__proceed" type="button" onClick={(() => this.calculateCashback())}>Continuer</button>
    } else {
      proceedContent = <button className="cart__actions__proceed" type="button" onClick={(() => this.proceedToCashout())}>Règlement</button>
    }

    return (
      <div className="cart">
        <div className="cart__wrapper">
          <ul className="cart__list">
            {this.datas.map((value) => {
              return (
                <li key={uuid()} className="cart__list__el">
                  <div className="cart__list__el__text">
                    <h3>{value.quantity} x {value.name}</h3>
                    <span>{value.price * value.quantity}€</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart__infos">
            <p className="cart__infos__price">Prix Total: {totalPrice} €</p>
            {this.props.receivedMoneyDisplay !== 0 && (
              <p className="cart__infos__received">Reçu: {this.props.receivedMoneyDisplay} €</p>
            )}
            {this.props.cashback !== 0 && (
              <p className="cart__infos__cashback">A rendre: {this.props.cashback} €</p>
            )}
            {this.props.conveyorNumber !== 0 && (
              <p className="cart__infos__conveyor">Numéro de convoyeur: {this.props.conveyorNumber}</p>
            )}
          </div>
          <div className="cart__actions">
            <button className="cart__actions__cancel" type="button" onClick={(() => this.emptyCartClick())}>Annuler</button>
            {proceedContent}
          </div>
        </div>
      </div>
    );
  }
}


Cart.propTypes = {
  datas: PropTypes.array,
  totalPrice: PropTypes.number,
  isCashout: PropTypes.bool,
  onElementClick: PropTypes.func,
  emptyCartClick: PropTypes.func,
};

Cart.defaultProps = {
  datas: '',
  totalPrice: 0,
  isCashout: false,
  onElementClick: () => {},
  emptyCartClick: () => {},
};
