'use strict';

import IWordProvider from './word-provider';

const _WORDS = [
  'Kanal',
  'Eisenbahn',
  'Dudelsack',
  'Haus',
  'Kaninchen',
  'Trüffel',
  'Autobahn',
  'Element',
  'Pflaster',
  'Lüfter',
  'Birne'
];


export default class RandomWordEngine implements IWordProvider {
  getWord(): Promise<string> {
    return Promise.resolve(_WORDS[Math.max(0, Math.ceil(Math.random() * _WORDS.length) - 1)]);
  }
}
