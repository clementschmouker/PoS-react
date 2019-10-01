import uuid from 'react-uuid';
import React, { Component } from 'react';

import Product from '../Product/Product';
import Cart from '../Cart/Cart';

import './ChooseProduct.scss';

export default class ChooseProduct extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.props.addToCart;
    this.emptyCartClick = this.props.emptyCartClick
  }

  render() {
    const elements = this.props.elements;
    const selected = this.props.state;

    return (
      <div className="App__wrapper">
        <div className="App__main">
          <div className="App__main__product-list">
            {elements.map((value) => <Product key={uuid()} name={value.name} price={value.price} onClick={(() => this.addToCart(value))} />)}
          </div>
        </div>
        <Cart datas={selected.cart}
              totalPrice={selected.totalPrice}
              emptyCartClick={this.emptyCartClick}
        />
      </div>
    );
  }
}
