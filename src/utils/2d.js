export const point = (x, y = x) => ({ x: Number(x), y: Number(y) });

export const mult = (a, f) => ({ x: a.x * f, y: a.y * f });

export const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

export const mean = (a, b) => mult(add(a, b), 0.5);
