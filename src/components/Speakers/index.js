import _ from 'lodash';
import React, { Component } from 'react';
import { linear, easeInOut } from 'popmotion/easing';
import { getProgressFromValue } from 'popmotion/calc';
import {
  tween,
  listen,
  styler,
  keyframes,
  composite,
  transform,
} from 'popmotion';

import './index.css';

import ArcadeFrame from './ArcadeFrame';
import { scrollTop, clientHeight, clientWidth } from '../../utils/dom';

import SpeakersList from './speakers_list.svg';
import SpeakersListMobile from './speakers_list_mobile.svg';
import Background, { RATIO, MOBILE_RATIO } from './Background';

const ratio = () => {
  if (clientWidth() <= 700) return MOBILE_RATIO;

  return RATIO;
};

export default class Speakers extends Component {
  constructor() {
    super();
    this.state = { bounds: { width: 0, height: 0 } };
  }

  onRoot = root => {
    if (!root) return;

    this.root = root;
    this.rootStyler = styler(root);
  };

  onListWrapper = listWrapper => {
    if (!listWrapper) return;

    this.listWrapper = listWrapper;
    this.listStyler = styler(listWrapper);
  };

  onCanvasWrapper = canvasWrapper => {
    if (!canvasWrapper) return;

    this.canvasWrapper = canvasWrapper;
    this.canvasStyler = styler(canvasWrapper);
  };

  onContentWrapper = contentWrapper => {
    if (!contentWrapper) return;

    this.contentWrapper = contentWrapper;
    this.contentStyler = styler(contentWrapper);
  };

  progress = () => {
    const { max, min } = this.state.bounds;
    const viewportHeight = clientHeight();

    return getProgressFromValue(min, max - viewportHeight * 2.5, scrollTop());
  };

  progressToFadeOut = () => {
    const viewportHeight = clientHeight();
    const min = this.state.bounds.max - viewportHeight * 2.5;
    const max = this.state.bounds.max - viewportHeight / 2;

    return getProgressFromValue(min, max, scrollTop());
  };

  progressToTurnOff = () => {
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

    const times = [0, 0.5, 0.75, 1];
    const ease = linear;

    this.contentStyler.set('overflow', 'hidden');

    const fadeOutTween = composite({
      z: tween({ from: 1, to: 1 }),
      y: keyframes({ values: [0, 10, 15, 15], times, ease }),
      scaleX: keyframes({ values: [1, 0.8, 0.6, 0.6], times, ease }),
      scaleY: keyframes({ values: [1, 0.8, 0, 0], times, ease }),
      opacity: keyframes({ values: [1, 1, 0, 0], times, ease: easeInOut }),
    })
      .pipe(transform.transformMap({ y: y => `${y}%` }))
      .start(this.contentStyler.set)
      .pause();

    const backgroundFade = keyframes({
      ease,
      times: [0, 0.5, 0.51],
      values: ['#a10b53', '#a10b53', '#1c3448', '#1c3448'],
    })
      .start(this.rootStyler.set('background'))
      .pause();

    const unsubscribe = this.props.addTickListener(() => {
      const progress = this.progress();
      const progressToFade = this.progressToFadeOut();

      listTween.seek(progress);
      backgroundFade.seek(progressToFade);
      _.each(fadeOutTween, animation => animation.seek(progressToFade));
    });

    this.unsubscribe = () => {
      unsubscribe();
      listTween.stop();
      backgroundFade.stop();
      _.each(fadeOutTween, animation => animation.stop());
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

    this.calculateBounds();
    if (clientWidth() > 700) requestAnimationFrame(() => this.startAnimation());

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
        <div className="Speakers-background">
          <div ref={this.onContentWrapper}>
            <div style={{ overflow: 'hidden' }} ref={this.onCanvasWrapper}>
              <Background
                bounds={this.state.bounds}
                progress={this.progress}
                addTickListener={this.props.addTickListener}
              />
            </div>
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
            scrollProgress={this.progressToFadeOut}
            addTickListener={this.props.addTickListener}
          />
        </div>
      </section>
    );
  }
}
