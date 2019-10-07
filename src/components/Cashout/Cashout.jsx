import React, { Component } from 'react';
import './Cashout.scss';

import Cart from '../Cart/Cart';

export default class Cashout extends Component {
  render() {
    const selected = this.props.state;
    return (
      <div className="cashout">
        <div className="cashout__payment-method">
          <input type="radio" name="method" id="cash" value="cash" defaultChecked />
          <label htmlFor="cash">Cash</label>
          <input type="radio" name="method" id="bancontact" value="bancontact" />
          <label htmlFor="bancontact">Bancontact</label>
        </div>
        <div className="inputs">
          <div className="inputs__total">
          
          </div>
          <table className="inputs__keyboard">
            <tbody>
              <tr>
                <td>ESC</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
              </tr>
              <tr>
                <td>back</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
              </tr>
              <tr>
                <td className="empty"></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td className="empty"></td>
                <td>0</td>
                <td>.</td>
                <td>ENT</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Cart datas={selected.cart}
              totalPrice={selected.totalPrice}
              emptyCartClick={this.emptyCartClick}
              proceedToCashout={this.proceedToCashout}
        />
      </div>
    );
  }
}