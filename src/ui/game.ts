import getImage from './image';
import { Routes } from './router';


export default class Game {
  private _gameRoot: HTMLDivElement;
  private _container: any;

  constructor(gameRoot: HTMLDivElement) {
    const fragment = document.createDocumentFragment(),
      gameContainer = document.createElement('div'),
      gameInfoBar = document.createElement('div'),
      gameTitle = document.createElement('div'),
      gameFailCount = document.createElement('p'),
      gameMenu = document.createElement('nav'),
      gameMenuLink = document.createElement('a');
    this._gameRoot = gameRoot;
    this._container = document.createElement('div');

    gameContainer.className = 'game';

    this._container.className = 'game__output';
    gameInfoBar.className = 'game__infobar';
    gameTitle.className = 'game__title';
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

    gameContainer.appendChild(gameInfoBar);
    gameContainer.appendChild(this._container);

    fragment.appendChild(gameContainer);
    this._gameRoot.appendChild(fragment);

    this._container.innerHTML = `${getImage()}<p class="game__word" aria-live="assertive" aria-label="Solution word"></p>`;
  }

  private resetGraphic(): void {
    Array.prototype.forEach.call(this._container.querySelectorAll('.hangman__part'), (element: any) => {
      element.style.visibility = 'hidden';
    });
  }

  public updateWord(word: string): void {
    this._container.querySelector('.game__word').textContent = word;
  }

  public updateFails(fails: number, maxFails: number): void {
    this._gameRoot.querySelector('.game__fail-count')!.textContent = `Errors: ${fails} of ${maxFails}`;
    if (fails === 0) {
      this.resetGraphic();
    }
    if (fails) {
      this._container.querySelector(`.hangman__part--${fails}`).removeAttribute('style');
    }
  }

  public gameOver(): void {
    location.hash = Routes.GameOver;
  }
}
