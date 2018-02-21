export const setVariable = (name, value) =>
  document.documentElement.style.setProperty(name, value);

export default { setVariable };
