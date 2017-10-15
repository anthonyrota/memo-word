import { randomInt } from './helpers.js';
import { COLORS } from './letter.js';
import wordBank from './words.js';

const COLORS_LENGTH = COLORS.length;

const words = wordBank.filter(word => amountOfCharsRepeating(word) < COLORS_LENGTH);
const MAX_LENGTH = words.reduce((max, { length }) => Math.max(max, length), 0);

function amountOfCharsRepeating(str) {
  try {
    return str.toLowerCase().split('').sort().join('').match(/(.)\1+/g).length;
  } catch (e) {
    return 0;
  }
}

function isNotRepeating(str) {
  return amountOfCharsRepeating(str) === 0;
}

const fallback = words.filter(word => word.length >= 3 && word.length <= 5);

export default function randomWord(min, max, noDuplicateLetter) {
  min = Math.min(min, MAX_LENGTH);
  max = Math.min(max, MAX_LENGTH);
  
  let pool = words.filter(word => word.length >= min && word.length <= max);
  
  if (noDuplicateLetter) {
    pool = pool.filter(isNotRepeating);
  }
  
  const index = randomInt(0, pool.length);
  
  if (!pool[index]) {
    const index = randomInt(0, fallback.length);
    return fallback[index];
  }
  
  return pool[index];
}
