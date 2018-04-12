import React, { Component } from 'react';
import { value, listen, styler, pointer, transform } from 'popmotion';

import Up from './up.svg';
import Down from './down.svg';
import Thumb from './bar.svg';

import './index.module.css';

const pointerY = y => pointer({ y }).pipe(values => values.y);

const heightOf = element => element.getBoundingClientRect().height;

export default class ScrollBar extends Component {
  constructor() {
    super();
    this.state = { scrollbarHeight: 0, scrollbarContainerHeight: 0 };
  }

  onScrollbar = scrollbar => {
    this.scrollbar = scrollbar;
    this.scrollbarY = value(0, styler(scrollbar).set('y'));
  };

  onScrollbarContainer = scrollbarContainer =>
    (this.scrollbarContainer = scrollbarContainer);

  moveScrollbar = event => {
    event.preventDefault();

    pointerY(this.scrollbarY.get())
      .pipe(transform.clamp(0, this.scrollHeight))
      .pipe(this.props.onScroll(this.scrollHeight))
      .start(this.scrollbarY);
  };

  get scrollHeight() {
    return this.state.scrollbarContainerHeight - this.state.scrollbarHeight;
  }

  stopScrollbar = () => this.scrollbarY.stop();

  onResize = () => {
    if (!this.scrollbar || !this.scrollbarContainer) return;

    const scrollbarHeight = heightOf(this.scrollbar);
    const scrollbarContainerHeight = heightOf(this.scrollbarContainer);

    this.setState({ scrollbarHeight, scrollbarContainerHeight });
  };

  componentDidMount() {
    if (!this.scrollbar || !this.scrollbarContainer) return;

    const scrollbarHeight = heightOf(this.scrollbar);
    const scrollbarContainerHeight = heightOf(this.scrollbarContainer);

    this.setState({ scrollbarHeight, scrollbarContainerHeight });

    listen(window, 'resize').start(() => this.onResize());
    listen(document, 'mouseup touchend').start(this.stopScrollbar);
    listen(this.scrollbar, 'mousedown touchstart').start(this.moveScrollbar);
  }

  updateScrollBarPosition() {
    if (!this.scrollbar) return;

    const scrollAmount = this.scrollHeight * this.props.viewportScrollProgress;
    this.scrollbarY.update(scrollAmount);
  }

  render() {
    this.updateScrollBarPosition();
    return (
      <div styleName="root" aria-hidden="true">
        <img styleName="up" src={Up} />
        <div styleName="bar" ref={this.onScrollbarContainer}>
          <img styleName="thumb" ref={this.onScrollbar} src={Thumb} />
        </div>
        <img styleName="down" src={Down} />
      </div>
    );
  }
}
