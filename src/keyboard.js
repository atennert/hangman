/**
 * Created by ante4822 on 28.07.2017.
 */

'use strict';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

class Keyboard {
    constructor(gameRoot){
        let fragment = document.createDocumentFragment(),
            gameContainer = document.querySelector(`.${gameRoot}`),
            keyboardBox = document.createElement('div'),
            keyboardOpener = document.createElement('div'),
            key,
            keyListener = this._handleKeyEvent.bind(this);

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

    reset(){
        Array.prototype.forEach.call(this._container.childNodes, node => {
            node.removeAttribute('style');
        })
    }

    setKeyListener(listenerCallback) {
        this._listenerCallback = listenerCallback;
    }

    _handleKeyEvent(event) {
        event.target.style.pointerEvents = 'none';
        event.target.style.backgroundColor = '#488';
        this._listenerCallback(event.target.dataset.key);
    }

    _handleWindowKeyEvent(event) {
        let keyCode = event.keyCode ? event.keyCode : event.which;

        if (keyCode > 64  && keyCode < 91) { // a-z
            let key = this._keys[keyCode-65];
            key.style.pointerEvents = 'none';
            key.style.backgroundColor = '#488';
            this._listenerCallback(key.dataset.key);
        }
    }
}
