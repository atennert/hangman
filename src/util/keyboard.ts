'use strict';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

class Keyboard {
  private _container: any;
  private _keys: any[];

  private _listenerCallback: any;

  constructor(gameRoot: string) {
    const fragment = document.createDocumentFragment(),
      gameContainer = document.querySelector(`.${gameRoot}`)!,
      keyboardBox = document.createElement('div'),
      keyboardOpener = document.createElement('div'),
      keyListener = this._handleKeyEvent.bind(this);
    let key;

    keyboardBox.className = 'keyboard-box';
    keyboardOpener.className = 'keyboard-box__button';

    this._container = document.createElement('div');
    this._container.className = 'keyboard-box__content';

    keyboardBox.appendChild(keyboardOpener);
    keyboardBox.appendChild(this._container);

    this._keys = [...ALPHABET].map(letter => {
      key = document.createElement('p');
      key.textContent = letter;
      key.className = 'keyboard-box__key';
      key.dataset.key = letter;
      key.addEventListener('click', keyListener);
      this._container.appendChild(key);
      return key;
    });

    fragment.appendChild(keyboardBox);
    gameContainer.appendChild(fragment);

    window.addEventListener('keyup', this._handleWindowKeyEvent.bind(this));
  }

  reset(): void {
    Array.prototype.forEach.call(this._container.childNodes, (node: any) => {
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

  _handleWindowKeyEvent(event: any): void {
    const keyCode = event.keyCode ? event.keyCode : event.which;

    if (keyCode > 64 && keyCode < 91) { // a-z
      const key = this._keys[keyCode - 65];
      key.style.pointerEvents = 'none';
      key.style.backgroundColor = '#488';
      this._listenerCallback(key.dataset.key);
    }
  }
}
