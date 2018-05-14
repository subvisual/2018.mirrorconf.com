import { getProgressFromValue } from 'popmotion/calc';

export const scrollTop = () => {
  if (!document || !document.documentElement) return 0;
  return document.documentElement.scrollTop || document.body.scrollTop;
};

export const scrollHeight = () => {
  if (!document || !document.documentElement) return 0;
  return Math.min(
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );
};

export const clientHeight = () => {
  if (!document || !document.documentElement) return 0;
  return document.documentElement.clientHeight;
};

export const clientWidth = () => {
  if (!document || !document.documentElement) return 0;
  return document.documentElement.clientWidth;
};

export const scrollRemaining = () =>
  getProgressFromValue(0, scrollHeight() - clientHeight(), scrollTop());

export default {
  scrollTop: scrollTop,
  clientWidth: clientWidth,
  scrollHeight: scrollHeight,
  clientHeight: clientHeight,
  scrollRemaining: scrollRemaining,
};
