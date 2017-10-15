import { randomInt } from './helpers.js';

export const BRIGHT_COLORS = ["#2980b9", "#8e44ad", "#c0392b", "#d35400", "#16a085", "#27ae60"];

export function colorText(selector) {
  const $text = $(selector);
  const text = $text.text().split('');
  
  $text.html(
    text.map(char => {
      const index = randomInt(0, BRIGHT_COLORS.length - 1);
      const color = BRIGHT_COLORS[index];
      return `<span style="color: ${color}">${char}</span>`;
    })
    .join('')
  );
}
