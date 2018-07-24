'use strict';

const ALPHABET = [...'abcdefghijklmnopqrstuvwxyzäöüß'];

/**
 * This class creates and handles an on screen keyboard. It also handles native
 * keyboard input.
 */
export default class Keyboard {
  private keyboardBox: HTMLDivElement;
  private keys: HTMLButtonElement[];

  private currentIndex = 0;
  private readonly keyboardNavigation: {[index: string]: () => void} = {
    ArrowRight: () => {
      if (this.currentIndex % 10 < 9) {
        this.focusKey(this.currentIndex + 1);
      }
    },
    ArrowLeft: () => {
      if (this.currentIndex % 10 > 0) {
        this.focusKey(this.currentIndex - 1);
      }
    },
    ArrowDown: () => {
      if (this.currentIndex < 20) {
        this.focusKey(this.currentIndex + 10);
      }
    },
    ArrowUp: () => {
      if (this.currentIndex > 9) {
        this.focusKey(this.currentIndex - 10);
      }
    },
    End: () => {
      this.focusKey(this.currentIndex - (this.currentIndex % 10) + 9);
    },
    Home: () => {
      this.focusKey(this.currentIndex - (this.currentIndex % 10));
    }
  };

  private _listenerCallback: ((s: string) => void) = () => {};

  constructor(gameRoot: string) {
    const fragment = document.createDocumentFragment(),
      gameContainer = document.querySelector(`.${gameRoot}`)!,
      keyListener = this._handleKeyEvent.bind(this);

      this.keyboardBox = document.createElement('div'),
      this.keyboardBox.className = 'keyboard-box';
      this.keyboardBox.setAttribute('role', 'grid');
      this.keyboardBox.setAttribute('aria-label', 'keyboard');

    let key;
    this.keys = ALPHABET.map(letter => {
      key = document.createElement('button');
      key.type = 'button';
      key.textContent = key.dataset.key = letter;
      key.className = 'keyboard-box__key';
      key.tabIndex = -1;
      key.setAttribute('aria-selected', 'false');
      key.setAttribute('aria-readonly', 'false');
      key.addEventListener('click', keyListener);
      return key;
    });
    this.keys[0].tabIndex = 0;
    this.keys[0].addEventListener('focus', () => this.currentIndex = 0);

    let keyRow: HTMLDivElement,
      cell: HTMLSpanElement,
      buttonCounter = 0;
    for (let i = 0; i < 3; i++) {
      keyRow = document.createElement('div');
      keyRow.className = 'key-row';
      keyRow.setAttribute('role', 'row');
      do {
        cell = document.createElement('span');
        cell.setAttribute('role', 'gridcell');
        cell.className = 'key-cell';
        cell.appendChild(this.keys[buttonCounter]);
        keyRow.appendChild(cell);
        buttonCounter++;
      } while (buttonCounter % 10 !== 0);
      this.keyboardBox.appendChild(keyRow);
    }

    fragment.appendChild(this.keyboardBox);
    gameContainer.appendChild(fragment);

    window.addEventListener('keyup', this._handleWindowKeyEvent.bind(this));
  }

  public reset(): void {
    let key;
    for (key of this.keys) {
      key.setAttribute('aria-selected', 'false');
      key.setAttribute('aria-readonly', 'false');
    }
  }

  public setKeyListener(listenerCallback: (s: string) => void): void {
    this._listenerCallback = listenerCallback;
  }

  public _handleKeyEvent(event: any): void {
    const key = event.target,
      value = key.dataset.key,
      keyIndex = ALPHABET.indexOf(value);

    this.currentIndex = keyIndex;
    key.setAttribute('aria-selected', 'true');
    key.setAttribute('aria-readonly', 'true');
    this._listenerCallback(value);
  }

  public _handleWindowKeyEvent(event: KeyboardEvent): void {
    const keyIndex = ALPHABET.indexOf(event.key);
    if (keyIndex >= 0) {
      const key = this.keys[keyIndex];
      this.currentIndex = keyIndex;
      key.setAttribute('aria-selected', 'true');
      key.setAttribute('aria-readonly', 'true');
      this._listenerCallback(key.dataset.key!);
    } else if ((document.activeElement as HTMLElement).dataset.key) {
      const action = this.keyboardNavigation[event.key];
      if (action) {
        action();
      }
    }
  }

  private focusKey(index: number): void {
    this.currentIndex = index;
    this.keys[index].focus();
  }
}
