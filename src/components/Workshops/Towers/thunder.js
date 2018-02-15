import _ from 'lodash';
import { Noise } from 'noisejs';
import { calc } from 'popmotion';

import PIXI from '../../../utils/pixi';
import { mean } from '../../../utils/2d';

const noise = new Noise();
noise.seed(Math.random());

const thunderPoint = (points, index, target, middlePoints) => {
  const lastPoint = points[index - 1];
  const stepLength = calc.distance(lastPoint, target) / (middlePoints - index);
  const angle = calc.angle(lastPoint, target);
  const pointNoise = Number(noise.perlin2(lastPoint.x, lastPoint.y));
  const normal = calc.pointFromAngleAndDistance(lastPoint, angle, stepLength);

  const angleA = _.random(0, 180);
  const lengthA = _.random(40, 140) * pointNoise;

  const angleB = _.random(0, 130);
  const lengthB = _.random(40, 140) * pointNoise;

  return mean(
    calc.pointFromAngleAndDistance(normal, angleA, lengthA),
    calc.pointFromAngleAndDistance(normal, angleB, lengthB)
  );
};

const thunderPath = (points, target, middlePoints = 60, current = 1) => {
  if (current >= middlePoints) return [...points, target];

  return thunderPath(
    [...points, thunderPoint(points, current, target, middlePoints)],
    target,
    middlePoints,
    current + 1
  );
};

export const buildThunderLines = (initial, lineStyles, application) =>
  lineStyles.map(style => {
    const graphic = new PIXI.Graphics();

    graphic.initial = initial;
    graphic.filters = [style.blur];
    graphic.style = style;

    application.stage.addChild(graphic);

    return graphic;
  });

export default thunderPath;
