import classNames from 'classnames';
import { calc, pointer, styler, transform } from 'popmotion';
import React, { Component } from 'react';

import './index.css';

import WithNodeBounds from '../../containers/withNodeBounds';

const { pipe, conditional, linearSpring } = transform;

const springRange = (from, to, strength) =>
  pipe(
    conditional(v => v < from, linearSpring(strength, from)),
    conditional(v => v > to, linearSpring(strength, to))
  );

const spring = springRange(-4, 4, 0.025);
const harderSpring = springRange(-3, 3, 0.01);

class Button extends Component {
  get center() {
    return this.props.center;
  }

  onButton = button => {
    this.props.onNode(button);
    this.button = button;
    this.buttonStyler = styler(button);
  };

  onShadow = shadow => {
    this.shadow = shadow;
    this.shadowStyler = styler(shadow);
  };

  update = cursorPosition => {
    if (!this.props.isVisible()) return;

    const { x, pageY: y } = cursorPosition;
    const distance = calc.distance(this.center, { x, y });
    const pointerAngle = calc.angle({ x, y }, this.center);

    const textShadowPosition = calc.pointFromAngleAndDistance(
      { x: 0, y: 0 },
      pointerAngle,
      harderSpring(distance)
    );

    this.shadowStyler.set(
      calc.pointFromAngleAndDistance(
        { x: 0, y: 0 },
        pointerAngle,
        spring(distance)
      )
    );

    this.buttonStyler.set({
      'text-shadow': `${textShadowPosition.x}px ${
        textShadowPosition.y
      }px 2px rgba(31, 48, 70, 0.397702)`,
    });
  };

  startAnimation() {
    if (!this.button || !this.shadowStyler || !this.buttonStyler) return;

    this.animation = pointer().start(this.update);
  }

  componentDidMount() {
    if (!this.shadow || !this.button) return;

    this.startAnimation();
  }

  componentWillUnmount() {
    if (this.animation) return this.animation.stop();
  }

  onClick = event => {
    if (!this.props.onClick) return;

    this.props.onClick(event);
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const className = classNames({
      Button: true,
      'Button--fullWidth': this.props.fullWidth,
    });
    return (
      <a
        ref={this.onButton}
        className={className}
        href={this.props.href}
        onClick={this.onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {this.props.children}
        <div ref={this.onShadow} className="Button-shadow" />
      </a>
    );
  }
}

export default WithNodeBounds(Button);
