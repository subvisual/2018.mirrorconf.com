import { calc, pointer, styler, listen, transform } from 'popmotion';
import React, { Component } from 'react';

import './index.css';

const { pipe, conditional, linearSpring } = transform;

const LIGHT_SIZE = () => window.innerWidth * 0.25;

const springRange = (from, to, strength) =>
  pipe(
    conditional(v => v < from, linearSpring(strength, from)),
    conditional(v => v > to, linearSpring(strength, to))
  );

const spring = springRange(-4, 4, 0.025);
const harderSpring = springRange(-3, 3, 0.01);

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { position: { x: 0, y: 0 }, size: { x: 0, y: 0 } };
  }

  onButton = button => {
    this.button = button;
    this.buttonStyler = styler(button);
  };

  onShadow = shadow => {
    this.shadow = shadow;
    this.shadowStyler = styler(shadow);
  };

  get size() {
    return this.state.size;
  }

  set size(point) {
    this.setState({ size: point });
  }

  get position() {
    return this.state.position;
  }

  set position(point) {
    this.setState({ position: point });
  }

  get center() {
    return {
      x: this.position.x + this.size.x / 2,
      y: this.position.y + this.size.y / 2,
    };
  }

  isVisible = ({ cursor, text }) => calc.distance(cursor, text) < LIGHT_SIZE();

  startAnimation() {
    if (!this.button || !this.shadowStyler || !this.buttonStyler) return;

    this.animation = pointer().start(cursorPosition => {
      const distance = calc.distance(this.center, cursorPosition);
      const pointerAngle = calc.angle(cursorPosition, this.center);

      if (!this.isVisible({ cursor: cursorPosition, text: this.center }))
        return;

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

      this.buttonStyler.set();
    });
  }

  calculatePosition = () => {
    const { x, top, width, height } = this.button.getBoundingClientRect();

    this.position = { x, y: top };
    this.size = { x: width, y: height };
  };

  componentDidMount() {
    if (!this.shadow || !this.button) return;

    this.calculatePosition();
    listen(window, 'resize').start(this.calculatePosition);
    listen(document, 'scroll').start(this.calculatePosition);

    requestAnimationFrame(() => this.startAnimation());
  }

  componentWillUnmount() {
    if (this.animation) return this.animation.stop();
  }

  onClick = event => {
    if (!this.props.onClick) return;

    this.props.onClick(event);
  };

  render() {
    return (
      <a
        ref={this.onButton}
        className="Button"
        href={this.props.href}
        onClick={this.onClick}
      >
        {this.props.children}
        <div ref={this.onShadow} className="Button-shadow" />
      </a>
    );
  }
}
