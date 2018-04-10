import React, { Component } from 'react';

import Bullet from './dot.svg';

import './index.module.css';

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
    description: 'Quizz',
  },
  {
    count: '800+',
    description: 'Speakers',
  },
];

export default class CommandBar extends Component {
  renderList = (bulletpoint, index) => {
    return (
      <li key={index}>
        <img src={Bullet} styleName="bullet" />
        <p styleName="bulletpoint">
          {bulletpoint.count} {bulletpoint.description}
        </p>
      </li>
    );
  };

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
        <h2 styleName="subtitle">2018 - The future of web</h2>
        <div styleName="division" />
        <ul styleName="text">{EVENT_STATS.map(this.renderList)}</ul>
        <div styleName="division" />
      </div>
    );
  }
}
