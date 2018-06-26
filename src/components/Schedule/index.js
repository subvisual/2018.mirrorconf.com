import React, { Component } from 'react';

import './index.css';

import schedule from './schedule.png';
import scheduleMobile from './schedule-mobile.png';

export default class Schedule extends Component {
  render() {
    return (
      <section className="Schedule">
        <img className="Schedule-image" src={schedule} />
        <img className="Schedule-mobileImage" src={scheduleMobile} />
      </section>
    );
  }
}
