import sessionTimePlayed from './session-time-played.js';
import totalTimePlayed from './total-time-played.js';
import coins from './coins.js';
import highestCoins from './highest-coins.js';
import highscore from './highscore.js';
import scoreBooster from './score-booster.js';
import coinBooster from './coin-booster.js';

import maxInventory from './max-inventory.js';

export default function applyStats(Constructor) {
  const stats = new Constructor();
  
  [
    sessionTimePlayed,
    totalTimePlayed,
    coins,
    highestCoins,
    scoreBooster,
    coinBooster,
    highscore,
    
    ...maxInventory
  ]
  .forEach(([ title, func ]) => stats.define(title, func));
  
  stats.render();
  
  return stats;
}
