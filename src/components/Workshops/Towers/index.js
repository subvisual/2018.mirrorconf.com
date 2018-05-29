import _ from 'lodash';
import React, { Component } from 'react';
import { listen, tween } from 'popmotion';

import './index.css';

import PIXI, {
  drawPoints,
  initializeSprites,
  addSpriteToStage,
} from '../../../utils/pixi';
import { point } from '../../../utils/2d';
import thunderPath, { buildThunderLines } from './thunder';

import tower from './tower.png';

const SETTINGS = {
  width: 1440,
  height: 900,
  antialias: false,
  resolution: 1,
  transparent: true,
  autoStart: false,
};

const RESOURCES = {
  tower: {
    source: tower,
    props: { position: point(60, 693), scale: point(0.5) },
  },
  tower2: {
    source: tower,
    props: {
      position: point(1300, 100),
      scale: point(0.2),
    },
  },
};

const blur = (a, b, c) => new PIXI.filters.BlurFilter(a, b, c);

export default class Towers extends Component {
  constructor(props) {
    super(props);
    this.state = { paused: true, completed: false };
  }

  componentDidMount() {
    if (!this.canvas) return;

    this.buildContext(this.canvas);

    listen(window, 'load').start(this.calculateBounds);
    listen(window, 'resize').start(this.calculateBounds);

    listen(document, 'scroll').start(this.onScroll);
    listen(this.canvas, 'mousemove').start(this.onScroll);
    this.unsubscribe = this.props.addTickListener(this.update);
  }

  onCanvas = canvas => {
    this.canvas = canvas;
  };

  onScroll = () => {
    const progress = this.props.progress();
    const { paused } = this.state;

    if (progress >= 0 && progress <= 1 && paused) return this.resume();

    if (progress < 0 || progress > 1) return this.reset();
  };

  buildContext = () => {
    this.application = new PIXI.Application({
      ...SETTINGS,
      view: this.canvas,
    });

    this.interactionManager = new PIXI.interaction.InteractionManager(
      this.application
    );

    this.sprites = _.reduce(RESOURCES, initializeSprites, {});
    _.forEach(
      this.sprites,
      addSpriteToStage(this.application.stage, RESOURCES, SETTINGS)
    );

    this.styles = [
      { size: 5, color: 0xffffff, blur: blur(1, 2, 1) },
      { size: 5, color: 0xffffff, blur: blur(8, 5, 1) },
      { size: 10, color: 0x00fffe, blur: blur(16, 5, 1) },
    ];

    this.lines = [
      buildThunderLines(point(60, 500), this.styles, this.application),
      buildThunderLines(point(1300, 50), this.styles, this.application),
    ];

    setTimeout(() => this.application.render(), 1000);
  };

  update = () => {
    if (this.state.paused || this.state.completed) return;
    if (!this.application || !this.lines || !this.lines.length) return;

    const { x, y } = this.application.renderer.plugins.interaction.mouse.global;
    const target = point(x, y);

    this.lines.forEach(line => {
      const path = thunderPath([line[0].initial], target);
      line.forEach(graphic => {
        graphic.clear();
        graphic.lineStyle(graphic.style.size, graphic.style.color);
        drawPoints(graphic, path);
      });
    });

    this.application.render();
  };

  resume = () => {
    this.setState({ paused: false });
    tween({ from: 0, to: 1, duration: 1000 }).start({
      update: this.update,
      complete: this.complete,
    });
  };

  pause = () => {
    this.setState({ paused: true });

    this.lines.forEach(line => line.forEach(graphic => graphic.clear()));

    this.application.render();
  };

  complete = () => {
    this.setState({ completed: true });

    this.lines.forEach(line => line.forEach(graphic => graphic.clear()));

    this.application.render();
  };

  reset = () => {
    this.setState({ paused: true, completed: false });
  };

  render() {
    return <canvas className="Towers" ref={this.onCanvas} />;
  }
}
