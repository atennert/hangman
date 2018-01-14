'use strict';
import Hangman from './hangmanKi';
import UI from './ui';
import Keyboard from './keyboard'
import RandomWordEngine from './random-word-engine';

export default class HangmanGame {
  constructor(gameRoot: string) {
    const hangman = new Hangman(),
      ui = new UI(gameRoot),
      keyboard = new Keyboard(gameRoot);

    ui.addResetListener(hangman.init.bind(hangman));
    ui.addResetListener(keyboard.reset.bind(keyboard));

    hangman.wordListener = ui.updateWord.bind(ui);
    hangman.failsListener = ui.updateFails.bind(ui);
    hangman.wordProvider = new RandomWordEngine();

    keyboard.setKeyListener(hangman.getLetterCallback());
  }
}
