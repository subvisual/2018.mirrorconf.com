import React, { Component } from 'react';

import './index.css';

import planet1 from './planet1.svg';
import planet2 from './planet2.svg';
import planet3 from './planet3.svg';

export default class Planets extends Component {
  render() {
    return (
      <div className="Planets">
        <img className="Planets-planet first" src={planet1} alt="" />
        <img className="Planets-planet second" src={planet2} alt="" />
        <img className="Planets-planet third" src={planet3} alt="" />
      </div>
    );
  }
}
