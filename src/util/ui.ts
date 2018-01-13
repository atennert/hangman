'use strict';

export default class UI {
  private _gameRoot: any;
  private _container: any;

  constructor(gameRoot: string) {
    const fragment = document.createDocumentFragment(),
      gameInfoBar = document.createElement('div'),
      gameTitle = document.createElement('div'),
      gameFailCount = document.createElement('p'),
      gameResetButton = document.createElement('div');
    this._gameRoot = document.querySelector(`.${gameRoot}`);
    this._container = document.createElement('div');

    this._container.className = 'game__output';
    gameInfoBar.className = 'game__infobar';
    gameTitle.className = 'game__title';
    gameTitle.textContent = 'Hangman';
    gameFailCount.className = 'game__fail-count';
    gameFailCount.textContent = 'Fails:';
    gameResetButton.className = 'game__reset';
    gameResetButton.setAttribute('type', 'button');
    gameResetButton.textContent = 'Start / Reset';

    gameInfoBar.appendChild(gameTitle);
    gameInfoBar.appendChild(gameFailCount);
    gameInfoBar.appendChild(gameResetButton);

    fragment.appendChild(gameInfoBar);
    fragment.appendChild(this._container);

    this._gameRoot.appendChild(fragment);

    this._container.innerHTML =
`<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" version="1.1" class="game__hangman">
      <line class="hangman__part hangman__part--1" x1="50" x2="50" y1="350" y2="50"/>
      <line class="hangman__part hangman__part--2" x1="50" x2="300" y1="50" y2="50"/>
      <line class="hangman__part hangman__part--3" x1="50" x2="150" y1="150" y2="50"/>
      <line class="hangman__part hangman__part--4" x1="300" x2="300" y1="50" y2="100"/>
      <circle class="hangman__part hangman__part--5" cx="300" cy="125" r="25"/>
      <line class="hangman__part hangman__part--6" x1="300" x2="300" y1="150" y2="220"/>
      <line class="hangman__part hangman__part--7" x1="300" x2="255" y1="155" y2="170"/>
      <line class="hangman__part hangman__part--8" x1="300" x2="345" y1="155" y2="170"/>
      <line class="hangman__part hangman__part--9" x1="300" x2="280" y1="220" y2="300"/>
      <line class="hangman__part hangman__part--10" x1="300" x2="320" y1="220" y2="300"/>
      </svg>
      <p class="game__word"></p>`;

    this.addResetListener(this._init.bind(this));
  }

  _init(): void {
    Array.prototype.forEach.call(this._container.querySelectorAll('.hangman__part'), (element: any) => {
      element.style.visibility = 'hidden';
    });
  }

  addResetListener(callback: any): void {
    this._gameRoot.querySelector('.game__reset').addEventListener('click', callback);
  }

  updateWord(word: string): void {
    this._container.querySelector('.game__word').innerHTML =
    [...word].join(' ').replace('   ', ' &nbsp; ');
  }

  updateFails(fails: number, maxFails: number): void {
    this._gameRoot.querySelector('.game__fail-count').textContent = `Fails: ${fails}/${maxFails}`;
    if (fails) {
      this._container.querySelector(`.hangman__part--${fails}`).removeAttribute('style');
    }
  }
}
