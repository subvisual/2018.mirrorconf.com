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
    if (!scrollbar) return;

    this.scrollbar = scrollbar;
    this.scrollbarY = value(0, styler(scrollbar).set('y'));
  };

  onScrollbarContainer = scrollbarContainer => {
    if (!scrollbarContainer) return;

    this.scrollbarContainer = scrollbarContainer;
  };

  moveScrollbar = event => {
    event.preventDefault();

    pointerY(this.scrollbarY.get())
      .pipe(transform.clamp(0, this.scrollHeight))
      .pipe(this.props.onScroll(this.scrollHeight))
      .start(this.scrollbarY);
  };

  moveScrollbarBy = amount => event => {
    event.preventDefault();

    if (!this.scrollbarY) return;

    const scrollClamp = transform.clamp(0, this.scrollHeight);
    const scrollAmount = scrollClamp(this.scrollbarY.get() + amount);

    this.scrollbarY.update(scrollAmount);
    this.props.onScroll(this.scrollHeight)(scrollAmount);
  };

  get scrollHeight() {
    return this.state.scrollbarContainerHeight - this.state.scrollbarHeight;
  }

  stopScrollbar = () => this.scrollbarY.stop();

  getDimensions = () => {
    if (!this.scrollbar || !this.scrollbarContainer) return;

    const scrollbarHeight = heightOf(this.scrollbar);
    const scrollbarContainerHeight = heightOf(this.scrollbarContainer);

    if (!scrollbarHeight || !scrollbarContainerHeight)
      setTimeout(() => this.getDimensions(), 100);

    this.setState({
      scrollbarHeight,
      scrollbarContainerHeight,
    });
  };

  componentDidMount() {
    this.getDimensions();

    this.listeners = [
      listen(window, 'resize').start(() => this.getDimensions()),
      listen(this.scrollbar, 'mouseup touchend').start(this.stopScrollbar),
      listen(this.scrollbar, 'mousedown touchstart').start(this.moveScrollbar),
    ];
  }

  componentWillUnmount() {
    this.listeners.forEach(listener => listener.stop());
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
        <img styleName="up" onClick={this.moveScrollbarBy(-50)} src={Up} />
        <div styleName="bar" ref={this.onScrollbarContainer}>
          <img styleName="thumb" ref={this.onScrollbar} src={Thumb} />
        </div>
        <img styleName="down" onClick={this.moveScrollbarBy(50)} src={Down} />
      </div>
    );
  }
}
