import React, { Component } from 'react';
import './Cashout.scss';

import Cart from '../Cart/Cart';

export default class Cashout extends Component {
  constructor(props) {
    super(props);

    this.totalEntered = 0;
    this.totalDisplay = '';
    this.returnToProductChoice = props.returnToProductChoice;
  }

  onCalculatorClick(e) {
    const val = e.target.value;
    let tempTotal = this.totalDisplay.toString() + val.toString();
    this.totalDisplay = tempTotal;
    this.totalEntered = parseFloat(tempTotal);
    this.setState({}); // used to refresh the display
  }

  onDotClick() {
    const tempTotal = this.totalEntered.toString() + '.';
    this.totalDisplay = tempTotal;
    this.totalEntered = parseFloat(tempTotal);
    this.setState({}); // used to refresh the display
  }

  clearDisplay() {
    this.totalDisplay = '0';
    this.totalEntered = 0;
    this.setState({}); // used to refresh the display
  }

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
            {this.totalDisplay}
          </div>
          <table className="inputs__keyboard">
            <tbody>
              <tr>
                <td onClick={(() => this.returnToProductChoice())}>ESC</td>
                <td><button type="button" value="7" onClick={(e => this.onCalculatorClick(e))}>7</button></td>
                <td><button type="button" value="8" onClick={(e => this.onCalculatorClick(e))}>8</button></td>
                <td><button type="button" value="9" onClick={(e => this.onCalculatorClick(e))}>9</button></td>
              </tr>
              <tr>
                <td><button type="button" onClick={(() => this.clearDisplay())}>Effacer</button></td>
                <td><button type="button" value="4" onClick={(e => this.onCalculatorClick(e))}>4</button></td>
                <td><button type="button" value="5" onClick={(e => this.onCalculatorClick(e))}>5</button></td>
                <td><button type="button" value="6" onClick={(e => this.onCalculatorClick(e))}>6</button></td>
              </tr>
              <tr>
                <td className="empty"></td>
                <td><button type="button" value="1" onClick={(e => this.onCalculatorClick(e))}>1</button></td>
                <td><button type="button" value="2" onClick={(e => this.onCalculatorClick(e))}>2</button></td>
                <td><button type="button" value="3" onClick={(e => this.onCalculatorClick(e))}>3</button></td>
              </tr>
              <tr>
                <td className="empty"></td>
                <td><button type="button" value="0" onClick={(e => this.onCalculatorClick(e))}>0</button></td>
                <td><button type="button" onClick={(() => this.onDotClick())}>.</button></td>
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