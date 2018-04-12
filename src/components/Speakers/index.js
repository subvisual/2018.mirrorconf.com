import _ from 'lodash';
import * as PIXI from 'pixi.js';
import React, { Component } from 'react';
import { linear } from 'popmotion/easing';
import { getProgressFromValue } from 'popmotion/calc';
import {
  timeline,
  listen,
  tween,
  styler,
  transform,
  everyFrame,
} from 'popmotion';

import './index.css';

import SpeakersList from './speakers_list';

import carSource from './car.svg';
// import SpeakersSource from './speakers.svg';
import backgroundSource from './background.svg';

import { scrollTop, scrollHeight, clientHeight } from '../../utils/dom';

const smooth = transform.smooth(100);
const toPercent = transform.transformMap({
  '--Speakers-car-translate-y': v => `${v}%`,
});

const point = (x, y = x) => ({ x, y });

const resources = {
  background: {
    name: 'background',
    source: backgroundSource,
  },
  car: {
    name: 'car',
    source: carSource,
    props: { position: point(720, 5350) },
  },
};

const addSpriteToStage = context => (sprite, name) => {
  if (!resources || !resources[name]) return;

  const { props } = resources[name];
  const { width, height } = context.renderer;

  sprite.anchor = point(0.5);
  sprite.position = point(width / 2, height / 2);

  _.forEach(props, (value, prop) => (sprite[prop] = value));

  context.stage.addChild(sprite);
};

export default class Speakers extends Component {
  constructor() {
    super();
    this.state = { height: 0 };
  }

  onRoot = root => (this.root = root);

  onCanvasWrapper = canvasWrapper => (this.canvasWrapper = canvasWrapper);

  scrollProgress = () => {
    const { height } = this.state;

    const max = scrollHeight() - clientHeight();
    const min = scrollHeight() - height;

    return getProgressFromValue(min, max, scrollTop());
  };

  buildCanvas = () => {
    if (!this.canvasWrapper) return;

    const { width, height } = this.state;

    const context = new PIXI.Application(1440, 5661, {
      antialias: true,
      resolution: 1,
      transparent: true,
    });

    this.canvasWrapper.appendChild(context.view);

    const sprites = _.reduce(
      resources,
      (memo, { name, source }) => ({
        ...memo,
        [name]: new PIXI.Sprite.from(source),
      }),
      {}
    );

    _.forEach(sprites, addSpriteToStage(context));

    const tline = timeline([
      {
        track: 'car',
        from: { y: 5350, scale: 1 },
        to: { y: 750, scale: 0.18 },
        ease: linear,
      },
    ])
      .start(({ car }) => {
        sprites.car.y = car.y;
        sprites.car.scale = point(car.scale);
      })
      .pause();

    this.props.onScroll(() => tline.car.seek(this.scrollProgress()));
  };

  onResize() {
    if (this.animation) this.animation.stop();

    const { height } = this.root.getBoundingClientRect();

    this.setState({ height });
  }

  componentDidMount() {
    if (!this.root) return;

    listen(window, 'load').start(() => {
      const { height } = this.root.getBoundingClientRect();

      this.setState({ height });

      this.buildCanvas();
    });

    listen(window, 'resize').start(() => this.onResize());
  }

  render() {
    return (
      <section
        className="Speakers"
        id="speakers"
        ref={this.onRoot}
        tabIndex="0"
      >
        <h2>Speakers</h2>
        <div className="Speakers-canvasWrapper" ref={this.onCanvasWrapper} />
        <SpeakersList />
      </section>
    );
  }
}
