import Hangman from './hangman-ki';
import Game from '../ui/game';
import Keyboard from '../ui/keyboard';
import RandomWordEngine from '../word-providing/random-word-engine';
import { Routes, Router } from '../ui/router';
import Menu from '../ui/menu';
import { GameOver } from '../ui/game-over';
import { RouteOption } from '../ui/route-option';


export default class HangmanGame {
  constructor(gameRootId: string) {
    const gameRoot = document.getElementById(gameRootId) as HTMLDivElement;
    const hangman = new Hangman();
    let keyboard: Keyboard;

    const screenConfig: {[key: string]: RouteOption} = {};
    screenConfig[Routes.Menu] = {activation: () => {
      this.clearPage(gameRoot);
      // tslint:disable:no-unused-expression
      new Menu(gameRoot);
      // tslint:enable: no-unused-expression
    }, deactivation: () => {/* Nothing to do */}};

    screenConfig[Routes.Game] = {activation: () => {
      this.clearPage(gameRoot);
      const game = new Game(gameRoot);
      keyboard = new Keyboard(gameRootId);

      hangman.setWordListener(game.updateWord.bind(game));
      hangman.setFailsListener(game.updateFails.bind(game));
      hangman.setWordProvider(new RandomWordEngine());
      hangman.setGameOverListener(game.gameOver.bind(game));

      keyboard.setKeyListener(hangman.getLetterCallback());

      hangman.init();
    }, deactivation: () => {
      hangman.setWordListener(() => {});
      hangman.setFailsListener(() => {});
      hangman.setGameOverListener(() => {});

      keyboard.setKeyListener(() => {});
    }};

    screenConfig[Routes.GameOver] = {activation: () => {
      this.clearPage(gameRoot);
      const gameOver = new GameOver(gameRoot);
      gameOver.setData(hangman.result);
    }, deactivation: () => {
      hangman.setGameOverListener(() => {});
    }}

    screenConfig[Routes.Default] = screenConfig[Routes.Menu];

    new Router(screenConfig).init();
  }

  private clearPage(element: HTMLDivElement) {
    element.innerHTML = '';
  }
}
