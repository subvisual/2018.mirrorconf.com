import _ from 'lodash';
import React, { Component } from 'react';
import { listen, tween } from 'popmotion';

import WithNodeBounds from '../../../containers/withNodeBounds';

import './index.css';

import PIXI, {
  drawPoints,
  initializeSprites,
  addSpriteToStage,
} from '../../../utils/pixi';
import { point } from '../../../utils/2d';
import thunderPath, { buildThunderLines } from './thunder';

import { clientWidth, clientHeight } from '../../../utils/dom';

import tower from './tower.png';
import title from './workshops_title.png';

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
    props: { position: point(380, 550), scale: point(0.5) },
  },
  tower2: {
    source: tower,
    props: {
      position: point(980, 160),
      scale: point(0.2),
    },
  },
  title: {
    source: title,
    props: {
      position: point(700, 400),
      scale: point(0.8),
      alpha: 0,
    },
  },
};

const blur = (a, b, c) => new PIXI.filters.BlurFilter(a, b, c);

class Towers extends Component {
  constructor(props) {
    super(props);
    this.state = { paused: true, completed: false };
  }

  componentDidMount() {
    if (!this.canvas) return;

    this.buildContext(this.canvas);

    const scrollListener = listen(document, 'scroll').start(() =>
      this.onScroll()
    );
    const mouseListener = listen(this.canvas, 'mousemove').start(this.onScroll);

    this.animationFrame = requestAnimationFrame(this.update);

    this.unsubscribe = () => {
      cancelAnimationFrame(this.animationFrame);
      scrollListener.stop();
      mouseListener.stop();
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.application.destroy(this.canvas);
  }

  onRoot = root => {
    if (!root) return;

    this.props.onNode(root);
  };

  onCanvas = canvas => {
    if (!canvas) return;

    this.canvas = canvas;
  };

  onScroll = () => {
    const progress = this.props.progressToInvisbile(clientHeight());
    const { paused, completed } = this.state;

    if (progress >= 0 && progress <= 1 && paused) return this.resume();

    if (progress < 0 || (progress > 1 && !paused && !completed))
      return this.reset();
  };

  buildContext = () => {
    this.application = new PIXI.Application({
      ...SETTINGS,
      view: this.canvas,
    });

    this.sprites = _.reduce(RESOURCES, initializeSprites, {});
    _.forEach(
      this.sprites,
      addSpriteToStage(this.application.stage, RESOURCES, SETTINGS)
    );

    this.titleTween = tween({ from: 0, to: 1 })
      .start(alpha => {
        this.sprites.title.alpha = alpha;
      })
      .pause();

    this.styles = [
      { size: 5, color: 0xffffff, blur: blur(1, 2, 1) },
      { size: 5, color: 0xffffff, blur: blur(8, 5, 1) },
      { size: 10, color: 0x00fffe, blur: blur(16, 5, 1) },
    ];

    this.lines = [
      buildThunderLines(point(380, 380), this.styles, this.application),
      buildThunderLines(point(980, 100), this.styles, this.application),
    ];

    this.application.render();
  };

  update = () => {
    this.animationFrame = requestAnimationFrame(this.update);

    if (this.state.paused || this.state.completed) return;
    if (!this.application || !this.lines || !this.lines.length) return;

    let target = null;
    const { x, y } = this.application.renderer.plugins.interaction.mouse.global;

    if (clientWidth() >= 1024 && (x !== -999999 && y !== -999999)) {
      target = point(x, y);
    } else {
      target = point(SETTINGS.width / 2, SETTINGS.height / 2);
    }

    _.forEach(this.lines, line => {
      const path = thunderPath([line[0].initial], target);

      _.forEach(line, graphic => {
        graphic.clear();
        graphic.lineStyle(graphic.style.size, graphic.style.color);
        drawPoints(graphic, path);
      });
    });

    this.titleTween.seek(this.props.lightGrowProgress());

    this.application.render();
  };

  resume = () => {
    this.setState({ paused: false });
  };

  pause = () => {
    this.setState({ paused: true });

    _.forEach(this.lines, line => _.forEach(line, graphic => graphic.clear()));

    this.application.render();
  };

  reset = () => {
    this.setState({ paused: true, completed: false });

    _.forEach(this.lines, line => _.forEach(line, graphic => graphic.clear()));

    this.application.render();
  };

  render() {
    return (
      <div className="Towers" ref={this.onRoot}>
        <div className="Towers-canvasWrapper">
          <canvas className="Towers-canvas" ref={this.onCanvas} />
        </div>
      </div>
    );
  }
}

export default WithNodeBounds(Towers);
