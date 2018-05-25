import React, { Component } from 'react';
import { linear, cubicBezier } from 'popmotion/easing';
import { getProgressFromValue } from 'popmotion/calc';
import { listen, tween, styler, transform } from 'popmotion';

import './index.css';

import ArcadeFrame from './ArcadeFrame';
import Background, { RATIO, MOBILE_RATIO } from './Background';

import SpeakersList from './speakers_list.svg';
import SpeakersListMobile from './speakers_list_mobile.svg';

import {
  scrollTop,
  scrollHeight,
  clientHeight,
  clientWidth,
} from '../../utils/dom';

const ratio = () => {
  if (clientWidth() <= 700) return MOBILE_RATIO;

  return RATIO;
};

const quicklyEnter = cubicBezier(0, 1, 0, 1);

export default class Speakers extends Component {
  constructor() {
    super();
    this.state = { bounds: { width: 0, height: 0 } };
  }

  onRoot = root => {
    this.root = root;
    this.rootStyler = styler(root);
  };

  onListWrapper = listWrapper => {
    this.listWrapper = listWrapper;
    this.listStyler = styler(listWrapper);
  };

  onCanvasWrapper = canvasWrapper => {
    this.canvasWrapper = canvasWrapper;
    this.canvasStyler = styler(canvasWrapper);
  };

  onContentWrapper = contentWrapper => {
    this.contentWrapper = contentWrapper;
    this.contentStyler = styler(contentWrapper);
  };

  progress = () => {
    const { max, min } = this.state.bounds;
    const viewportHeight = clientHeight();

    return getProgressFromValue(min, max - viewportHeight * 2, scrollTop());
  };

  progressToFadeOut = () => {
    const viewportHeight = clientHeight();
    const min = this.state.bounds.max - viewportHeight * 2;
    const max = this.state.bounds.max - viewportHeight;

    return getProgressFromValue(min, max, scrollTop());
  };

  renderSpeakersList() {
    if (!this.state || !this.state.bounds)
      return <svg viewBox="0 0 1440 5661" />;

    if (this.state.bounds.width < 700)
      return <SpeakersListMobile className="Speakers-listMobile" />;

    return <SpeakersList id="Speakers-list" className="Speakers-list" />;
  }

  startAnimation() {
    const listTween = tween({
      to: 0,
      from: -this.state.bounds.height,
      ease: linear,
    })
      .start(this.listStyler.set('y'))
      .pause();

    const fadeOutTween = tween({
      ease: linear,
      from: { y: 0, scale: 1 },
      to: { y: 10, scale: 0.8 },
    })
      .pipe(transform.transformMap({ y: y => `${y}%` }))
      .start(values => {
        this.canvasStyler.set(values);
        this.contentStyler.set(values);
      })
      .pause();

    const unsubscribe = this.props.addTickListener(() => {
      listTween.seek(this.progress());
      fadeOutTween.seek(this.progressToFadeOut());
    });

    this.unsubscribe = () => {
      unsubscribe();
      listTween.stop();
    };
  }

  calculateBounds() {
    const { width, top } = this.root.getBoundingClientRect();

    if (!width) setTimeout(() => this.onResize(), 100);
    if (width === this.state.width) return;

    const height = clientWidth() / ratio();
    const scale = height * ratio();
    const min = top + scrollTop();
    const max = top + height + scrollTop();
    this.setState({ bounds: { width, height, min, max, scale } });
  }

  onResize() {
    if (!this.root) return;
    if (this.unsubscribe) this.unsubscribe();

    this.calculateBounds();

    if (clientWidth() > 700) requestAnimationFrame(() => this.startAnimation());
  }

  componentDidMount() {
    if (!this.root) return setTimeout(() => this.onResize(), 100);

    listen(window, 'load').start(() => {
      this.calculateBounds();
      if (clientWidth() > 700)
        requestAnimationFrame(() => this.startAnimation());
    });

    listen(window, 'resize').start(() => this.onResize());
  }

  get height() {
    if (!this.state.bounds) return 0;

    return this.state.bounds.height;
  }

  render() {
    return (
      <section
        className="Speakers"
        id="speakers"
        ref={this.onRoot}
        style={{ height: this.height }}
      >
        <div className="Speakers-background" ref={this.onCanvasWrapper}>
          <Background
            bounds={this.state.bounds}
            progress={this.progress}
            addTickListener={this.props.addTickListener}
          />
        </div>
        <div className="Speakers-content" ref={this.onContentWrapper}>
          <div
            tabIndex="0"
            className="Speakers-listWrapper"
            ref={this.onListWrapper}
          >
            {this.renderSpeakersList()}
          </div>
        </div>
        <ArcadeFrame
          bounds={this.state.bounds}
          addTickListener={this.props.addTickListener}
        />
      </section>
    );
  }
}
