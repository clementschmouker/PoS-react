import React, { Component } from 'react';

import './Header.scss';

import home from '../../home.svg';


export default class Header extends Component {
  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.tick()
    },
    1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    const newState = this.props.state;
    newState.date = new Date();
    this.setState(newState);
  }

  render() {
    let day = this.props.state.date.getDate();
    if (day.toString().length < 2) { // Format day with leading 0
      day = '0' + this.props.state.date.getDate();
    }
    let month = this.props.state.date.getMonth() + 1;
    if (month.toString().length < 2) { // Format Month with leading 0
      month = '0' + (this.props.state.date.getMonth() + 1);
    }
    const year = this.props.state.date.getFullYear();
    return (
      <div className="header">
        <div className="header__controls">
          <button type="button" className="header__controls__home">
            <img src={home} alt="home"/>
          </button>
          <div className="header__date">
            <span className="header__date__time">{this.props.state.date.toLocaleTimeString('FR-fr')}</span>
            <span className="header__date__day">{day}/{month}/{year}</span>
          </div>
        </div>
        <div className="header__infos">
          <h1 className="header__infos__title">{this.props.name}</h1>
          <span>{this.props.state.address}</span>
        </div>
      </div>
    );
  }
}
