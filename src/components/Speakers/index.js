import _ from 'lodash';
import React, { Component } from 'react';
import { linear, circOut } from 'popmotion/easing';
import { getProgressFromValue } from 'popmotion/calc';
import { listen, tween, styler, transform } from 'popmotion';

import './index.css';

import Background, { RATIO, MOBILE_RATIO } from './background';

import SpeakersList from './speakers_list.svg';
import SpeakersListMobile from './speakers_list_mobile.svg';

import {
  scrollTop,
  scrollHeight,
  clientHeight,
  clientWidth,
} from '../../utils/dom';

const fixPosition = (...stylers) =>
  stylers.forEach(styler => {
    if (styler.get('position') === 'fixed') return;

    styler.set('position', 'fixed');
  });

const unfixPosition = (...stylers) =>
  stylers.forEach(styler => {
    if (styler.get('position') !== 'fixed') return;

    styler.set('position', 'absolute');
  });

export default class Speakers extends Component {
  constructor() {
    super();
    this.state = { bounds: { width: 0, height: 0 } };
  }

  onRoot = root => (this.root = root);

  ratio() {
    if (clientWidth() <= 700) return MOBILE_RATIO;

    return RATIO;
  }

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

  scrollProgress = () => {
    const { max, min } = this.state.bounds;
    const viewportHeight = clientHeight();

    return getProgressFromValue(
      min + viewportHeight,
      max - clientHeight() / 5,
      scrollTop(),
    );
  };

  scrollProgressToStart = () => {
    const { min } = this.state.bounds;

    return getProgressFromValue(min - clientHeight(), min, scrollTop());
  };

  scrollProgressToEnd = () => {
    const height = scrollHeight();
    const viewportHeight = clientHeight();
    const min = height - viewportHeight * 1.6;
    const max = height - viewportHeight;

    return getProgressFromValue(min, max, scrollTop());
  };

  scrollProgressToFade = () => {
    const { min, max } = this.state.bounds;

    return getProgressFromValue(
      min - clientHeight() / 2,
      min + clientHeight() / 2,
      scrollTop(),
    );
  };

  renderSpeakersList() {
    if (!this.state || !this.state.bounds)
      return <svg viewBox="0 0 1440 5661" />;

    if (this.state.bounds.width < 700)
      return <SpeakersListMobile className="Speakers-listMobile" />;

    return <SpeakersList id="Speakers-list" className="Speakers-list" />;
  }

  updateStickiness(progress) {
    const { bounds } = this.state;

    if (progress < 0 || bounds.width <= 700)
      unfixPosition(this.contentStyler, this.canvasStyler);
    else if (progress >= 0 && bounds.width > 700)
      fixPosition(this.contentStyler, this.canvasStyler);
  }

  startAnimation() {
    const to = this.state.bounds.height - clientHeight();
    const listTween = tween({ to, from: 0, ease: linear })
      .start(this.listStyler.set('y'))
      .pause();

    const fadeOutTween = tween({
      ease: linear,
      from: { y: 0, scale: 1 },
      to: { y: 10, scale: 0.85 },
    })
      .pipe(transform.transformMap({ y: y => `${y}%` }))
      .start(values => {
        this.canvasStyler.set(values);
        this.contentStyler.set(values);
      })
      .pause();

    const unsubscribe = this.props.addTickListener(() => {
      const { bounds } = this.state;

      this.updateStickiness(this.scrollProgressToStart());
      listTween.seek(this.scrollProgress());
      fadeOutTween.seek(this.scrollProgressToEnd());
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

    const height = clientWidth() / this.ratio();
    const scale = height * this.ratio();
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
    const { bounds } = this.state;

    if (!this.bounds) return 0;

    return this.state.bounds.height;
  }

  render() {
    const { bounds } = this.state;

    return (
      <section
        className="Speakers"
        id="speakers"
        ref={this.onRoot}
        tabIndex="0"
        style={{ height: bounds.height }}
      >
        <div className="Speakers-background" ref={this.onCanvasWrapper}>
          <Background
            bounds={bounds}
            scrollProgress={this.scrollProgress}
            addTickListener={this.props.addTickListener}
            scrollProgressToFade={this.scrollProgressToFade}
          />
        </div>
        <div className="Speakers-content" ref={this.onContentWrapper}>
          <div className="Speakers-listWrapper" ref={this.onListWrapper}>
            {this.renderSpeakersList()}
          </div>
        </div>
      </section>
    );
  }
}
