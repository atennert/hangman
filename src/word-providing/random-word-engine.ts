'use strict';

import IWordProvider from './word-provider';

const _WORDS = ['lol',
  'dudelsack',
  'haus',
  'kaninchen',
  'trueffel',
  'autobahn',
  'element',
  'pflaster',
  'luefter',
  'birne'];


export default class RandomWordEngine implements IWordProvider {
  getWord(): Promise<string> {
    return Promise.resolve(_WORDS[Math.max(0, Math.ceil(Math.random() * _WORDS.length) - 1)]);
  }
}
