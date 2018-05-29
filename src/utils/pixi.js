/* eslint no-shadow: 0 */
/* eslint new-cap: 0 */
/* eslint no-param-reassign: 0 */
/* eslint global-require: 0 */
/* eslint import/no-mutable-exports: 0 */

import _ from 'lodash';
import isNode from 'detect-node';

import { point } from './2d';

let PIXI;
if (!isNode) {
  PIXI = require('pixi.js');
}

export const drawPoints = (graphics, points) => {
  points.forEach((point, index) => {
    if (index <= 0) return;
    const lastPoint = points[index - 1];

    graphics.moveTo(lastPoint.x, lastPoint.y).lineTo(point.x, point.y);
  });
};

export const initializeSprites = (memo, { source }, name) => ({
  ...memo,
  [name]: new PIXI.Sprite.from(source),
});

export const centerSprite = ({ width, height }, sprite) => {
  sprite.anchor = point(0.5);
  sprite.position = point(width / 2, height / 2);
};

export const assignPropToSprite = sprite => (value, prop) => {
  sprite[prop] = value;
};

export const addSpriteToStage = (stage, resources, settings) => (
  sprite,
  name
) => {
  if (!resources || !resources[name]) return;

  centerSprite(settings, sprite);
  _.forEach(resources[name].props, assignPropToSprite(sprite));

  stage.addChild(sprite);
};

export default PIXI;
