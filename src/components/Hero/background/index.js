import _ from 'lodash';
import React, { Component } from 'react';
import { getProgressFromValue } from 'popmotion/calc';
import { listen, styler, tween, timeline, transform } from 'popmotion';
import { linear, cubicBezier, easeInOut, circOut } from 'popmotion/easing';

import PIXI from '../../../utils/pixi';
import { scrollTop } from '../../../utils/dom';

import './index.css';

import logo from './assets/logo.svg';
import character from './assets/character.svg';
import circle from './assets/circle.svg';
import circleShadow from './assets/circle-shadow.svg';
import path from './assets/path.svg';
import topCube from './assets/top-cube.svg';
import lowCube from './assets/low-cube.svg';
import mainCube from './assets/main-cube.svg';
import elevator from './assets/elevator.svg';
import timeboxLight from './assets/timebox-light.png';
import timemachineBlur from './assets/timemachine-blur.png';
import hexagon1 from './assets/polygon-1.svg';
import hexagon2 from './assets/polygon-2.svg';
import hexagon3 from './assets/polygon-3.svg';
import hexagon4 from './assets/polygon-4.svg';
import hexagon5 from './assets/polygon-5.svg';

const point = (x, y = x) => ({ x, y });

const resources = {
  logo: { source: logo, props: { alpha: 0 } },
  path: { source: path, props: { alpha: 0 } },
  circleShadow: { source: circleShadow, props: { alpha: 1 } },
  circle: { source: circle },
  topCube: { source: topCube, props: { alpha: 0 } },
  lowCube: { source: lowCube, props: { alpha: 0 } },
  mainCube: { source: mainCube },
  timemachineBlur: { source: timemachineBlur, props: { alpha: 0 } },
  hexagon1: { source: hexagon1, props: { alpha: 0 } },
  hexagon2: { source: hexagon2, props: { alpha: 0 } },
  hexagon3: { source: hexagon3, props: { alpha: 0 } },
  hexagon4: { source: hexagon4, props: { alpha: 0 } },
  hexagon5: { source: hexagon5, props: { alpha: 0 } },
  character: { source: character, props: { alpha: 0 } },
  timeboxLight: { source: timeboxLight, props: { alpha: 0 } },
  elevator: { source: elevator, props: { alpha: 1 } },
};

const settings = {
  width: 1660,
  height: 1520,
  options: {
    antialias: false,
    resolution: 1,
    transparent: true,
    autoStart: false,
  },
};

const initializeSprites = (memo, { source }, name) => ({
  ...memo,
  [name]: new PIXI.Sprite.from(source),
});

const centerSprite = ({ width, height }, sprite) => {
  sprite.anchor = point(0.5);
  sprite.position = point(width / 2, height / 2);
};

const assignPropToSprite = sprite => (value, prop) => (sprite[prop] = value);

const addSpriteToStage = stage => (sprite, name) => {
  if (!resources || !resources[name]) return;

  centerSprite(settings, sprite);
  _.forEach(resources[name].props, assignPropToSprite(sprite));

  stage.addChild(sprite);
};

export default class Background extends Component {
  onRoot = root => {
    this.root = root;
    this.rootStyler = styler(root);
  };

  onContent = content => {
    this.content = content;
    this.contentStyler = styler(content);
  };

  updateSprite = sprite => values =>
    _.forEach(values, (value, name) => (sprite[name] = value));

  buildCanvas() {
    if (!this.root) return;

    const { width, height, options } = settings;
    const context = new PIXI.Application(width, height, options);

    this.root.appendChild(context.view);

    const container = new PIXI.Container();
    container.width = width;
    container.height = height;
    context.stage.addChild(container);

    const sprites = _.reduce(resources, initializeSprites, {});
    _.forEach(sprites, addSpriteToStage(container));

    const animation = timeline([
      {
        track: 'elevator',
        from: { y: height * 0.25, alpha: 0, scale: 0.8 },
        to: { y: height * 0.2, alpha: 1, scale: 1.2 },
        duration: 300,
        ease: easeInOut,
      },
      {
        track: 'elevator',
        from: { y: height * 0.2, scale: 1.2 },
        to: { y: height * 0.5, scale: 1 },
        duration: 1100,
        ease: easeInOut,
      },
      '+700',
      [
        {
          track: 'timemachineBlur',
          from: { alpha: 0, scale: 0 },
          to: { alpha: 1, scale: 1 },
          duration: 1500,
          ease: circOut,
        },
        '-500',
        {
          track: 'lowCube',
          from: { y: height * 0.5 + 5, alpha: 0 },
          to: { y: height * 0.5 + 1, alpha: 1 },
          duration: 800,
          ease: linear,
        },
        '+150',
        {
          track: 'topCube',
          from: { y: height * 0.5 + 5, alpha: 0 },
          to: { y: height * 0.5 + 1, alpha: 1 },
          duration: 800,
          ease: linear,
        },
      ],
      '+300',
      {
        track: 'hexagon1',
        to: { alpha: 1 },
        from: { alpha: 0 },
        duration: 300,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      '+150',
      {
        track: 'hexagon2',
        to: { alpha: 1 },
        from: { alpha: 0 },
        duration: 300,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      '+150',
      {
        track: 'hexagon3',
        to: { alpha: 1 },
        from: { alpha: 0 },
        duration: 300,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      '+150',
      {
        track: 'hexagon4',
        to: { alpha: 1 },
        from: { alpha: 0 },
        duration: 300,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      '+150',
      {
        track: 'hexagon5',
        to: { alpha: 1 },
        from: { alpha: 0 },
        duration: 300,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      [
        {
          track: 'circle',
          to: { rotation: 0, alpha: 1 },
          from: { rotation: 0.5, alpha: 0 },
          duration: 2500,
          ease: cubicBezier(0.15, 1.38, 0.14, 0.97),
        },
        {
          track: 'circleShadow',
          to: { alpha: 1 },
          from: { alpha: 0 },
          duration: 2500,
          ease: linear,
        },
      ],
      '-1500',
      {
        track: 'path',
        from: { alpha: 0 },
        to: { alpha: 1 },
        duration: 1000,
        ease: cubicBezier(1, 1.5, 0.4, 0.79),
      },
      '-1000',
      {
        track: 'character',
        from: { x: width / 2 + 50, y: height / 2, alpha: 0 },
        to: { x: width / 2 - 150, y: height / 2 + 130, alpha: 1 },
        duration: 2000,
        ease: easeInOut,
      },
      '-1500',
      {
        track: 'logo',
        from: { alpha: 0, y: height / 2 - 10 },
        to: { alpha: 1, y: height / 2 },
        duration: 3000,
        ease: easeInOut,
      },
      '-1500',
      {
        track: 'content',
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 1000,
        ease: easeInOut,
      },
    ])
      .pipe(
        transform.transformMap({
          elevator: transform.transformMap({ scale: point }),
          timemachineBlur: transform.transformMap({
            scale: transform.interpolate([0, 0.75, 1], [0, 1.2, 1]),
          }),
        })
      )
      .pipe(
        transform.transformMap({
          timemachineBlur: transform.transformMap({ scale: point }),
        })
      )
      .start(values => {
        _.forEach(sprites, (sprite, name) =>
          this.updateSprite(sprite)(values[name])
        );
        this.contentStyler.set(values.content);
      });

    const backgroundTween = tween({
      elapsed: this.scrollProgress(),
      from: { y: 0, alpha: 1 },
      to: { y: height / 8, alpha: 0 },
      ease: linear,
    })
      .start(this.updateSprite(container))
      .pause();

    const active = () => _.some(animation.isActive());

    this.props.addTickListener(() => {
      const progress = this.scrollProgress();

      if (active() && progress > 0)
        requestAnimationFrame(() => animation.pause());
      else if (!active() && progress === 0)
        requestAnimationFrame(() => animation.resume());

      if (progress < 0 || progress > 1) return;

      backgroundTween.seek(progress);
      context.render();
    });

    context.render();
  }

  scrollProgress = () => {
    if (!this.state.height) return 0;

    return getProgressFromValue(0, this.state.height, scrollTop());
  };

  onResize() {
    if (!this.root) return;
    const { height } = this.root.getBoundingClientRect();

    if (!height) setTimeout(() => this.onResize(), 100);

    if (height === this.state.height) return;

    this.setState({ height });
  }

  componentDidMount() {
    if (!this.root) return;

    const { height } = this.root.getBoundingClientRect();

    if (!height) setTimeout(() => this.onResize(), 100);

    this.setState({ height });
    requestAnimationFrame(() => this.buildCanvas());

    listen(window, 'resize').start(() => this.onResize());
  }

  render() {
    return (
      <div className="Background" ref={this.onRoot}>
        <div className="Background-content" ref={this.onContent}>
          <h1 className="visuallyHidden">Mirror Conf 2018</h1>
          <h2 className="visuallyHidden">The future of the web</h2>
          <div className="Background-visibleTitle">
            <p className="Background-text">The future of the web</p>
          </div>
          <div className="Background-date">
            <p className="Background-text">October 15-19</p>
          </div>
          <div className="Background-location">
            <p className="Background-text">Braga, Portugal</p>
          </div>
          <a
            className="Background-cta"
            href="https://ti.to/subvisual/mirror-conf-2018/with/krxd0s3-khw"
            target="_blank"
          >
            <div className="Background-ctaGlow" />
            <div className="Background-ctaTextBackground" />
            <p className="Background-ctaText">Buy your tickets</p>
          </a>
        </div>
      </div>
    );
  }
}
