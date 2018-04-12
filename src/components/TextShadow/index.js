import _ from 'lodash';
import React, { Children, Component, cloneElement } from 'react';
import { calc, pointer, styler, listen, transform } from 'popmotion';

const { pipe, conditional, linearSpring } = transform;

const LIGHT_SIZE = () => window.innerWidth * 0.6;

const springRange = (from, to, strength) =>
  pipe(
    conditional(v => v < from, linearSpring(strength, from)),
    conditional(v => v > to, linearSpring(strength, to)),
  );

const spring = springRange(-4, 4, 0.01);

const addVec = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const invertVec = a => ({ x: -a.x, y: -a.y });
const multiplyVec = (a, b) => ({ x: a.x * b.x, y: a.y * b.y });
const inverVecAxis = axis => a => ({ [axis]: -a[axis], ...a });

const insideVisibleRadious = pointer => point => {
  const visibleRadious = LIGHT_SIZE() * 0.5;

  return calc.distance(pointer, point) < visibleRadious;
};

const isVisible = (pointer, element, size) => {
  const halfSize = multiplyVec(size, { x: 0.5, y: 0.5 });

  const topRight = addVec(element, halfSize);
  const bottomLeft = addVec(element, invertVec(halfSize));
  const topLeft = addVec(element, inverVecAxis('x')(halfSize));
  const bottomRight = addVec(element, inverVecAxis('y')(halfSize));

  return _.some(
    [topRight, bottomLeft, topLeft, bottomRight],
    insideVisibleRadious(pointer),
  );
};

const elementPosition = ({ element: { element, styler }, pointer }) => {
  const positon = {
    x: element.getBoundingClientRect().x,
    y: element.getBoundingClientRect().top,
  };

  const size = {
    x: styler.get('width'),
    y: styler.get('height'),
  };

  const center = {
    x: positon.x + size.x / 2,
    y: positon.y + size.y / 2,
  };

  return {
    element,
    center,
    styler,
    pointer,
    isVisible: isVisible(pointer, center, size),
  };
};

const getPointerAngleAndDistance = ({ center, styler, pointer, isVisible }) => {
  const angle = calc.angle(pointer, center);
  const distance = calc.distance(pointer, center);

  return { angle, distance, isVisible };
};

const setShadowPosition = ({ styler }) => ({ angle, distance, isVisible }) => {
  if (!isVisible) return;

  const shadowPosition = calc.pointFromAngleAndDistance(
    { x: 0, y: 0 },
    angle,
    spring(distance),
  );

  styler.set({
    'text-shadow': `${shadowPosition.x}px ${
      shadowPosition.y
    }px 2px rgba(31, 48, 70, 0.2)`,
  });
};

const textShadowAnimation = element =>
  pipe(elementPosition, getPointerAngleAndDistance, setShadowPosition(element));

export default class TextShadow extends Component {
  constructor(props) {
    super(props);

    this.elements = [];
    this.animations = [];
  }

  startAnimations = () => {
    pointer().start(pointer => {
      this.animations = this.elements.map(element =>
        textShadowAnimation(element)({ element, pointer }),
      );
    });
  };

  stopAnimations = () => {
    this.animations.map(animation => animation.stop);
  };

  onElement = element => {
    this.stopAnimations();

    this.elements.push({ element, styler: styler(element) });

    this.startAnimations();
  };

  get children() {
    return Children.map(this.props.children, child =>
      cloneElement(child, { ref: this.onElement }),
    );
  }
  render() {
    return <div className={this.props.className}>{this.children}</div>;
  }
}
