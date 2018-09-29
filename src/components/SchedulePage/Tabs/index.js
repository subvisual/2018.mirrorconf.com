import posed from 'react-pose';
import classNames from 'classnames';
import React, { cloneElement, Children, Component } from 'react';

import './index.css';

import back from '../back.svg';

const Tab = posed.div({
  active: {
    delayChildren: 200,
    staggerChildren: 50,
  },
  inactive: {
    delayChildren: 200,
    staggerChildren: 50,
    delay: 180,
    beforeChildren: false,
  },
});

const Image = posed.img({
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0,
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
      const active = this.isActive(index);
      console.log(active);
      const pose = active ? 'active' : 'inactive';
      const className = classNames({
        'Tabs-button': true,
        'is-active': active,
        flip: index === 0,
      });

      return (
        <button className={className} onClick={this.switchToTab(index)}>
          {child.props.title}
          <Image pose={pose} className="Tabs-activeTabIndicator" src={back} />
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
