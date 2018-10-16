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
        bounds: { x: 0, min: 0, max: 0, width: 0, height: 0 },
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

    get center() {
      return {
        x: this.bounds.x + this.bounds.width / 2,
        y: this.min + this.bounds.height / 2,
      };
    }

    progressToVisible = (offset = 0) =>
      calc.getProgressFromValue(0, this.min - offset, scrollTop());

    progressToInvisbile = (offset = 0) =>
      calc.getProgressFromValue(this.min, this.max - offset, scrollTop());

    isVisible = (offset = 0) => {
      const minVisibleY = scrollTop();
      const maxVisibleY = scrollTop() + clientHeight() - offset;

      if (maxVisibleY - minVisibleY >= this.bounds.height)
        return this.min >= minVisibleY && this.max <= maxVisibleY;

      return this.max >= minVisibleY && maxVisibleY >= this.min;
    };

    wait = () => {
      if (this.attempts > 3) return;

      this.attempts = this.attempts + 1;
      setTimeout(this.startTracking, 500);
    };

    updateBounds = () => {
      const { x, top, width, height } = this.node.getBoundingClientRect();

      this.bounds = {
        x,
        width,
        height,
        min: top + scrollTop(),
        max: top + scrollTop() + height,
      };
    };

    startTracking = () => {
      if (!this.node) return this.wait();

      const onWindowLoad = listen(window, 'load').start(this.updateBounds);
      const onWindowResize = listen(window, 'resize').start(this.updateBounds);

      this.listeners = [onWindowLoad, onWindowResize];
      this.updateBounds();
    };

    stopTracking = () => {
      this.listeners.forEach(listener => {
        if (listener && listener.stop) return listener.stop();
      });
    };

    componentDidMount() {
      this.mounted = true;
      this.startTracking();
    }

    componentWillUnmount() {
      this.stopTracking();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          bounds={this.bounds}
          center={this.center}
          isVisible={this.isVisible}
          progressToVisible={this.progressToVisible}
          progressToInvisbile={this.progressToInvisbile}
          onNode={node => {
            this.node = node;
          }}
        />
      );
    }
  };
