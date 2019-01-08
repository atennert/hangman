import Hangman from './hangman-ki';
import Game from '../ui/game';
import Keyboard from '../ui/keyboard';
import { Routes, Router } from '../ui/router';
import Menu from '../ui/menu';
import { GameOver } from '../ui/game-over';
import { RouteOption } from '../ui/route-option';
import { About } from '../ui/about';
import KrautWordEngine from '../word-providing/kraut-word-engine';
import LoadingOverlay from '../ui/loading-overlay';
import IWordProvider from '../word-providing/word-provider';


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
      keyboard = new Keyboard(game.gameContainer);
      const loadingOverlay = new LoadingOverlay(gameRoot);
      // TODO use factory
      const wordProvider = new KrautWordEngine() as IWordProvider;

      hangman.setWordListener(game.updateWord.bind(game));
      hangman.setFailsListener(game.updateFails.bind(game));
      hangman.setGameOverListener(game.gameOver.bind(game));

      keyboard.setKeyListener(hangman.getLetterCallback());

      // if there will be more loading handling, this should be moved into it's own class
      wordProvider.getWord()
        .then((word) => hangman.setWord(word))
        .catch((error) => console.error('HangmanGame.Game[activation]: no word provided', error))
        .then(() => loadingOverlay.removeOverlay(gameRoot));
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
    }};
    screenConfig[Routes.About] = {activation: () => {
      this.clearPage(gameRoot);
      // tslint:disable:no-unused-expression
      new About(gameRoot);
      // tslint:enable:no-unused-expression
    }, deactivation: () => {}};

    screenConfig[Routes.Default] = screenConfig[Routes.Menu];

    new Router(screenConfig).init();
  }

  private clearPage(element: HTMLDivElement) {
    element.innerHTML = '';
  }
}
