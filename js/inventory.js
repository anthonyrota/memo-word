import ScoreTracker from './score.js';

ScoreTracker.removeCoins(-1000);

const $container = $('.inventory-container');

class Inventory {
  constructor() {
    this.items = store.get('inventory') || {};
    this.max = store.get('inventory') || {};
    this.chosen = {};
    this.html = {};
  }
  
  isEmpty() {
    for (let name in this.items) {
      if (this.has(name)) {
        return false;
      }
    }
    return true;
  }
  
  define(itemName, html) {
    if (!this.items[itemName]) {
      this.items[itemName] = 0;
      this.max[itemName] = 0;
      this.save();
    }
    this.html[itemName] = html;
  }
  
  add(itemName) {
    this.items[itemName]++;
    
    if (this.items[itemName] > this.max[itemName]) {
      this.max[itemName] = this.items[itemName];
    }
    
    this.save();
  }
  
  get(itemName) {
    return this.items[itemName];
  }
  
  has(itemName) {
    return this.items[itemName] > 0;
  }
  
  remove(itemName) {
    this.items[itemName]--;
    this.save();
  }
  
  save() {
    store.set('inventory', this.items);
    store.set('inventory-max', this.max);
  }
  
  render() {
    $container.empty();
    
    const { html } = this;
    
    this.chosen = {};
    
    for (const name of Object.keys(html)) {
      if (!this.has(name)) {
        continue;
      }
      
      const amount = this.get(name);
      const { icon, listener } = html[name];
      
      const $card = $('<div class="card shadow-dark">');
      const $ul = $('<ul class="card-content flex-center">');
      
      const $li1 = $(`
        <li class="card-item flex-center">
          <div class="margin-bottom-small">${name}</div>
          <i class="fa fa-${icon} icon-small gold-text"></i>
        </li>
      `);
      
      const $li2 = $(`
        <li class="card-item flex-center">
          <div class="margin-bottom-small">Amount</div>
          <div class="align-center">${amount}</div>
        </li>
      `);
      
      const $li3 = $('<li class="card-item flex-center">');
      const $trigger = $('<div class="red-button align-center">');
      const $title = $('<div class="margin-bottom-small uppercase bold">Choose</div>');
      const $icon = $('<i class="fa fa-times icon-small">');
      
      $trigger.click(() => {
        this.chosen[name] = !this.chosen[name];
        
        if (this.chosen[name]) {
          $trigger.removeClass('red-button');
          $trigger.addClass('green-button');
          $title.html('Undo');
          $icon.removeClass('fa-times');
          $icon.addClass('fa-check');
        } else {
          $trigger.removeClass('green-button');
          $trigger.addClass('red-button');
          $title.html('Choose');
          $icon.removeClass('fa-check');
          $icon.addClass('fa-times');
        }
      });
      
      $trigger.append($title);
      $trigger.append($icon);
      $li3.append($trigger);
      
      $ul.append($li1);
      $ul.append($li2);
      $ul.append($li3);
      
      $card.append($ul);
      $container.append($card);
    }
  }
  
  apply() {
    const { chosen, html } = this;
    
    for (const name of Object.keys(chosen)) {
      if (!chosen[name]) {
        continue;
      }
      
      this.remove(name);
      html[name].listener();
    }
  }
}

export default new Inventory();
