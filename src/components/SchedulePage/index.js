import React, { Component } from 'react';

import './index.css';

import Tabs from './Tabs';
import FirstPart from './FirstPart.js';
import SecondPart from './SecondPart.js';

import back from './back.svg';
import next from './next.svg';

export default class SchedulePage extends Component {
  render() {
    return (
      <section className="SchedulePage">
        <div className="SchedulePage-wrapper">
          <a className="SchedulePage-backLink" href="/">
            <img className="SchedulePage-backImage" src={back} />
            Go back
          </a>
          <h1 className="SchedulePage-heading">The Mirror Times</h1>
          <Tabs>
            {FirstPart}
            {SecondPart}
          </Tabs>
        </div>
      </section>
    );
  }
}
