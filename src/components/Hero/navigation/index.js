import { tween, listen, easing } from 'popmotion';
import scroll from 'stylefire/scroll';
import React, { Component } from 'react';

import './index.css';

import Hall from './hall.svg';
import Noise1 from './noise_1.gif';
import Noise2 from './noise_2.gif';
import Noise3 from './noise_3.gif';
import AboutPreview from './about_preview.jpg';
import SpeakersPreview from './speakers_preview.jpg';
import WorkshopsPreview from './workshops_preview.jpg';

import { clientHeight } from '../../../utils/dom';

const findElementByHref = href => {
  const elementId = href
    .substr(href.indexOf('#'), href.length)
    .replace('#', '');

  return document.getElementById(elementId);
};

const animateScrollTo = (scroll, options) => {
  const animation = tween({
    ...options,
    duration: 500,
    ease: easing.easeInOut,
  });

  requestAnimationFrame(() => animation.start(scroll.set('top')));
};

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = { noise: _.sampleSize([Noise1, Noise2, Noise3], 3) };
  }

  componentDidMount() {
    this.scroll = scroll();
  }

  onClick = event => {
    if (!this.scroll) return;
    if (!event.target.href) return;

    event.preventDefault();
    const element = findElementByHref(event.target.href);

    if (!element) return;

    this.scrollToElement(element);
  };

  scrollToElement = element => {
    const from = this.scroll.get('top');
    const { top } = element.getBoundingClientRect();
    const to = top + clientHeight();

    animateScrollTo(this.scroll, { to: to, from: from });
  };

  render() {
    return (
      <nav className="Navigation">
        <div className="Navigation-linkWrapper">
          <a
            onClick={this.onClick}
            className="Navigation-link"
            href="#speakers"
          >
            <p className="Navigation-linkLabel">80's - Speakers</p>
            <img className="Navigation-linkBackground" src={SpeakersPreview} />
          </a>
          <a
            onClick={this.onClick}
            className="Navigation-link"
            href="/workshops"
          >
            <p className="Navigation-linkLabel">Light - Workshops</p>
            <img className="Navigation-linkBackground" src={WorkshopsPreview} />
          </a>
          <a
            onClick={this.onClick}
            className="Navigation-link"
            href="/schedule"
          >
            <p className="Navigation-linkLabel">Press - Schedule</p>

            <img
              className="Navigation-linkBackground"
              src={this.state.noise[0]}
            />
            <p className="Navigation-linkNote">System malfunction</p>
          </a>
          <a
            onClick={this.onClick}
            className="Navigation-link"
            href="/location"
          >
            <p className="Navigation-linkLabel">Rome - location</p>
            <img
              className="Navigation-linkBackground"
              src={this.state.noise[1]}
            />
            <p className="Navigation-linkNote">System malfunction</p>
          </a>
          <a onClick={this.onClick} className="Navigation-link" href="#about">
            <p className="Navigation-linkLabel">90's - About</p>
            <img className="Navigation-linkBackground" src={AboutPreview} />
          </a>
          <div className="Navigation-hall">
            <img className="Navigation-hallEye" src={Hall} />
          </div>
          <a
            onClick={this.onClick}
            className="Navigation-link"
            href="/sponsors"
          >
            <p className="Navigation-linkLabel">Stone - Sponsors</p>
            <img
              className="Navigation-linkBackground"
              src={this.state.noise[2]}
            />
            <p className="Navigation-linkNote">System malfunction</p>
          </a>
        </div>
      </nav>
    );
  }
}
