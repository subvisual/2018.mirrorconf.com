import { everyFrame } from 'popmotion';
import React, { Component } from 'react';

import Hero from '../components/Hero';
import About from '../components/About';
import Speakers from '../components/Speakers';
import Workshops from '../components/Workshops';
import Schedule from '../components/Schedule';
import Location from '../components/Location';
import Footer from '../components/Footer';

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

  callListeners = () => {
    this.listeners
      .slice()
      .reverse()
      .forEach(l => l());
  };

  startAnimation() {
    this.animation = everyFrame().start(this.callListeners);
  }

  render() {
    return (
      <div className="Layout-content">
        <Hero addTickListener={this.addTickListener} />
        <About />
        <Speakers addTickListener={this.addTickListener} />
        <Workshops
          addTickListener={this.addTickListener}
          data={this.props.data}
        />
        <Schedule />
        <Location />
        <Footer />
      </div>
    );
  }
}

export const pageQuery = graphql`
  query AllWorkshops {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            path
            speaker
            date
            time
            agenda
            photo
            overlay
            excerpt
          }
        }
      }
    }
  }
`;
