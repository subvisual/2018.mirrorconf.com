import posed from 'react-pose';
import classNames from 'classnames';
import React, { cloneElement, Children, Component } from 'react';

import './index.css';

const Tab = posed.div({
  active: {
    delayChildren: 200,
    staggerChildren: 50,
  },
  inactive: {
    delayChildren: 200,
    staggerChildren: 50,
    delay: 180,
  },
});

export default class Tabss extends Component {
  constructor() {
    super();
    this.state = { activeTabIndex: 0 };
  }

  switchToTab = nextTabIndex => () =>
    this.setState({ activeTabIndex: nextTabIndex });

  isActive = index => this.state.activeTabIndex === index;

  renderNavigation = () =>
    Children.map(this.props.children, (child, index) => {
      const className = classNames({
        'Tabs-button': true,
        'is-active': this.isActive(index),
      });

      return (
        <button className={className} onClick={this.switchToTab(index)}>
          {child.props.title}
        </button>
      );
    });

  renderTabs = () =>
    Children.map(this.props.children, (child, index) => {
      const active = this.isActive(index);
      const pose = active ? 'active' : 'inactive';
      const className = classNames({
        'Tabs-tab': true,
        'is-active': active,
      });

      return (
        <Tab className={className} pose={pose}>
          {child}
        </Tab>
      );
    });

  render() {
    return (
      <div className="Tabs">
        <div className="Tabs-navigation">{this.renderNavigation()}</div>
        <div className="Tabs-content">{this.renderTabs()}</div>
      </div>
    );
  }
}
