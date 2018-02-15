import _ from 'lodash';
import React, { Children, Component, cloneElement } from 'react';
import { calc, pointer, styler, listen, transform } from 'popmotion';

import { clientWidth } from '../../utils/dom';

const { pipe, conditional, linearSpring } = transform;

const LIGHT_SIZE = () => clientWidth() * 0.6;

const springRange = (from, to, strength) =>
  pipe(
    conditional(v => v < from, linearSpring(strength, from)),
    conditional(v => v > to, linearSpring(strength, to))
  );

const spring = springRange(-4, 4, 0.01);

const addVec = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const invertVec = a => ({ x: -a.x, y: -a.y });
const multiplyVec = (a, b) => ({ x: a.x * b.x, y: a.y * b.y });
const inverVecAxis = axis => a => ({ [axis]: -a[axis], ...a });

const insideVisibleRadious = (lightSource, visibleRadious) => point =>
  calc.distance(lightSource, point) < visibleRadious;

const isVisible = (lightSource, visibleRadious, element, size) => {
  const halfSize = multiplyVec(size, { x: 0.5, y: 0.5 });

  const topRight = addVec(element, halfSize);
  const bottomLeft = addVec(element, invertVec(halfSize));
  const topLeft = addVec(element, inverVecAxis('x')(halfSize));
  const bottomRight = addVec(element, inverVecAxis('y')(halfSize));

  return _.some(
    [topRight, bottomLeft, topLeft, bottomRight],
    insideVisibleRadious(lightSource, visibleRadious)
  );
};

const getElementPosition = (lightSource, visibleRadious) => element => ({
  ...element,
  angle: calc.angle(lightSource, element.center),
  distance: calc.distance(lightSource, element.center),
  isVisible: isVisible(
    lightSource,
    visibleRadious,
    element.center,
    element.size
  ),
});

const setShadowPosition = element => {
  if (!element.isVisible) return;

  const shadowPosition = calc.pointFromAngleAndDistance(
    { x: 0, y: 0 },
    element.angle,
    spring(element.distance)
  );

  element.styler.set({
    'text-shadow': `
      ${shadowPosition.x}px ${shadowPosition.y}px 2px rgba(31, 48, 70, 0.2)`,
  });
};

const textShadowAnimation = (lightSource, visibleRadious) =>
  pipe(getElementPosition(lightSource, visibleRadious), setShadowPosition);

const calculateBounds = node => {
  const { x, top, width, height } = node.getBoundingClientRect();

  return {
    size: { x: width, y: height },
    center: { x: x + width / 2, y: top + height / 2 },
  };
};

const element = node => {
  const { center, size } = calculateBounds(node);

  return { size, node, center, styler: styler(node) };
};

const updateElement = el => {
  const { center, size } = calculateBounds(el.node);

  return { ...el, size, center };
};

export default class TextShadow extends Component {
  constructor(props) {
    super(props);

    this.elements = [];
    this.listener = null;
  }

  componentWillUnmount() {
    if (this.onResizeListener) this.onResizeListener.stop();
    if (this.onScrollListener) this.onScrollListener.stop();
  }

  componentDidMount() {
    this.onResizeListener = listen(window, 'resize').start(
      this.recalculateElements
    );
    this.onScrollListener = listen(document, 'scroll').start(
      this.recalculateElements
    );
  }

  recalculateElements = () => {
    this.elements = this.elements.map(updateElement);
  };

  startAnimations = () => {
    this.listener = pointer().start(this.onLightSourceMove);
  };

  onLightSourceMove = lightSource => {
    const visibleRadious = LIGHT_SIZE() * 0.5;

    const updateFunc = textShadowAnimation(lightSource, visibleRadious);

    let i = this.elements.length;
    while (i--) {
      updateFunc(this.elements[i]);
    }
  };

  stopAnimations = () => {
    if (!this.listener) return;

    this.listener.stop();
    this.listener = null;
  };

  onNode = node => {
    if (!node) return;

    if (this.id) clearTimeout(this.id);
    this.id = setTimeout(this.startAnimations, 1000);

    this.elements.push(element(node));
  };

  get children() {
    return Children.map(this.props.children, child =>
      cloneElement(child, { ref: this.onNode })
    );
  }

  render() {
    return <div className={this.props.className}>{this.children}</div>;
  }
}
