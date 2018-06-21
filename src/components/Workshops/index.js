import React, { Component } from 'react';
import { listen } from 'popmotion';
import { getProgressFromValue } from 'popmotion/calc';

import Light from '../Light';
import Workshop from '../Workshop';
import Towers from './Towers';
import { clientHeight, scrollTop } from '../../utils/dom';

import './index.css';

import WORKSHOPS from './workshops';
import workshopsTitle from './workshops_title.png';

export default class Workshops extends Component {
  constructor(props) {
    super(props);
    this.state = { bounds: { top: 0, height: 0, min: 0, max: 0 } };
  }

  componentDidMount() {
    if (!this.root) return;

    listen(window, 'load').start(this.calculateBounds);
    listen(window, 'resize').start(this.calculateBounds);
  }

  onRoot = root => {
    this.root = root;
  };

  progress = () => {
    const { max, min } = this.state.bounds;

    return getProgressFromValue(min, max - clientHeight(), scrollTop());
  };

  lightGrowProgress = () => {
    const { min } = this.state.bounds;
    const height = clientHeight() * 2 * 0.6;

    return getProgressFromValue(min, min + height, scrollTop());
  };

  calculateBounds = () => {
    const { top, height } = this.root.getBoundingClientRect();

    if (!height) setTimeout(this.calculateBounds, 100);
    if (height === this.state.height) return;

    const min = top + scrollTop();
    const max = top + height + scrollTop();
    this.setState({ bounds: { top, height, min, max } });
  };

  renderWorkshop = (workshop, index) => (
    <li key={index} className="Workshops-listItem">
      <Workshop index={index} {...workshop} />
    </li>
  );

  renderWorkshops() {
    return (
      <ul className="Workshops-list">{WORKSHOPS.map(this.renderWorkshop)}</ul>
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
        <Towers addTickListener={this.props.addTickListener} />
        <h2 className="Workshops-title">
          <img src={workshopsTitle} alt="Workshops written with lamps" />
        </h2>
        <div className="Workshops-wrapper">{this.renderWorkshops()}</div>
      </section>
    );
  }
}
