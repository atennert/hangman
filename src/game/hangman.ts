'use strict';
import Hangman from './hangman-ki';
import Game from '../ui/game';
import Keyboard from '../ui/keyboard'
import RandomWordEngine from '../word-providing/random-word-engine';
import { Messages } from '../ui/messages';
import MessageHandler from '../ui/message-handler';
import { Router, Routes } from '../ui/router';
import Menu from '../ui/menu';

export default class HangmanGame {
  constructor(gameRootId: string, messageRootId: string) {
    const gameRoot = document.getElementById(gameRootId) as HTMLDivElement,
      messageRoot = document.getElementById(messageRootId) as HTMLDivElement;

    const routeConfig = {} as any;
    routeConfig[Routes.Menu] = () => {
      this.clearPage(gameRoot);
      // tslint:disable:no-unused-expression
      new Menu(gameRoot);
    };
    routeConfig[Routes.Game] = () => {
      this.clearPage(gameRoot);
      const hangman = new Hangman(),
        game = new Game(gameRoot),
        keyboard = new Keyboard(gameRootId),
        messages = new Messages(messageRoot),
        messageHandler = new MessageHandler(),
        hangmanResetListener = hangman.init.bind(hangman),
        keyboardResetListener = keyboard.reset.bind(keyboard);

      messageHandler.setMessages(messages);

      messages.addGameStartListener(hangmanResetListener);
      messages.addGameStartListener(keyboardResetListener);
      messages.setGraphicsProvider(game.getGraphic.bind(game));

      hangman.setWordListener(game.updateWord.bind(game));
      hangman.setFailsListener(game.updateFails.bind(game));
      hangman.setWordProvider(new RandomWordEngine());
      hangman.setGameOverListener(messageHandler.showGameOverMessage.bind(messageHandler));

      keyboard.setKeyListener(hangman.getLetterCallback());

      hangman.init();
    };
    routeConfig[Routes.Default] = routeConfig[Routes.Menu];

    new Router(routeConfig).init();
  }

  private clearPage(gameRoot: HTMLDivElement) {
    gameRoot.innerHTML = '';
  }
}
