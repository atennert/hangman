'use strict';

import HangmanGame from './game/hangman';

function registerServiceWorker(): void {
  if (!navigator.serviceWorker) {
    return;
  }

  navigator.serviceWorker.register('/sw.js').then((reg) => {
    console.log('service worker registered');
  });
}

// tslint:disable:no-unused-expression
new HangmanGame('game');

registerServiceWorker();
