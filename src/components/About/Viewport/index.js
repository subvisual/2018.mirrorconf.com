import React, { Component } from 'react';

import Attendee from './attendee.png';
import Bullet from './dot.svg';
import Quizz from './quizz.png';
import Venue from './venue.png';
import Speaker from './speaker.png';

import './index.module.css';

const SOCIAL_LINKS = [
  {
    name: 'facebook',
    link: 'https://www.facebook.com/mirrorconf/',
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/mirrorconf',
  },
  {
    name: 'youtube',
    link: 'https://www.youtube.com/channel/UCDez53TT1_v3jr3lGv-QhKw',
  },
];

const EVENT_STATS = [
  {
    count: '5',
    description: 'Days',
  },
  {
    count: '1',
    description: 'Party',
  },
  {
    count: '6',
    description: 'Workshops',
  },
  {
    count: '12',
    description: 'Speakers',
  },
  {
    count: '1',
    description: 'Quiz',
  },
  {
    count: '700+',
    description: 'Attendees',
  },
];

export default class CommandBar extends Component {
  renderList = (bulletpoint, index) => (
    <li role="listitem" key={index}>
      <img aria-hidden="true" src={Bullet} styleName="bullet" />
      <p styleName="bulletpoint">
        {bulletpoint.count} {bulletpoint.description}
      </p>
    </li>
  );

  renderSocialLinks = (socialNetwork, index) => (
    <li role="listitem" styleName="listitem" key={index}>
      <img aria-hidden="true" src={Bullet} styleName="bullet" />
      <p styleName="bulletpoint">
        {socialNetwork.name} -{' '}
        <a href={socialNetwork.link}>{socialNetwork.link}</a>
      </p>
    </li>
  );

  render() {
    return (
      <div ref={this.props.onViewport} styleName="root">
        <h1 styleName="title">About Mirror Conf</h1>
        <div styleName="division" />
        <p styleName="text">
          Mirror Conf is a conference designed to empower designers and
          front-end developers who have a thirst for knowledge and want to
          broaden their horizons. It aims to create the perfect set to blur the
          differences between these two worlds and point towards a more
          collaborative future.
        </p>
        <div styleName="division" />
        <h3 id="social-links" styleName="visuallyHidden">
          Social Links
        </h3>
        <ul aria-labelledby="social-links" styleName="text" role="list">
          {SOCIAL_LINKS.map(this.renderSocialLinks)}
        </ul>
        <div styleName="division" />
        <h2 styleName="subtitle">2018 - The future of web</h2>
        <div styleName="division" />
        <h3 id="event-details" styleName="visuallyHidden">
          Event details
        </h3>
        <ul aria-labelledby="event-details" styleName="text" role="list">
          {EVENT_STATS.map(this.renderList)}
        </ul>
        <div styleName="division" />
        <img aria-hidden="true" src={Attendee} styleName="verticalImage" />
        <img aria-hidden="true" src={Speaker} styleName="horizontalImage" />
        <img aria-hidden="true" src={Quizz} styleName="horizontalImage" />
        <img aria-hidden="true" src={Venue} styleName="verticalImage" />
      </div>
    );
  }
}
