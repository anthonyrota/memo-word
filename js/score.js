const $highscore = $('.highscore');
const $score = $('.score');
const $coins = $('.coins');

const $stars = $('.star');

const highest = (a, b) => Math.round(a > b ? a : b);

class ScoreTracker {
  constructor() {
    this.highscore = Number(store.get('highscore') || 0);
    
    this.coins = Number(store.get('coins') || 0);
    this.highestCoins = Number(store.get('highest-coins') || 0);
    
    this.scoreBooster = Number(store.get('scoreBooster') || 1);
    this.coinBooster = Number(store.get('coinBooster') || 1);
    
    this.updateHTML(false);
  }
  
  set(name, value) {
    this[name] = value;
    store.set(name, value);
  }
  
  save() {
    store.set('highscore', this.highscore);
    store.set('coins', this.coins);
    
    if (this.coins > this.highestCoins) {
      this.highestCoins = this.coins;
      store.set('highest-coins', this.highestCoins);
    }
  }
  
  update(time, timeLimit, level, didWin) {
    if (didWin) {
      const timeScore = time / timeLimit;
      const score = Math.round(5 * timeScore * level);
      
      this.highscore = highest(this.highscore, Math.round(score * this.scoreBooster));
      this.coins += Math.round(score * this.coinBooster / 10);
      
      this.updateHTML(Math.round(score * this.scoreBooster));
      this.updateStars(Math.round(timeScore * $stars.length));
    } else {
      $score.html(level);
      this.updateStars(0);
    }
    
    this.save();
  }
  
  updateHTML(score) {
    if (score !== false) {
      $score.html(score);
    }
    $coins.html(this.coins);
    $highscore.html(this.highscore);
  }
  
  updateStars(number) {
    $stars.each((i, star) => {
      if (i + 1 <= number) {
        $(star).addClass('gold-text');
      } else {
        $(star).removeClass('gold-text');
      }
    });
  }
  
  getCoins() {
    return this.coins;
  }
  
  removeCoins(amount) {
    this.coins -= amount;
    this.save();
    this.updateHTML(false);
  }
}

export default new ScoreTracker();
