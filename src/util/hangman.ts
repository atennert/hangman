'use strict';

class HangmanGame {
  constructor(gameRoot: string) {
    const hangman = new Hangman(),
      ui = new UI(gameRoot),
      keyboard = new Keyboard(gameRoot);

    ui.addResetListener(hangman.init.bind(hangman));
    ui.addResetListener(keyboard.reset.bind(keyboard));

    hangman.wordListener = ui.updateWord.bind(ui);
    hangman.failsListener = ui.updateFails.bind(ui);

    keyboard.setKeyListener(hangman.getLetterCallback());

    ((document.querySelector(`.${gameRoot}`)!)
      .querySelector('.keyboard-box__button')!)
      .addEventListener('click', toggleShowKeyBoard);
  }
}

function toggleShowKeyBoard(event: any): void {
  const keyboardContainer = event.target.parentNode;
  if (keyboardContainer.style.height) {
    keyboardContainer.removeAttribute('style');
  } else {
    keyboardContainer.style.height = '24vh';
  }
}
