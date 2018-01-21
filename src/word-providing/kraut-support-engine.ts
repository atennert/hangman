'use strict';
import IWordProvider from './word-provider';

const transformer: any = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' };

const _fixUmlauts = (word: string) =>
  [...word].map(letter => transformer[letter] ? transformer[letter] : letter).join('');

export default class KrautWordEngine implements IWordProvider {
  getWord(): Promise<string> {
    return fetch('https://www.krautipsum.de/api/noun')
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
      return _fixUmlauts(text.toLowerCase());
    });
  }
}
