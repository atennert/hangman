'use strict';
import IWordProvider from '../word-providing/word-provider';

const MAX_FAILS = 10;

export default class Hangman {
  private failsCallback: (fails: number, maxFails: number) => void;
  private wordCallback: (word: string) => void;
  private wordProvider: IWordProvider;
  private gameOverListener: (word: string, fails: string[], maxFails: number) => void;

  private fails: number;
  private usedLetters: string[];
  private wrongLetters: string[];
  private currentWord: string;
  private displayed: string;

  init(): void {
    this.wordProvider.getWord()
      .then(this.setWord.bind(this))
      .catch((error) => console.error('Hangman.init: no word provided', error));
  }

  setFailsListener(listener: (fails: number, maxFails: number) => void): void {
    this.failsCallback = listener;
  }

  setWordListener(listener: (word: string) => void): void {
    this.wordCallback = listener;
  }

  setWordProvider(wordProvider: IWordProvider): void {
    this.wordProvider = wordProvider;
  }

  setGameOverListener(gameOverListener: (word: string, fails: string[], maxFails: number) => void) {
    this.gameOverListener = gameOverListener;
  }

  private setWord(word: string): void {
    this.fails = 0;
    this.usedLetters = [];
    this.wrongLetters = [];
    this.currentWord = word;
    this.displayed = [...word].map(letter => letter === ' ' ? ' ' : '_').join('');
    this.notifyWord();
    this.notifyFails();
  }

  private notifyWord(): void {
    this.wordCallback(this.displayed);
  }

  private notifyFails(): void {
    this.failsCallback(this.fails, MAX_FAILS);
  }

  private enterNextLetter(letter: string): void {
    if (this.fails < MAX_FAILS
      && this.displayed.indexOf('_') !== -1
      && this.usedLetters.indexOf(letter) === -1) {

      this.usedLetters.push(letter);
      if (this.currentWord.toLowerCase().indexOf(letter) !== -1) {
        let i: number,
          currentChar: string;
        const tmpDisplayed = [...this.displayed];

        for (i = 0; i < this.currentWord.length; i++) {
          currentChar = this.currentWord.charAt(i);
          if (currentChar.toLowerCase() === letter) {
            tmpDisplayed[i] = currentChar;
          }
        }

        this.displayed = tmpDisplayed.join('');
        this.notifyWord();
      } else {
        this.wrongLetters.push(letter);
        this.fails++;
        this.notifyFails();
      }
      if (!this.displayed.includes('_') || this.fails === MAX_FAILS) {
        this.gameOverListener(this.currentWord, this.wrongLetters, MAX_FAILS);
      }
    }
  }

  getLetterCallback(): (letter: string) => void {
    return this.enterNextLetter.bind(this);
  }
}
