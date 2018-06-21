import _ from 'lodash';
import { listen, calc } from 'popmotion';
import React, { Component } from 'react';

import { clientHeight, scrollTop } from '../utils/dom';

export default WrappedComponent =>
  class WithNodeBounds extends Component {
    constructor(props) {
      super(props);

      this.state = {
        node: undefined,
        mounted: false,
        attempts: 0,
        bounds: { min: 0, max: 0, width: 0, height: 0 },
        listeners: [],
      };
    }

    get bounds() {
      return this.state.bounds;
    }

    set bounds(bounds) {
      this.setState({ bounds });
    }

    get min() {
      return this.bounds.min;
    }

    get max() {
      return this.bounds.max;
    }

    get width() {
      return this.bounds.width;
    }

    get height() {
      return this.bounds.height;
    }

    get node() {
      return this.state.node;
    }

    set node(node) {
      this.setState({ node });
    }

    get mounted() {
      return this.state.mounted;
    }

    set mounted(mounted) {
      return this.setState({ mounted });
    }

    get attempts() {
      return this.state.attempts;
    }

    set attempts(attempts) {
      this.setState({ attempts });
    }

    get listeners() {
      return this.state.listeners;
    }

    set listeners(listeners) {
      this.setState({ listeners: [...this.listeners, ...listeners] });
    }

    isVisible = () => this.min <= scrollTop() && this.max >= scrollTop();

    progressToInvisbile = () =>
      calc.getProgressFromValue(this.min, this.max, scrollTop());

    wait = () => {
      if (this.attempts > 3) return;

      this.attempts = this.attempts + 1;
      setTimeout(this.startTracking, 500);
    };

    updateBounds = () => {
      const { top, width, height } = this.node.getBoundingClientRect();

      this.bounds = {
        width,
        height,
        min: top + scrollTop(),
        max: top + height + scrollTop() - clientHeight(),
      };
    };

    startTracking = () => {
      if (!this.node) return this.wait();

      const onWindowLoad = listen(window, 'load').start(this.updateBounds);
      const onWindowResize = listen(window, 'resize').start(this.updateBounds);

      this.listeners = [onWindowLoad, onWindowResize];
    };

    stopTracking = () => {
      this.listeners.forEach(listener => {
        if (listener && listener.stop) return listener.stop();
      });

      this.listeners = [];
    };

    componentDidMount() {
      this.mounted = true;
      this.startTracking();
    }

    componentWillUnmount() {
      this.stopTracking();
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (_.isEqual(this.state, nextState)) return false;

      if (_.isEqual(this.props, nextProps)) return false;

      return true;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          bounds={this.bounds}
          isVisible={this.isVisible}
          progressToInvisbile={this.progressToInvisbile}
          onNode={node => {
            this.node = node;
          }}
        />
      );
    }
  };
