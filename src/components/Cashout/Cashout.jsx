import React, { Component } from 'react';
import './Cashout.scss';

import Cart from '../Cart/Cart';

export default class Cashout extends Component {
  constructor(props) {
    super(props);

    this.totalEntered = 0;
    this.totalDisplay = '';
    this.conveyorNumber = 0;
    this.conveyorNumberDisplay = '';
    this.returnToProductChoice = props.returnToProductChoice;
    this.updateReceivedMoney = props.updateReceivedMoney;
    this.updateConveyorNumber = props.updateConveyorNumber;
    this.calculateCashback = props.calculateCashback;
  }

  onCalculatorClick(e) {
    const val = e.target.value;
    const { state } = this.props;
    if (state.cashoutConveyor === true) {
      console.log(state.cashoutConveyor);
      const tempConveyor = this.conveyorNumberDisplay.toString() + val.toString();
      this.conveyorNumberDisplay = tempConveyor;
      this.conveyorNumber = parseFloat(tempConveyor);
      this.updateConveyorNumber(this.conveyorNumber);
    } else {
      const tempTotal = this.totalDisplay.toString() + val.toString();
      this.totalDisplay = tempTotal;
      this.totalEntered = parseFloat(tempTotal);
      this.updateReceivedMoney(this.totalEntered);
    }
  }

  onDotClick() {
    const tempTotal = this.totalEntered.toString() + '.';
    this.totalDisplay = tempTotal;
    this.totalEntered = parseFloat(tempTotal);
    this.updateReceivedMoney(this.totalEntered);
  }

  clearDisplay() {
    this.totalDisplay = '0';
    this.totalEntered = 0;
    this.updateReceivedMoney(this.totalEntered);
  }

  render() {
    const selected = this.props.state;

    let displayElement;

    if (selected.cashoutConveyor) {
      displayElement = (
        <div className="inputs__total">
          <span>Numéro de convoyeur: </span> <span className="inputs__total__numbers">{this.conveyorNumberDisplay}</span>
        </div>
      );
    } else {
      displayElement = (
        <div className="inputs__total">
          <span>Reçu: </span> <span className="inputs__total__numbers">{this.totalDisplay}</span>
        </div>
      );
    }

    return (
      <div className="cashout">
        <div className="cashout__payment-method">
          <input type="radio" name="method" id="cash" value="cash" defaultChecked />
          <label htmlFor="cash">Cash</label>
          <input type="radio" name="method" id="bancontact" value="bancontact" />
          <label htmlFor="bancontact">Bancontact</label>
        </div>
        <div className="inputs">
          {displayElement}
          <table className="inputs__keyboard">
            <tbody>
              <tr>
                <td onClick={(() => this.returnToProductChoice())}>Retour</td>
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
                <td><button type="button" onClick={(() => this.calculateCashback())}>ENT</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <Cart datas={selected.cart}
              totalPrice={selected.totalPrice}
              conveyorNumber={selected.conveyorNumber}
              isCashout={selected.cashout}
              cashback={selected.cashback}
              emptyCartClick={this.emptyCartClick}
              proceedToCashout={this.proceedToCashout}
              calculateCashback = {this.calculateCashback}
              receivedMoneyDisplay={selected.receivedMoneyDisplay}
        />
      </div>
    );
  }
}
