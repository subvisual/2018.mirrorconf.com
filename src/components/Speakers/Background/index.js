import _ from 'lodash';
import React, { Component } from 'react';
import { linear } from 'popmotion/easing';
import { listen, tween, styler } from 'popmotion';

import carSource from './car.svg';
import backgroundSource from './background.svg';
import backgroundMobileSource from './background_mobile.jpg';

import PIXI from '../../../utils/pixi';
import { clientHeight, clientWidth } from '../../../utils/dom';

const point = (x, y = x) => ({ x, y });

export const SETTINGS = {
  width: 1440,
  height: 5661,
  options: {
    antialias: false,
    resolution: 1,
    transparent: true,
    autoStart: false,
  },
};

const MOBILE_SETTINGS = { width: 1440, height: 17500 };

export const RATIO = SETTINGS.width / SETTINGS.height;
export const MOBILE_RATIO = MOBILE_SETTINGS.width / MOBILE_SETTINGS.height;

const RESOURCES = {
  background: {
    name: 'background',
    source: backgroundSource,
    props: {
      width: SETTINGS.width,
      height: SETTINGS.height,
      anchor: point(0),
      position: point(0),
    },
  },
  car: {
    name: 'car',
    source: carSource,
    props: { anchor: point(0.5, 1), position: point(720, 800) },
  },
};

const initializeSprites = (memo, { name, source }) => ({
  ...memo,
  [name]: new PIXI.Sprite.from(source),
});

const addSpriteToStage = stage => (sprite, name) => {
  if (!RESOURCES || !RESOURCES[name]) return;

  const { props } = RESOURCES[name];
  const { width, height } = SETTINGS;

  sprite.anchor = point(0.5);
  sprite.position = point(width / 2, height / 2);

  _.forEach(props, (value, prop) => (sprite[prop] = value));

  stage.addChild(sprite);
};

const isMobile = () => clientWidth() < 100;

const calculateRatio = () => {
  if (isMobile()) return MOBILE_RATIO;

  return RATIO;
};

const worldWidth = () => {
  if (isMobile()) return MOBILE_SETTINGS.width;

  return SETTINGS.width;
};

const calculateScale = () => {
  const ratio = calculateRatio();
  const height = clientWidth() / ratio;

  return (height * ratio) / worldWidth();
};

export default class Background extends Component {
  onCanvasWrapper = canvasWrapper => {
    if (!canvasWrapper) return;

    this.canvasWrapper = canvasWrapper;
    this.canvasStyler = styler(canvasWrapper);
  };

  resizeRender(width, height) {
    if (!this.application) return;

    this.application.renderer.resize(width - 1, height - 1);
    setTimeout(() => this.application.renderer.resize(width, height), 1);
  }

  update = () => {
    if (!this.application.render || !this.carTween || !this.backgroundTween)
      return;
    const progress = this.props.progress();

    if (progress < 0 && progress > 1) return;

    this.carTween.seek(progress);
    this.backgroundTween.seek(progress);
    this.application.render();
  };

  buildCanvas = () => {
    const scale = calculateScale();
    const { height } = SETTINGS;

    this.container.scale = point(scale);

    this.backgroundTween = tween({ to: 0, from: -height * scale, ease: linear })
      .start(y => (this.sprites.background.position.y = y))
      .pause();

    this.carTween = tween({ from: 1, to: 0.18, ease: linear })
      .pipe(value => point(value))
      .start(value => {
        this.sprites.car.scale = value;
      })
      .pause();

    const unsubscribe = this.props.addTickListener(this.update.bind(this));

    this.unsubscribe = () => {
      unsubscribe();
      this.carTween.stop();
      this.backgroundTween.stop();
    };
  };

  buildAlternateCanvas = () => {
    if (this.sprites.background)
      this.sprites.background.destroy({
        children: true,
        texture: true,
        baseTexture: true,
      });

    const { width, height } = MOBILE_SETTINGS;
    const scale = calculateScale();

    this.container.width = width;
    this.container.height = height;
    this.container.scale = point(scale);

    this.sprites.background = new PIXI.Sprite.from(backgroundMobileSource);
    this.sprites.background.anchor = point(0.5);
    this.sprites.background.width = (height * 1024) / 4026;
    this.sprites.background.height = height;
    this.sprites.background.position = point(width / 2, height / 2);

    this.container.addChild(this.sprites.background);
    this.resizeRender(clientWidth(), this.props.bounds.height);

    setTimeout(() => this.application.render(), 1000);
  };

  startAnimation() {
    if (clientWidth() < 700)
      return requestAnimationFrame(this.buildAlternateCanvas);

    return requestAnimationFrame(this.buildCanvas);
  }

  loadContext() {
    this.sprites = _.reduce(RESOURCES, initializeSprites, {});
    this.container = new PIXI.Container();

    this.container.position = point(0, 0);
    this.container.width = SETTINGS.width;
    this.container.height = SETTINGS.height;

    this.application = new PIXI.Application(
      clientWidth(),
      clientHeight(),
      SETTINGS.options
    );

    this.application.stage.addChild(this.container);
    this.canvasWrapper.appendChild(this.application.view);

    _.forEach(this.sprites, addSpriteToStage(this.container));

    this.startAnimation();
  }

  onResize = () => {
    if (clientWidth() < 700) return;

    if (this.unsubscribe) this.unsubscribe();

    this.resizeRender(clientWidth(), clientHeight());
    this.container.scale = point(calculateScale());
    this.startAnimation();
  };

  componentDidMount() {
    if (!this.canvasWrapper) return;

    this.loadContext();
    listen(window, 'resize').start(() => this.onResize());
  }

  render() {
    return <div ref={this.onCanvasWrapper} />;
  }
}
