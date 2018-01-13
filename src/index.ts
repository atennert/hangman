'use strict';

import HangmanGame from './util/hangman';

function registerServiceWorker(): void {
  if (!navigator.serviceWorker) {
    return;
  }

  navigator.serviceWorker.register('/sw.js').then((reg) => {
    console.log('service worker registered');
  });
}

new HangmanGame('game');

registerServiceWorker();
