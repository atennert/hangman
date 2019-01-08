import getImage from './image';
import { Routes } from './router';


export default class Game {
  private _gameRoot: HTMLDivElement;
  private _container: HTMLDivElement;
  public readonly gameContainer: HTMLDivElement;

  constructor(gameRoot: HTMLDivElement) {
    this.gameContainer = document.createElement('div') as HTMLDivElement
    const fragment = document.createDocumentFragment(),
      gameInfoBar = document.createElement('div') as HTMLDivElement,
      gameTitle = document.createElement('h1') as HTMLHeadingElement,
      gameFailCount = document.createElement('p') as HTMLParagraphElement,
      gameMenu = document.createElement('nav'),
      gameMenuLink = document.createElement('a') as HTMLAnchorElement;
    this._gameRoot = gameRoot;
    this._container = document.createElement('div') as HTMLDivElement;

    this.gameContainer.className = 'game';

    this._container.className = 'game__output';
    gameInfoBar.className = 'game__infobar';
    gameTitle.textContent = 'Hangman';
    gameFailCount.className = 'game__fail-count';
    gameFailCount.textContent = 'Errors:';
    gameFailCount.setAttribute('aria-live', 'assertive');
    gameMenuLink.textContent = 'Back to Menu';
    gameMenuLink.href = Routes.Menu;
    gameMenuLink.className = 'menu__link';
    gameMenu.appendChild(gameMenuLink);

    gameInfoBar.appendChild(gameTitle);
    gameInfoBar.appendChild(gameFailCount);
    gameInfoBar.appendChild(gameMenu);

    this.gameContainer.appendChild(gameInfoBar);
    this.gameContainer.appendChild(this._container);

    fragment.appendChild(this.gameContainer);
    this._gameRoot.appendChild(fragment);

    this._container.innerHTML = `${getImage(true)}<p class="game__word" aria-live="assertive" aria-label="Solution word"></p>`;
  }

  public updateWord(word: string): void {
    this._container.querySelector('.game__word')!.textContent = word;
  }

  public updateFails(fails: number, maxFails: number): void {
    this._gameRoot.querySelector('.game__fail-count')!.textContent = `Errors: ${fails} of ${maxFails}`;
    if (fails) {
      this._container.querySelector(`.hangman__part--${fails}`)!.removeAttribute('style');
    }
  }

  public gameOver(): void {
    location.hash = Routes.GameOver;
  }
}
