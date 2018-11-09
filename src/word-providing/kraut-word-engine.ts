'use strict';
import IWordProvider from './word-provider';
import RandomWordEngine from './random-word-engine';

export default class KrautWordEngine implements IWordProvider {
  getWord(): Promise<string> {
    return fetch('https://krautipsum.de/api/noun')
    .then((response) => response.json())
    .then((text) => text.noun)
    .catch((e) => {
      console.warn(e);
      // if something failes, use the local words as backup
      const rwe = new RandomWordEngine();
      return rwe.getWord();
    });
  }
}
