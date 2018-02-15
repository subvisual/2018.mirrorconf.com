import React, { Component } from 'react';
import { listen } from 'popmotion';
import { getProgressFromValue } from 'popmotion/calc';

import Light from '../Light';
import Workshop from '../Workshop';
import Towers from './Towers';
import { clientHeight, scrollTop } from '../../utils/dom';

import './index.css';

export default class Workshops extends Component {
  constructor(props) {
    super(props);
    this.state = { bounds: { top: 0, height: 0, min: 0, max: 0 } };
  }

  componentWillUnmount() {
    if (this.onLoadListener) this.onLoadListener.stop();

    if (this.onResizeListener) this.onResizeListener.stop();
  }

  componentDidMount() {
    setTimeout(this.calculateBounds, 1000);
    this.onLoadListener = listen(window, 'load').start(this.calculateBounds);
    this.onResizeListener = listen(window, 'resize').start(
      this.calculateBounds
    );
  }

  onRoot = root => {
    this.root = root;
  };

  progress = () => {
    const { max, min } = this.state.bounds;
    if (max === 0 && min === 0) return 0;

    return getProgressFromValue(min, max - clientHeight(), scrollTop());
  };

  lightGrowProgress = () => {
    const { min, max } = this.state.bounds;
    if (max === 0 && min === 0) return 0;

    const height = clientHeight() * 2 * 0.6;

    return getProgressFromValue(min, min + height, scrollTop());
  };

  calculateBounds = () => {
    if (!this.root) return setTimeout(this.calculateBounds, 500);

    const { top, height } = this.root.getBoundingClientRect();

    if (!height) return setTimeout(this.calculateBounds, 500);
    if (height === this.state.height) return;

    const min = top + scrollTop();
    const max = top + height + scrollTop();
    this.setState({ bounds: { top, height, min, max } });
  };

  renderWorkshop = (workshop, index) => (
    <li key={index} className="Workshops-listItem">
      <Workshop index={index} {...workshop.node.frontmatter} />
    </li>
  );

  renderWorkshops() {
    const { edges: workshops } = this.props.data.allMarkdownRemark;
    return (
      <ul className="Workshops-list">{workshops.map(this.renderWorkshop)}</ul>
    );
  }

  render() {
    return (
      <section className="Workshops" id="workshops" ref={this.onRoot}>
        <Light
          progress={this.progress}
          lightGrowProgress={this.lightGrowProgress}
        />
        <div className="Workshops-spacer" />
        <Towers
          addTickListener={this.props.addTickListener}
          lightGrowProgress={this.lightGrowProgress}
        />
        <div className="Workshops-wrapper">{this.renderWorkshops()}</div>
      </section>
    );
  }
}
