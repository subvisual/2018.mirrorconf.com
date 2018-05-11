import _ from 'lodash';
import React, { Component } from 'react';
import { listen, everyFrame } from 'popmotion';

import { scrollTop } from '../utils/dom';

import Hero from '../components/Hero';
import About from '../components/About';
import Speakers from '../components/Speakers';
// import Workshops from '../components/Workshops';

export default class IndexPage extends Component {
  constructor() {
    super();
    this.listeners = [];
  }

  startAnimation() {
    this.animation = everyFrame().start(this.callListeners);
  }

  callListeners = () => this.listeners.forEach(listener => listener());

  componentDidMount() {
    listen(window, 'load').start(() => this.startAnimation());
  }

  addTickListener = listener => {
    const index = this.listeners.push(listener) - 1;
    return () => this.listeners.splice(index, 1);
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="Layout-content">
        <Hero addTickListener={this.addTickListener} />
        <About />
        <Speakers addTickListener={this.addTickListener} />
      </div>
    );
  }
}
