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

    this.state = { animationPaused: false };
  }

  onButton = button => (this.button = button);

  onShadow = shadow => (this.shadow = shadow);

  pauseAnimation = () => {
    if (!this.animation || !this.shadowStyler) return;

    this.animation.stop();
    this.shadowStyler.set({ x: '2px', y: '2px' });
    this.setState({ animationPaused: true });
  };

  resumeAnimation = () => {
    this.startAnimation();
    this.setState({ animationPaused: false });
  };

  controlAnimation = pauseAnimation => {
    if (pauseAnimation && !this.state.animationPaused) {
      return this.pauseAnimation();
    } else if (!pauseAnimation && this.state.animationPaused) {
      return this.resumeAnimation();
    }
  };

  isVisible = ({ cursor, text }) => calc.distance(cursor, text) < LIGHT_SIZE();

  startAnimation() {
    if (!this.button || !this.shadowStyler || !this.buttonStyler) return;

    this.animation = pointer().start(cursorPosition => {
      const buttonPosition = {
        x: this.button.getBoundingClientRect().x,
        y: this.button.getBoundingClientRect().top,
      };

      const buttonSize = {
        x: this.buttonStyler.get('width'),
        y: this.buttonStyler.get('height'),
      };

      const buttonCenter = {
        x: buttonPosition.x + buttonSize.x / 2,
        y: buttonPosition.y + buttonSize.y / 2,
      };

      const pointerAngle = calc.angle(cursorPosition, buttonCenter);

      const distance = calc.distance(buttonCenter, cursorPosition);

      if (!this.isVisible({ cursor: cursorPosition, text: buttonCenter }))
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

  componentDidMount() {
    if (!this.shadow || !this.button) return;

    this.buttonStyler = styler(this.button);
    this.shadowStyler = styler(this.shadow);
    this.startAnimation();
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
