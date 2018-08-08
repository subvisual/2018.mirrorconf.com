export function scrollBy(x, y, opts) {
  const { offset } = opts;
  const offsetX = offset ? offset.x : 0;
  const offsetY = offset ? offset.y : 0;

  return window.scrollBy(x + offsetX, y + offsetY);
}

export function scrollToElement(element, opts) {
  if (!element) return;

  const { x, y } = element.getBoundingClientRect();

  return scrollBy(x, y, opts);
}

export function scrollToElementById(elementId, opts) {
  return scrollToElement(document.getElementById(elementId), opts);
}

export function scrollToLocationHash(opts) {
  const locationHash = window.location.hash;

  if (!locationHash) return;

  return scrollToElementById(locationHash.substr(1), opts);
}
