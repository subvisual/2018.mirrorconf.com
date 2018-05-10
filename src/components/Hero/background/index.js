import React, { Component } from 'react';
import { getProgressFromValue } from 'popmotion/calc';
import { listen, styler, tween, timeline, transform } from 'popmotion';
import { linear, easeOut, cubicBezier, easeInOut } from 'popmotion/easing';

import { scrollTop, clientHeight } from '../../../utils/dom';

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
  circleShadow: { source: circleShadow },
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

const toPercent = { x: x => `${x}%` };

const initializeSprites = (memo, { source }, name) => {
  return {
    ...memo,
    [name]: new PIXI.Sprite.from(source),
  };
};

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

  updateSprite = (sprite, values) =>
    _.forEach(values, (value, name) => (sprite[name] = value));

  buildCanvas() {
    const { width, height, options } = settings;
    const context = new PIXI.Application(width, height, options);

    this.root.appendChild(context.view);

    const sprites = _.reduce(resources, initializeSprites, {});
    _.forEach(sprites, addSpriteToStage(context.stage));

    // context.renderer.view.style['transform'] = 'translatez(0)';

    this.tline = timeline([
      {
        track: 'circle',
        to: { rotation: 0, alpha: 1 },
        from: { rotation: 60, alpha: 0 },
        duration: 11700,
        ease: cubicBezier(0.15, 1.38, 0.14, 0.97),
      },
      3000,
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
      '-300',
      [
        {
          track: 'timemachineBlur',
          from: { alpha: 0 },
          to: { alpha: 1 },
          duration: 1000,
          ease: linear,
        },
        {
          track: 'lowCube',
          from: { y: height * 0.5 + 5, alpha: 0 },
          to: { y: height * 0.5 + 1, alpha: 1 },
          duration: 800,
          ease: linear,
        },
        '+500',
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
        duration: 500,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      '+500',
      {
        track: 'hexagon2',
        to: { alpha: 1 },
        from: { alpha: 0 },
        duration: 500,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      '+500',
      {
        track: 'hexagon3',
        to: { alpha: 1 },
        from: { alpha: 0 },
        duration: 500,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      '+500',
      {
        track: 'hexagon4',
        to: { alpha: 1 },
        from: { alpha: 0 },
        duration: 500,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      '+500',
      {
        track: 'hexagon5',
        to: { alpha: 1 },
        from: { alpha: 0 },
        duration: 500,
        ease: cubicBezier(0, 0.49, 0.1, 1),
      },
      {
        track: 'path',
        from: { alpha: 0 },
        to: { alpha: 1 },
        duration: 2000,
        ease: cubicBezier(1, 1.5, 0.4, 0.79),
      },
      '-800',
      {
        track: 'character',
        from: { x: width / 2 + 170, y: height / 2 - 105, alpha: 0 },
        to: { x: width / 2, y: height / 2, alpha: 1 },
        duration: 1000,
        ease: easeInOut,
      },
      '-500',
      {
        track: 'logo',
        from: { alpha: 0, y: height / 2 - 10 },
        to: { alpha: 1, y: height / 2 },
        duration: 3000,
        ease: easeInOut,
      },
    ])
      .pipe(values => ({
        ...values,
        elevator: {
          ...values.elevator,
          scale: point(values.elevator.scale),
        },
      }))
      .start(values => {
        _.forEach(sprites, (sprite, name) =>
          this.updateSprite(sprite, values[name]),
        );
        requestAnimationFrame(() => context.render());
      });

    this.characterTween = tween({
      elapsed: this.scrollProgress(),
      from: { x: width / 2, y: height / 2 },
      to: { x: width / 2 + 170, y: height / 2 - 105 },
    })
      .start(values => {
        requestAnimationFrame(() => context.render());
        this.updateSprite(sprites.character, values);
      })
      .pause();
  }

  scrollProgress = () =>
    getProgressFromValue(0, this.state.height, scrollTop());

  startAnimation = () => {
    const elapsed = this.scrollProgress();

    const backgroundTween = tween({
      elapsed,
      duration: 1,
      from: { opacity: 1, x: -50, y: -this.state.height / 2 },
      to: { opacity: 0, x: -50, y: 0 },
    })
      .pipe(transform.transformMap(toPercent))
      .start(this.rootStyler.set)
      .pause();

    this.props.onScroll(() => {
      const progress = this.scrollProgress();

      backgroundTween.seek(progress);
      this.characterTween.seek(progress);

      if (this.tline && progress > 0) {
        this.tline.pause();
      } else if (this.tline && progress === 0) {
        this.tline.resume();
      }
    });
  };

  componentDidMount() {
    if (!this.root) return;

    const { width, height } = this.root.getBoundingClientRect();
    this.setState({ width, height });

    listen(window, 'load').start(() => {
      this.buildCanvas();
      this.startAnimation();
    });
  }

  render() {
    return <div className="Background" ref={this.onRoot} />;
  }
}
