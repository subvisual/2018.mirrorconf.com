import { getProgressFromValue } from 'popmotion/calc';

let widthCache = 0;
let heightCache = 0;
let scrollTopCache = 0;
let scrollHeightCache = 0;

const updateWidthCache = width => {
  if (widthCache === width) return;

  widthCache = width;
};

const updateHeightCache = height => {
  if (heightCache === height) return;

  heightCache = height;
};

const updateScrollTopCache = scrollTop => {
  if (scrollTopCache === scrollTop) return;

  scrollTopCache = scrollTop;
};

const updateScrollHeightCache = scrollHeight => {
  if (scrollHeightCache === scrollHeight) return;

  scrollHeightCache = scrollHeight;
};

const getWindowWidth = (resolve, reject) => {
  if (!document || !document.documentElement) return reject();
  return resolve(document.documentElement.clientWidth);
};

const getWindowHeight = (resolve, reject) => {
  if (!document || !document.documentElement) return reject();
  return resolve(document.documentElement.clientHeight);
};

const getScrollTop = (resolve, reject) => {
  if (!document || !document.documentElement) return reject();

  return resolve(document.documentElement.scrollTop || document.body.scrollTop);
};

const getScrollHeight = (resolve, reject) => {
  if (!document || !document.documentElement) return reject();

  return resolve(
    Math.min(
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )
  );
};

export const scrollTop = () => {
  if (!scrollTopCache) {
    new Promise(getScrollTop).then(updateScrollTopCache);

    return getScrollTop(value => value);
  }

  new Promise(getScrollTop).then(updateScrollTopCache);

  return scrollTopCache;
};

export const scrollHeight = () => {
  if (!scrollTopCache) {
    new Promise(getScrollHeight).then(updateScrollHeightCache);

    return getScrollHeight(value => value);
  }

  new Promise(getScrollHeight).then(updateScrollHeightCache);

  return scrollHeightCache;
};

export const clientHeight = () => {
  if (!heightCache) {
    new Promise(getWindowHeight).then(updateHeightCache);

    return getWindowHeight(value => value);
  }

  new Promise(getWindowHeight).then(updateHeightCache);

  return heightCache;
};

export const clientWidth = () => {
  if (!widthCache) {
    new Promise(getWindowWidth).then(updateWidthCache);

    return getWindowWidth(value => value);
  }

  new Promise(getWindowWidth).then(updateWidthCache);

  return widthCache;
};

export const scrollRemaining = () =>
  getProgressFromValue(0, scrollHeight() - clientHeight(), scrollTop());

export default {
  scrollTop,
  clientWidth,
  scrollHeight,
  clientHeight,
  scrollRemaining,
};
