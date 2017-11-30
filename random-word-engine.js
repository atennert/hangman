/**
 * Created by ante4822 on 31.07.2017.
 */

'use strict';

const _WORDS = ["lol",
    "dudelsack",
    "haus",
    "kaninchen",
    "trueffel",
    "autobahn",
    "element",
    "pflaster",
    "luefter",
    "birne"];


function pickWord(){
    return Promise.resolve(_WORDS[Math.max(0, Math.ceil(Math.random() * _WORDS.length) - 1)]);
}

