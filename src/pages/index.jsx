import React, { Component } from 'react';
import { listen, everyFrame } from 'popmotion';

import Hero from '../components/Hero';
import About from '../components/About';
import Speakers from '../components/Speakers';
import Location from '../components/Location';
import Workshops from '../components/Workshops';

export default class IndexPage extends Component {
  constructor() {
    super();
    this.listeners = [];
  }

  componentDidMount() {
    this.startAnimation();
  }

  shouldComponentUpdate() {
    return false;
  }

  addTickListener = listener => {
    const index = this.listeners.push(listener) - 1;
    return () => this.listeners.splice(index, 1);
  };

  callListeners = () => this.listeners.forEach(listener => listener());

  startAnimation() {
    this.animation = everyFrame().start(this.callListeners);
  }

  render() {
    return (
      <div className="Layout-content">
        <Hero addTickListener={this.addTickListener} />
        <About />
        <Speakers addTickListener={this.addTickListener} />
        <Workshops addTickListener={this.addTickListener} />
        <Location />
      </div>
    );
  }
}
