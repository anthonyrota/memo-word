export function random(a, b) {
  return Math.random() * (b - a) + a;
}

export function randomInt(a, b) {
  return Math.floor(random(a, b + 1));
}

export function format(number, suffix = '') {
  return number === Math.floor(number) ? number : number.toFixed(3) + suffix;
}

export function storeDefault(name, value) {
  if (!store.get(name)) {
    store.set(name, value);
  }
}
