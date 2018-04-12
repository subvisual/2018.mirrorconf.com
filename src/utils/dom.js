import { getProgressFromValue } from 'popmotion/calc';

export const scrollTop = () =>
  document.documentElement.scrollTop || document.body.scrollTop;

export const scrollHeight = () =>
  Math.min(
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );

export const clientHeight = () => document.documentElement.clientHeight;

export const scrollRemaining = () =>
  getProgressFromValue(0, scrollHeight() - clientHeight(), scrollTop());

export default {
  scrollTop,
  scrollHeight,
  clientHeight,
  scrollRemaining,
};
