export const scrollTop = () =>
  document.documentElement.scrollTop || document.body.scrollTop;

export const scrollHeight = () =>
  document.documentElement.scrollHeight || document.body.scrollHeight;

export const clientHeight = () => document.documentElement.clientHeight;

export const scrollRemaining = () =>
  scrollTop() / (scrollHeight() - clientHeight());

export default {
  scrollTop,
  scrollHeight,
  clientHeight,
  scrollRemaining,
};
