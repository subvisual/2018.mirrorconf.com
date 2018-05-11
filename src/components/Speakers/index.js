import _ from 'lodash';
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

import carSource from './car.svg';
import SpeakersList from './speakers_list.svg';
import SpeakersListMobile from './speakers_list_mobile.svg';
import backgroundSource from './background.svg';
import backgroundMobileSource from './background_mobile.jpg';

import {
  scrollTop,
  scrollHeight,
  clientHeight,
  clientWidth,
} from '../../utils/dom';

const smooth = transform.smooth(100);
const toPercent = transform.transformMap({
  '--Speakers-car-translate-y': v => `${v}%`,
});

const point = (x, y = x) => ({ x: x, y: y });

const SETTINGS = {
  width: 1440,
  height: 5661,
  options: {
    antialias: false,
    resolution: 1,
    transparent: true,
    autoStart: false,
  },
};

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
    props: { anchor: point(0.5, 1), position: point(720, 0) },
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

const fixPosition = (...stylers) =>
  requestAnimationFrame(() =>
    stylers.forEach(styler => {
      if (styler.get('position') === 'fixed') return;

      styler.set('position', 'fixed');
    }),
  );

const unfixPosition = (...stylers) =>
  requestAnimationFrame(() =>
    stylers.forEach(styler => {
      if (styler.get('position') !== 'fixed') return;

      styler.set('position', 'absolute');
    }),
  );

export default class Speakers extends Component {
  constructor() {
    super();
    this.state = { width: 0, eight: 0 };
  }

  onRoot = root => (this.root = root);

  onListWrapper = listWrapper => (this.listWrapper = listWrapper);

  onCanvasWrapper = canvasWrapper => (this.canvasWrapper = canvasWrapper);

  onContentWrapper = contentWrapper => (this.contentWrapper = contentWrapper);

  scrollProgress = () => {
    const { height } = this.state;

    const max = scrollHeight() - clientHeight();
    const min = scrollHeight() - height;

    return getProgressFromValue(min, max, scrollTop());
  };

  scrollProgressToStart = () => {
    const { height } = this.state;

    const max = scrollHeight() - height;
    const min = scrollHeight() - height - clientHeight() * 2;

    return getProgressFromValue(min, max, scrollTop());
  };

  scrollProgressToFade = () => {
    const { height } = this.state;

    const max = scrollHeight() - height + clientHeight() / 2;
    const min = scrollHeight() - height - clientHeight() / 4;

    return getProgressFromValue(min, max, scrollTop());
  };

  buildAlternateCanvas() {
    const height = this.listWrapperStyler.get('height');
    this.rootStyler.set({ height });

    if (this.sprites.background)
      this.sprites.background.destroy({
        children: true,
        texture: true,
        baseTexture: true,
      });

    const backgroundRatio = 1024 / 4026;

    this.sprites.background = new PIXI.Sprite.from(backgroundMobileSource);
    this.sprites.background.width = this.state.height * backgroundRatio;
    this.sprites.background.height = this.state.height;
    this.context.stage.addChild(this.sprites.background);

    this.context.renderer.resize(this.state.width, height);
    const scale = (this.container.scale = point(scale));

    const carTween = tween({
      to: {
        y: 5300,
        scale: 1,
      },
      from: { y: 800, scale: 0.18 },
      ease: linear,
    })
      .start(({ y, scale }) => {
        this.sprites.car.y = y;
        this.sprites.car.scale = point(scale);
      })
      .pause();

    const unsubscribe = this.props.addTickListener(() => {
      this.context.render();
    });

    this.unsubscribe = () => {
      unsubscribe();
      carTween.stop();
    };
  }

  loadContext() {
    this.ratio = SETTINGS.width / SETTINGS.height;
    this.rootStyler = styler(this.root);
    this.canvasStyler = styler(this.canvasWrapper);
    this.listWrapperStyler = styler(this.listWrapper);
    this.contentWrapperStyler = styler(this.contentWrapper);
    this.listStyler = document.getElementById('Speakers-list');

    this.context = new PIXI.Application(
      this.state.width,
      clientHeight(),
      SETTINGS.options,
    );

    const scale = this.state.height * this.ratio / SETTINGS.width;

    this.container = new PIXI.Container();
    this.container.width = SETTINGS.width;
    this.container.height = SETTINGS.height;
    this.container.scale = point(scale);

    this.context.stage.addChild(this.container);

    this.canvasWrapper.appendChild(this.context.view);

    this.sprites = _.reduce(RESOURCES, initializeSprites, {});
    _.forEach(this.sprites, addSpriteToStage(this.container));

    this.rootStyler.set({ height: this.state.height });

    this.startAnimation();
  }

  buildCanvas() {
    const { width, height, options } = SETTINGS;
    const scale = this.state.height * this.ratio / width;
    const viewportHeight = clientHeight();

    this.container.scale = point(scale);
    this.container.position = point(0, 0);

    const backgroundTween = tween({
      from: -height + viewportHeight / scale - clientHeight(),
      to: 0,
      ease: linear,
    })
      .start(y => (this.sprites.background.position.y = y))
      .pause();

    const listTween = tween({
      from: 0,
      to: this.state.height - clientHeight(),
      ease: linear,
    })
      .start(this.listWrapperStyler.set('y'))
      .pause();

    const carTween = tween({
      from: {
        y: viewportHeight,
        scale: 1,
      },
      to: { y: viewportHeight - 100, scale: 0.18 },
      ease: linear,
    })
      .start(({ y, scale }) => {
        this.sprites.car.y = y;
        this.sprites.car.scale = point(scale);
      })
      .pause();

    const scaleClamper = transform.clamp(0, 1);
    this.container.anchor = point(0.5);

    const carEntryTween = tween({
      ease: linear,
      from: 0,
      to: 1,
    })
      .start(alpha => (this.container.alpha = alpha))
      .pause();

    this.listWrapperStyler.set({ position: 'absolute' });

    const unsubscribe = this.props.addTickListener(() => {
      const progress = this.scrollProgress();
      listen(window, 'scroll').start(this.resumeAnimation);

      if (this.scrollProgressToStart() <= 0)
        return unfixPosition(this.canvasStyler, this.contentWrapperStyler);
      else if (this.scrollProgressToStart() > 0)
        fixPosition(this.canvasStyler, this.contentWrapperStyler);

      carTween.seek(progress);
      carEntryTween.seek(this.scrollProgressToFade());
      listTween.seek(progress);
      backgroundTween.seek(progress);
      this.context.render();
    });

    this.unsubscribe = () => {
      unsubscribe();
      carTween.stop();
      listTween.stop();
      backgroundTween.stop();
    };
  }

  onResize() {
    if (!this.rootStyler || !this.context || !this.container) return;
    if (this.unsubscribe) this.unsubscribe();

    const { width } = this.root.getBoundingClientRect();

    if (width === this.state.width) return;

    const height = width * SETTINGS.height / SETTINGS.width;
    const scale = height * this.ratio / SETTINGS.width;

    this.rootStyler.set({ height });
    this.context.renderer.resize(width, height);
    setTimeout(() => this.context.renderer.resize(width - 1, height), 1);
    this.container.scale = point(scale);

    this.setState({ width, height });
    this.startAnimation();
  }

  startAnimation() {
    if (this.state.width < 700)
      return requestAnimationFrame(() => this.buildAlternateCanvas());

    return requestAnimationFrame(() => this.buildCanvas());
  }

  componentDidMount() {
    if (!this.root || !this.canvasWrapper || !this.contentWrapper) return;

    listen(window, 'load').start(() => {
      const { width, height } = this.root.getBoundingClientRect();

      this.setState({ width, height: height });

      requestAnimationFrame(() => this.loadContext());
    });

    listen(window, 'resize').start(() => this.onResize());
  }

  renderSpeakersList() {
    if (!this.state || !this.state.width)
      return <svg viewBox="0 0 1440 5661" />;

    if (this.state.width < 700)
      return <SpeakersListMobile className="Speakers-listMobile" />;

    return <SpeakersList id="Speakers-list" className="Speakers-list" />;
  }

  render() {
    return (
      <section
        className="Speakers"
        id="speakers"
        ref={this.onRoot}
        tabIndex="0"
      >
        <div className="Speakers-background" ref={this.onCanvasWrapper} />
        <div className="Speakers-content" ref={this.onContentWrapper}>
          <div className="Speakers-listWrapper" ref={this.onListWrapper}>
            {this.renderSpeakersList()}
          </div>
        </div>
      </section>
    );
  }
}
