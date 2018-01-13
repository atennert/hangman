'use strict';
import pickWord2 from './random-word-engine';

const MAX_FAILS = 10;

export default class Hangman {
  private _failsCallback: any;
  private _wordCallback: any;

  private _fails: number;
  private _usedLetters: string[];
  private _currentWord: string;
  private _displayed: string;

  constructor() {}

  init(): void {
    pickWord2().then(this._setWord.bind(this));
  }

  set failsListener(listener: any) {
    this._failsCallback = listener;
  }

  set wordListener(listener: any) {
    this._wordCallback = listener;
  }

  _setWord(word: string): void {
    this._fails = 0;
    this._usedLetters = [];
    this._currentWord = word;
    this._displayed = [...word].map(letter => letter === ' ' ? ' ' : '_').join('');
    this._notifyWord();
    this._notifyFails();
  }

  _notifyWord(): void {
    this._wordCallback(this._displayed);
  }

  _notifyFails() {
    this._failsCallback(this._fails, MAX_FAILS);
  }

  _enterNextLetter(letter: string): void {
    if (this._fails < MAX_FAILS
      && this._displayed.indexOf('_') !== -1
      && this._usedLetters.indexOf(letter) === -1) {
      console.log(letter);
      this._usedLetters.push(letter);
      if (this._currentWord.indexOf(letter) !== -1) {
        let i: number,
          currentChar: string;
        const tmpDisplayed = [...this._displayed];

        for (i = 0; i < this._currentWord.length; i++) {
          currentChar = this._currentWord.charAt(i);
          if (currentChar === letter) {
            tmpDisplayed[i] = currentChar;
          }
        }

        this._displayed = tmpDisplayed.join('');
        this._notifyWord();
      } else {
        this._fails++;
        this._notifyFails();
      }
    }
  }

  getLetterCallback() {
    return this._enterNextLetter.bind(this);
  }
}
