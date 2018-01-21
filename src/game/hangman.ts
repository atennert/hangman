'use strict';
import Hangman from './hangman-ki';
import UI from '../ui/ui';
import Keyboard from '../ui/keyboard'
import RandomWordEngine from '../word-providing/random-word-engine';
import { Messages } from '../ui/messages';
import MessageHandler from '../ui/message-handler';

export default class HangmanGame {
  constructor(gameRoot: string) {
    const hangman = new Hangman(),
      ui = new UI(gameRoot),
      keyboard = new Keyboard(gameRoot),
      messages = new Messages(gameRoot),
      messageHandler = new MessageHandler(),
      hangmanResetListener = hangman.init.bind(hangman),
      keyboardResetListener = keyboard.reset.bind(keyboard);

    messageHandler.setMessages(messages);

    ui.addResetListener(hangmanResetListener);
    ui.addResetListener(keyboardResetListener);

    messages.addGameStartListener(hangmanResetListener);
    messages.addGameStartListener(keyboardResetListener);
    messages.setGraphicsProvider(ui.getGraphic.bind(ui));

    hangman.setWordListener(ui.updateWord.bind(ui));
    hangman.setFailsListener(ui.updateFails.bind(ui));
    hangman.setWordProvider(new RandomWordEngine());
    hangman.setGameOverListener(messageHandler.showGameOverMessage.bind(messageHandler));

    keyboard.setKeyListener(hangman.getLetterCallback());

    messageHandler.showStartMessage();
  }
}
