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

const HALL = {
  initial: 'to when do you want to go?',
  negative: [`I'm afraid I can't do that.`, `I'm sorry, Dave. I can't do that`],
};

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      noise: _.sampleSize([Noise1, Noise2, Noise3], 3),
      hall: HALL.initial,
    };
  }

  componentDidMount() {
    this.scroll = scroll();
  }

  invalidLink() {
    this.setState({ hall: _.sample(HALL.negative) });
  }

  onClick = event => {
    if (!this.scroll || !event.target.href) return this.invalidLink();

    event.preventDefault();

    const element = findElementByHref(event.target.href);
    if (!element) return this.invalidLink();

    this.scrollToElement(element);
  };

  scrollToElement = element => {
    const from = this.scroll.get('top');
    const { top } = element.getBoundingClientRect();
    const to = top + clientHeight() + 100;

    animateScrollTo(this.scroll, { to: to, from: from });
  };

  renderMalfunctionNote() {
    return (
      <p aria-hidden className="Navigation-linkNote">
        System malfunction
      </p>
    );
  }

  renderLinkBackground(src) {
    return (
      <div className="Navigation-linkBackgroundWrapper">
        <img
          className="Navigation-linkBackground"
          src={src}
          role="presentation"
        />
      </div>
    );
  }

  render() {
    return (
      <nav className="Navigation">
        <p className="Navigation-scrollHint">
          Scroll to navigate chronologically
        </p>
        <div className="Navigation-linkWrapper">
          <a onClick={this.onClick} className="Navigation-link" href="#about">
            <p className="Navigation-linkLabel">About</p>
            {this.renderLinkBackground(AboutPreview)}
          </a>
          <a
            onClick={this.onClick}
            className="Navigation-link"
            href="#speakers"
          >
            <p className="Navigation-linkLabel">Speakers</p>
            {this.renderLinkBackground(SpeakersPreview)}
          </a>
          <div onClick={this.onClick} className="Navigation-link isDisabled">
            <p className="Navigation-linkLabel">Workshops</p>
            {this.renderLinkBackground(WorkshopsPreview)}
            {this.renderMalfunctionNote()}
          </div>
          <a onClick={this.onClick} className="Navigation-link isDisabled">
            <p className="Navigation-linkLabel">Schedule</p>
            {this.renderLinkBackground(this.state.noise[0])}
            {this.renderMalfunctionNote()}
          </a>
          <a onClick={this.onClick} className="Navigation-link isDisabled">
            <p className="Navigation-linkLabel">Location</p>
            {this.renderLinkBackground(this.state.noise[1])}
            {this.renderMalfunctionNote()}
          </a>
          <div className="Navigation-hall">
            <img className="Navigation-hallEye" src={Hall} />
          </div>
          <a onClick={this.onClick} className="Navigation-link isDisabled">
            <p className="Navigation-linkLabel">Sponsors</p>
            {this.renderLinkBackground(this.state.noise[2])}
            {this.renderMalfunctionNote()}
          </a>
        </div>
        <p className="Navigation-hallOutput">{this.state.hall}</p>
      </nav>
    );
  }
}
