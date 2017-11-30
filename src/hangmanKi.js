/**
 * Created by ante4822 on 28.07.2017.
 */

'use strict';

const MAX_FAILS = 10;

class Hangman {

    init(){
        pickWord().then(this._setWord.bind(this));
    }

    set failsListener(listener){
        this._failsCallack = listener;
    }

    set wordListener(listener){
        this._wordCallback = listener;
    }

    _setWord(word){
        this._fails = 0;
        this._usedLetters = [];
        this._currentWord = word;
        this._displayed = [...word].map(letter => letter === ' ' ? ' ' : '_').join('');
        this._notifyWord();
        this._notifyFails();
    }

    _notifyWord(){
        this._wordCallback(this._displayed);
    }

    _notifyFails(){
        this._failsCallack(this._fails, MAX_FAILS);
    }

    _enterNextLetter(letter){
        if (this._fails < MAX_FAILS
                && this._displayed.indexOf('_') !== -1
                && this._usedLetters.indexOf(letter) === -1) {
            console.log(letter);
            this._usedLetters.push(letter);
            if (this._currentWord.indexOf(letter) !== -1){
                let i,
                    currentChar,
                    tmpDisplayed = [...this._displayed];

                for (i in tmpDisplayed) {
                    currentChar = this._currentWord.charAt(i);
                    if (currentChar === letter){
                        tmpDisplayed[i] = currentChar;
                    }
                }

                this._displayed = tmpDisplayed;
                this._notifyWord();
            } else {
                this._fails++;
                this._notifyFails();
            }
        }
    }

    getLetterCallback(){
        return this._enterNextLetter.bind(this);
    }
}
