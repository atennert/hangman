'use strict';
import getImage from './image';
import { Routes } from './router';


export default class Game {
  private _gameRoot: HTMLDivElement;
  private _container: any;

  constructor(gameRoot: HTMLDivElement) {
    const fragment = document.createDocumentFragment(),
      gameInfoBar = document.createElement('div'),
      gameTitle = document.createElement('div'),
      gameFailCount = document.createElement('p'),
      gameMenu = document.createElement('nav'),
      gameMenuLink = document.createElement('a');
    this._gameRoot = gameRoot;
    this._container = document.createElement('div');

    this._container.className = 'game__output';
    gameInfoBar.className = 'game__infobar';
    gameTitle.className = 'game__title';
    gameTitle.textContent = 'Hangman';
    gameFailCount.className = 'game__fail-count';
    gameFailCount.textContent = 'Errors:';
    gameMenuLink.textContent = 'Back to Menu';
    gameMenuLink.href = Routes.Menu;
    gameMenuLink.className = 'menu__link';
    gameMenu.appendChild(gameMenuLink);

    gameInfoBar.appendChild(gameTitle);
    gameInfoBar.appendChild(gameFailCount);
    gameInfoBar.appendChild(gameMenu);

    fragment.appendChild(gameInfoBar);
    fragment.appendChild(this._container);

    this._gameRoot.className = 'game';
    this._gameRoot.appendChild(fragment);

    this._container.innerHTML = `${getImage()}<p class="game__word"></p>`;
  }

  private resetGraphic(): void {
    Array.prototype.forEach.call(this._container.querySelectorAll('.hangman__part'), (element: any) => {
      element.style.visibility = 'hidden';
    });
  }

  getGraphic(): string {
    return document.querySelector('.hangman__image')!.outerHTML;
  }

  updateWord(word: string): void {
    this._container.querySelector('.game__word').textContent = word;
  }

  updateFails(fails: number, maxFails: number): void {
    if (fails === 0) {
      this.resetGraphic();
    }
    this._gameRoot.querySelector('.game__fail-count')!.textContent = `Errors: ${fails}/${maxFails}`;
    if (fails) {
      this._container.querySelector(`.hangman__part--${fails}`).removeAttribute('style');
    }
  }
}
