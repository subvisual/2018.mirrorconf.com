import React, { Component } from 'react';
import { listen } from 'popmotion';

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
    this.animation = listen(document, 'scroll').start(() =>
      this.listeners.forEach(l => requestAnimationFrame(() => l())),
    );
  }

  componentDidMount() {
    listen(window, 'load').start(() => this.startAnimation());
  }

  onScroll = listener => {
    const index = this.listeners.push(listener) - 1;
    return () => this.listeners.splice(index, 1);
  };

  render() {
    return (
      <div className="Layout-content">
        <Hero onScroll={this.onScroll} />
        <About />
        <Speakers onScroll={this.onScroll} />
      </div>
    );
  }
}
