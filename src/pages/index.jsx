import React, { Component } from 'react';
import { listen, everyFrame } from 'popmotion';

import Hero from '../components/Hero';
import About from '../components/About';
import Speakers from '../components/Speakers';
// import Workshops from '../components/Workshops';
import Footer from '../components/Footer';

export default class IndexPage extends Component {
  constructor() {
    super();
    this.listeners = [];
  }

  componentDidMount() {
    listen(window, 'load').start(() => this.startAnimation());
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
        <Footer addTickListener={this.addTickListener} />
      </div>
    );
  }
}