'use strict';

const ALPHABET = [...'abcdefghijklmnopqrstuvwxyzäöüß'];

export default class Keyboard {
  private keyboardBox: any;
  private keys: any[];

  private _listenerCallback: any;

  constructor(gameRoot: string) {
    const fragment = document.createDocumentFragment(),
      gameContainer = document.querySelector(`.${gameRoot}`)!,
      keyboardOpener = document.createElement('div'),
      keyListener = this._handleKeyEvent.bind(this);
    let key;

    this.keyboardBox = document.createElement('div'),
    this.keyboardBox.className = 'keyboard-box';

    this.keys = ALPHABET.map(letter => {
      key = document.createElement('p');
      key.textContent = letter;
      key.className = 'keyboard-box__key';
      key.dataset.key = letter;
      key.addEventListener('click', keyListener);
      this.keyboardBox.appendChild(key);
      return key;
    });

    fragment.appendChild(this.keyboardBox);
    gameContainer.appendChild(fragment);

    window.addEventListener('keyup', this._handleWindowKeyEvent.bind(this));
  }

  reset(): void {
    Array.prototype.forEach.call(this.keyboardBox.childNodes, (node: any) => {
      node.removeAttribute('style');
    })
  }

  setKeyListener(listenerCallback: any): void {
    this._listenerCallback = listenerCallback;
  }

  _handleKeyEvent(event: any): void {
    event.target.style.pointerEvents = 'none';
    event.target.style.backgroundColor = '#488';
    this._listenerCallback(event.target.dataset.key);
  }

  _handleWindowKeyEvent(event: KeyboardEvent): void {
    const keyIndex = ALPHABET.indexOf(event.key);
    if (keyIndex >= 0) {
      const key = this.keys[keyIndex];
      key.style.pointerEvents = 'none';
      key.style.backgroundColor = '#488';
      this._listenerCallback(key.dataset.key);
    }
  }
}
